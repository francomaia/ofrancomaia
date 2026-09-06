type BrandMarkProps = {
  className?: string;
  labelled?: boolean;
};

export function BrandMark({
  className = 'h-10 w-auto',
  labelled = false,
}: BrandMarkProps) {
  return (
    // oxlint-disable-next-line next/no-img-element -- generated signature is a compact local PNG with transparency
    <img
      src="/assets/brand/franco-signature-white.png"
      className={className}
      width={640}
      height={286}
      alt={labelled ? 'Franco' : ''}
      aria-hidden={labelled ? undefined : 'true'}
    />
  );
}
