export function extractYYYYMMDD(
  date: Date,
  delimiter: string = '.'
): string {
  const month = date.getMonth().toString().padStart(2, '0');

  const day = date.getDate().toString().padStart(2, '0');

  return `${date.getFullYear()}${delimiter}${month}${delimiter}${day}`;
}

export function extractHHMM(date: Date): string {
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${date.getHours()}:${minute}`;
}

export function convertWonFormat(number: number | string) {
  return new Intl.NumberFormat('ko-KR').format(+number);
}

export function trucateWithEllipses(
  str: string,
  limit: number
): string {
  if (str.length < limit) {
    return str;
  } else {
    return str.slice(0, limit) + '...';
  }
}
