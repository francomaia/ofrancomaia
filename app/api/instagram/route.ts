import { instagramFallbackPosts, type InstagramPost } from '@/lib/instagram';
import { site } from '@/lib/site';

type MetaMedia = {
  id?: unknown;
  media_type?: unknown;
  media_url?: unknown;
  thumbnail_url?: unknown;
  permalink?: unknown;
};

const GRAPH_URL = 'https://graph.instagram.com';
const CACHE_MS = 5 * 60 * 1000;
let cached: { posts: InstagramPost[]; expiresAt: number } | null = null;

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function toPost(media: MetaMedia): InstagramPost | null {
  if (typeof media.id !== 'string' || !isHttpsUrl(media.permalink)) {
    return null;
  }

  const permalink = new URL(media.permalink);
  if (
    !['instagram.com', 'www.instagram.com'].includes(permalink.hostname) ||
    !/^\/(?:p|reel|reels|tv)\/[^/]+\/?$/.test(permalink.pathname)
  ) {
    return null;
  }

  const image =
    media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url;
  if (!isHttpsUrl(image)) return null;

  return {
    id: media.id,
    href: permalink.href,
    image,
    kind: media.media_type === 'VIDEO' ? 'REEL' : 'POST',
  };
}

function result(posts: InstagramPost[], source: 'api' | 'fallback') {
  return Response.json(
    { posts, source },
    { headers: { 'cache-control': 'public, max-age=60' } },
  );
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return result(instagramFallbackPosts, 'fallback');

  if (cached && cached.expiresAt > Date.now()) {
    return result(cached.posts, 'api');
  }

  const profileUrl = new URL('/me', GRAPH_URL);
  profileUrl.searchParams.set('fields', 'username');

  const url = new URL('/me/media', GRAPH_URL);
  url.searchParams.set(
    'fields',
    'id,media_type,media_url,thumbnail_url,permalink',
  );
  url.searchParams.set('limit', '6');

  try {
    const options = {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store' as const,
      signal: AbortSignal.timeout(6000),
    };
    const [profileResponse, response] = await Promise.all([
      fetch(profileUrl, options),
      fetch(url, options),
    ]);
    if (!profileResponse.ok || !response.ok) {
      console.warn(
        `[instagram] API da Meta respondeu ${profileResponse.status}/${response.status}`,
      );
      return result(instagramFallbackPosts, 'fallback');
    }

    const profile: unknown = await profileResponse.json();
    if (
      typeof profile !== 'object' ||
      profile === null ||
      !('username' in profile) ||
      String(profile.username).toLowerCase() !== site.handle
    ) {
      console.warn('[instagram] Token não pertence a @ofrancomaia');
      return result(instagramFallbackPosts, 'fallback');
    }

    const body: unknown = await response.json();
    const data =
      typeof body === 'object' && body !== null && 'data' in body
        ? (body as { data: unknown }).data
        : null;
    const posts = Array.isArray(data)
      ? data
          .map((item: MetaMedia) => toPost(item))
          .filter((item) => item !== null)
      : [];

    if (posts.length === 0) {
      return result(instagramFallbackPosts, 'fallback');
    }

    cached = { posts, expiresAt: Date.now() + CACHE_MS };
    return result(posts, 'api');
  } catch (error) {
    console.warn(
      '[instagram] Não foi possível consultar a API da Meta',
      error instanceof Error ? error.name : 'Erro desconhecido',
    );
    return result(instagramFallbackPosts, 'fallback');
  }
}
