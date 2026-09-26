"use client";

interface AccentHeadingProps {
  children: string;
  className?: string;
}

export function AccentHeading({ children, className = "" }: AccentHeadingProps) {
  const words = children.split(" ");
  const lastTwoWords = words.slice(-2);
  const beforeWords = words.slice(0, -2);

  return (
    <h2 className={`font-semibold text-foreground ${className}`}>
      {beforeWords.length > 0 && <>{beforeWords.join(" ")} </>}
      <span className="text-primary">{lastTwoWords.join(" ")}</span>
    </h2>
  );
}
