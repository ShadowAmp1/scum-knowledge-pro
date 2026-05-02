import Image from "next/image";

type OptimizedMapBackgroundProps = {
  className?: string;
  children?: React.ReactNode;
};

export function OptimizedMapBackground({ className = "", children }: OptimizedMapBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/scum-current-map.png"
          alt="SCUM Map"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/22" />
      </div>
      {children}
    </div>
  );
}
