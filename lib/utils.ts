// cn — junta classNames condicionais (filtra falsy). Minimal, sem clsx/tailwind-merge
// (não instalados no projeto); suficiente p/ compor classes nos componentes de UI.
export function cn(
  ...classes: Array<string | number | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
