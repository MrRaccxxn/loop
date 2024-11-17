export function sliceString(str: string) {
  if (str?.length <= 8) {
    return str; // If the string is too short, return it as is.
  }
  const first4 = str.slice(0, 4);
  const last4 = str.slice(-4);
  return first4 + last4; // Combine first 4 and last 4 letters.
}
