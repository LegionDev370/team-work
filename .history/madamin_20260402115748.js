const text = 'Madamin';
console.log(text);
let split = text.split('');

for (let i = 0; i < split.length; i++) {
  let empty = [];
  if (split[i] % 2 === 0) {
    empty.push(split[i].toUpperCase());
  } else {
    empty.push(split[i]);
  }
  return empty;
}
console.log(empty);
console.log(empty);

console.log(undefined);
console.log(null);
console.log("xato so'rov");
