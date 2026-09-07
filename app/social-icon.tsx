import { siBehance, siInstagram } from 'simple-icons';

const icons: Record<string, { path: string }> = {
  Instagram: siInstagram,
  Behance: siBehance,
};

/**
 * Ícone de rede social. O nome legível continua no `aria-label` de quem chama,
 * então o desenho pode ficar puramente decorativo.
 */
export function SocialIcon({ label }: { label: string }) {
  const icon = icons[label];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}
