function allKeysAndSymbols(object) {
  let obj = object;
  const keys = [];
  while (obj) {
    keys.push(...Object.getOwnPropertyNames(obj));
    keys.push(...Object.getOwnPropertySymbols(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return keys;
}

console.log(allKeysAndSymbols(Math));
console.log(allKeysAndSymbols([]));

