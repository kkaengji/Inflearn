/**
 * keyof 연산자
 */

type Person = typeof person;

function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}

const person = {
  name: "남경진",
  age: 30,
};

getPropertyKey(person, "name");
