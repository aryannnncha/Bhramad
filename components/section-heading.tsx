"use client";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-black/65 sm:text-lg">{description}</p> : null}
    </div>
  );
}
