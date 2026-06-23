import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

// DESIGN.md §9 — variantes primary (CTA azul) e secondary (ghost).
// Estilo nos tokens CSS (.btn-primary / .btn-secondary em globals.css).
// Polimórfico: com `href` renderiza <a> (âncoras/navegação); sem href, <button>.
type ButtonVariant = "primary" | "secondary";

type ButtonProps =
  | ({ variant?: ButtonVariant; href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ variant?: ButtonVariant; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>);

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const cls =
    (variant === "primary" ? "btn-primary" : "btn-secondary") +
    (className ? ` ${className}` : "");

  if (props.href !== undefined) {
    return <a className={cls} {...props} />;
  }

  const { type = "button", ...buttonProps } = props;
  return <button type={type} className={cls} {...buttonProps} />;
}
