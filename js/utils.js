// Επιτρέπει μόνο αριθμούς και σύμβολα τηλεφώνου
export function allowOnlyPhoneChars(input) {
  input.value = input.value.replace(/[^0-9+\-\s()]/g, "");
}
