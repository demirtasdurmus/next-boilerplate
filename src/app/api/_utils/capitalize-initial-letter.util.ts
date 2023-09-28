/**
 * Capitalize the first letter of a string
 *
 * @export
 * @param {string} text
 * @return {*}  {string}
 */
export function capitalizeInitialLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
