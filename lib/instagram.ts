export type InstagramPost = {
  id: string;
  href: string;
  image: string;
  kind: 'POST' | 'REEL';
};

// Capas do próprio @ofrancomaia, mantidas no projeto para a seção continuar
// útil enquanto a API da Meta não estiver configurada ou estiver indisponível.
export const instagramFallbackPosts: InstagramPost[] = [
  {
    id: 'DdPxJ9SDtiU',
    href: 'https://www.instagram.com/ofrancomaia/p/DdPxJ9SDtiU/',
    image: '/assets/instagram/ddpxj9sdtiu.jpg',
    kind: 'POST',
  },
  {
    id: 'DdOeZwtBmPM',
    href: 'https://www.instagram.com/ofrancomaia/reel/DdOeZwtBmPM/',
    image: '/assets/instagram/ddoezwtbmpm.jpg',
    kind: 'REEL',
  },
  {
    id: 'DdMYzeHOaJm',
    href: 'https://www.instagram.com/ofrancomaia/reel/DdMYzeHOaJm/',
    image: '/assets/instagram/ddmyzehoajm.jpg',
    kind: 'REEL',
  },
  {
    id: 'DdFtqx1DscJ',
    href: 'https://www.instagram.com/ofrancomaia/p/DdFtqx1DscJ/',
    image: '/assets/instagram/ddftqx1dscj.jpg',
    kind: 'POST',
  },
  {
    id: 'DdAgRWquERa',
    href: 'https://www.instagram.com/ofrancomaia/reel/DdAgRWquERa/',
    image: '/assets/instagram/ddagrwquer.jpg',
    kind: 'REEL',
  },
  {
    id: 'Dc7asohjnEi',
    href: 'https://www.instagram.com/ofrancomaia/p/Dc7asohjnEi/',
    image: '/assets/instagram/dc7asohjnei.jpg',
    kind: 'POST',
  },
];
