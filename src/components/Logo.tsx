interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <img
      src="/logo-circle.jpg"
      className={className}
      alt="Kartik Clarity"
      width={48}
      height={48}
      loading="eager"
    />
  );
}