interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    default: "bg-muted text-muted-foreground",
    outline: "bg-transparent border border-white/20 text-white/60",
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-base font-mono font-medium tracking-wide
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
