/**
 * Get unique column from constraint name
 * used to get the column name from a PostgresError constraint name
 * e.g. 'users_email_unique' => 'email'
 * defaults to 'data' if constraint name is not provided
 *
 * @export
 * @param {string} [constraintName]
 * @return {*}  {string}
 */
export function getUniqueColumnFromConstraintName(
  constraintName?: string,
): string {
  return constraintName?.split('_')[1] || 'data';
}
