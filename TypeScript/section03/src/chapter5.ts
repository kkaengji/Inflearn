/**
 * 타입 추론
 */

let a = 10;
let b = "hello";
let c = {
  id: 1,
  name: "남경진",
  profile: {
    nickname: "kkaengji",
  },
  urls: ["https://naver.com"],
};

let { id, name, profile } = c;

let [one, two, three] = [1, "hello", true];

function func(message = "hello") {
  return "hello";
}

// any타입의 진화 (암묵적인 경우)
let d;
d = 10;
d.toFixed();

d = "hello";
d.toUpperCase();

// const일 경우 리터럴 타입
const num = 10;
const str = "hello";

let arr = [1, "string"];
