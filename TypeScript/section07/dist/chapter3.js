/**
 * 제네릭 인터페이스
 */
let keypair = {
    key: "key",
    value: 0,
};
let keyPair2 = {
    key: true,
    value: ["hello"],
};
let numberMap1 = {
    key: -1231,
    key2: 123123,
};
let stringMap = {
    key: "value",
};
let booleanMap = {
    key: true,
};
let stringMap2 = {
    key: "hello",
};
function goToSchool(user) {
    const school = user.profile.school;
    console.log(`${school}로 등교 완료`);
}
const developerUser = {
    name: "남경진",
    profile: {
        type: "developer",
        skill: "TypeScript",
    },
};
const studentUser = {
    name: "박주선",
    profile: {
        type: "student",
        school: "xx대학교",
    },
};
goToSchool(studentUser);
export {};
