export function getRandomString() {
  return (Math.random() + 1).toString(36);
}

export function getRandomNumber() {
  return Math.ceil((Math.random() * 1000));
}
