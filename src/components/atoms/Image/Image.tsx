import { useState } from "react";
import { cn } from "@/hooks";

interface ImageProps {
  src: string;
  alt: string;
  placeholder?: boolean;
  aspectRatio?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export function Image({
  src,
  alt,
  placeholder = false,
  aspectRatio,
  className,
  loading = "lazy",
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const style = aspectRatio ? { aspectRatio } : undefined;

  if (placeholder || errored) {
    return (
      <div
        style={style}
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-accent rounded-md bg-surface text-textMuted",
          !aspectRatio && "min-h-[200px]",
          className,
        )}
      >
        <span className="text-caption font-body text-center px-4 leading-relaxed">
          {errored ? "Image unavailable" : "Image coming soon"}
        </span>
        {!errored && (
          <span className="text-caption text-textMuted mt-1 opacity-60">
            {alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden group",
        !aspectRatio && "block",
        className,
      )}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-surface animate-pulse rounded-md" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn(
          "w-full h-full object-contain transition-opacity duration-[var(--dur-fast)]",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Animated Silver Frame on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <img src="/images/wrapper.gif" alt="Silver Frame" className="w-full h-full object-fill" />
      </div>
    </div>
  );
}
