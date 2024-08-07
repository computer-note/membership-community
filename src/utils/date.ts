export function extractYYYYMMDD(
  date: Date,
  delimiter: string = '.'
): string {
  const month = date.getMonth().toString().padStart(2, 0);

  const day = date.getDate().toString().padStart(2, 0);

  return `${date.getFullYear()}${delimiter}${month}${delimiter}${day}`;
}

export function extractHHMM(date: Date): string {
  const minute = date.getMinutes().toString().padStart(2, 0);

  return `${date.getHours()}:${minute}`;
}
