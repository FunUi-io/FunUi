export function getCssVariableValue(name: string): string {
  if (typeof window === 'undefined' || typeof getComputedStyle === 'undefined') {
    return ''; // or throw an error / return a fallback
  }

  const variableName = name.startsWith('--') ? name : `--${name}`;
  const rootStyles = getComputedStyle(document.documentElement);
  return rootStyles.getPropertyValue(variableName).trim();
}
