import logoImage from "../../imports/FDFB3292-4B8F-47B0-8625-7191F33501A6.png";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg";
  light?: boolean;
  className?: string;
}

export function IFRShieldLogo({ size = "md", light = false, className = "" }: LogoProps) {
  const h = { xs: "h-6", sm: "h-8", md: "h-10", lg: "h-14" }[size];

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="IFRShield AI"
        className={`${h} w-auto object-contain`}
        style={{
          // mix-blend-mode: multiply removes white/light backgrounds on warm surfaces.
          // On dark panels we use screen to keep the logo visible.
          mixBlendMode: light ? "screen" : "multiply",
        }}
      />
    </div>
  );
}
