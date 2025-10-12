/**
 * 클래스
 */

class Student {
  // 필드
  name;
  grade;
  age;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  // 메서드
  study() {
    console.log("열심히 유튜브 보는중");
  }

  introduce() {
    console.log(`뫄? ${this.name}!?`);
  }
}

class StudentDeveloper extends Student {
  // 필드
  favoriteSkill;

  // 생성자
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age);
    this.favoriteSkill = favoriteSkill;
  }

  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 하는중`);
  }
}

const studentDeveloper = new StudentDeveloper("남경진", "A+", 30, "TypeScript");

// 클래스
let studentB = new Student("박주선", "B+", 27);
