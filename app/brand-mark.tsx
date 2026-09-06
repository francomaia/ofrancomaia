type BrandMarkProps = {
  className?: string;
  labelled?: boolean;
};

export function BrandMark({
  className = 'h-8 w-auto',
  labelled = false,
}: BrandMarkProps) {
  return (
    // oxlint-disable-next-line next/no-img-element -- generated wordmark is a compact local PNG with transparency
    <img
      src="/assets/brand/franco-wordmark-white.png"
      className={className}
      width={720}
      height={240}
      alt={labelled ? 'Franco' : ''}
      aria-hidden={labelled ? undefined : 'true'}
    />
  );
}
