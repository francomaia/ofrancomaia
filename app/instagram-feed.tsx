'use client';

import { ArrowUpRight } from 'lucide-react';
import { siInstagram } from 'simple-icons';
import { useEffect, useState } from 'react';
import { instagramFallbackPosts, type InstagramPost } from '@/lib/instagram';
import { site } from '@/lib/site';

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>(instagramFallbackPosts);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/instagram', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const feed = data as {
          posts?: InstagramPost[];
          source?: string;
        } | null;
        if (feed?.source === 'api' && feed.posts?.length) {
          setPosts(feed.posts);
        }
      })
      .catch(() => {
        // As capas locais continuam visíveis se a API ou a rede falhar.
      });

    return () => controller.abort();
  }, []);

  return (
    <section
      id="instagram"
      className="instagram-section editorial-section relative py-16 sm:py-36"
      aria-labelledby="instagram-titulo"
    >
      <div className="noise-layer absolute inset-0" aria-hidden="true" />
      <div className="site-shell relative z-10">
        <div className="instagram-heading">
          <div>
            <span className="micro-label">Bastidores e ideias</span>
            <h2 id="instagram-titulo" className="display-title mt-5">
              INSTAGRAM.
            </h2>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-button group"
          >
            Seguir @{site.handle}
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:rotate-45"
            />
          </a>
        </div>

        <div className="instagram-grid mt-12 sm:mt-20">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-card"
              aria-label={`Ver ${post.kind === 'REEL' ? 'reel' : 'post'} de Franco Maia no Instagram`}
            >
              {/* oxlint-disable-next-line next/no-img-element -- capas locais e URLs temporárias da API oficial */}
              <img
                src={post.image}
                alt=""
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
              />
              <span className="instagram-card-top">
                <span>{post.kind}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d={siInstagram.path} />
                </svg>
              </span>
              <span className="instagram-card-bottom">Ver publicação</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
