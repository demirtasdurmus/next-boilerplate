/**
 * Gets username from email
 *
 * @export
 * @param {string} email
 * @return {*}  {string}
 */
export function getUsernameFromEmail(email: string): string {
  return email.split('@')[0];
}
