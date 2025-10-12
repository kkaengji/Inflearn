// enum 타입 (열거형)
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

enum Role {
  ADMIN,
  USER,
  GUEST,
}

enum Language {
  korea = "ko",
  english = "en",
}

const user1 = {
  name: "남경진",
  role: Role.ADMIN, // 0 관리자
  Language: Language.korea,
};
const user2 = {
  name: "박주선",
  role: Role.USER, // 1 일반 유저
};
const user3 = {
  name: "홍길동",
  role: Role.GUEST, // 2 게스트
};
