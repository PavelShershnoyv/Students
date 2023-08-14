import { IUser } from "./interface";

export function getAge(bth: string) {
  const cur = new Date();
  const birthday = new Date(bth);

  let age = cur.getFullYear() - birthday.getFullYear();

  if (cur.getMonth() < birthday.getMonth()) {
    return age - 1;
  }
  if (
    cur.getMonth() === birthday.getMonth() &&
    cur.getDate() < birthday.getDate()
  ) {
    return age - 1;
  }

  return age;
};

export function declination(number: number, titles: string[] = [' год', ' года', ' лет']) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2:cases[(number%10<5)?number%10:5] ];
}

export function byField(fieldName: string) {
  return (a: IUser, b: IUser) =>
    a[fieldName as keyof IUser] > b[fieldName as keyof IUser] ? 1 : -1;
}