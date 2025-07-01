export function getCssVariableValue(name: string): string {
  // Convert name like "primary" into "--primary"
  const variableName = name.startsWith('--') ? name : `--${name}`;

  // Get value from :root style
  const rootStyles = getComputedStyle(document.documentElement);
  return rootStyles.getPropertyValue(variableName).trim();
}
