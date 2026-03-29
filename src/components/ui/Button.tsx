"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children" | "className"> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-foreground text-background border border-foreground hover:bg-foreground/90",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-accent hover:text-accent-foreground",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-accent hover:text-accent-foreground",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-base",
  md: "h-10 px-5 text-base",
  lg: "h-12 px-8 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className = "",
      disabled = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
        className={`
          inline-flex items-center justify-center gap-2
          font-mono font-medium tracking-tight
          transition-colors duration-200
          disabled:pointer-events-none disabled:opacity-50
          cursor-pointer
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
