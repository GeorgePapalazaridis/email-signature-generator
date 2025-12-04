// Allow only numeric and phone-related characters
export function allowOnlyPhoneChars(input) {
  if (!input) return;
  input.value = input.value.replace(/[^0-9+\-\s()]/g, "");
}
