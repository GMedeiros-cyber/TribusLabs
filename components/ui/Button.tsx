import type { ButtonHTMLAttributes } from "react";

// DESIGN.md §9 — variantes primary (CTA azul) e secondary (ghost).
// Estilo nos tokens CSS (.btn-primary / .btn-secondary em globals.css):
// radius-md (8px, NUNCA pill), hover translateY(-1px)+brightness, focus accent.
type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  return (
    <button
      type={type}
      className={`${variantClass}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
