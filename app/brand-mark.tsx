type BrandMarkProps = {
  className?: string;
  labelled?: boolean;
};

export function BrandMark({ className = 'size-10', labelled = false }: BrandMarkProps) {
  return (
    // oxlint-disable-next-line next/no-img-element -- generated brand asset is a compact local PNG
    <img
      src="/assets/brand/fm-mark.png"
      className={className}
      width={512}
      height={512}
      alt={labelled ? 'Monograma FM' : ''}
      aria-hidden={labelled ? undefined : 'true'}
    />
  );
}
