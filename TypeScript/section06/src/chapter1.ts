/**
 * 타입스크립트의 클래스
 */

const employee = {
  name: "남경진",
  age: 30,
  position: "developer",
  work() {
    console.log("공부중");
  },
};

class Employee {
  // 필드
  name: string;
  age: number;
  position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("공부함");
  }
}

class ExecutiveOfficer extends Employee {
  // 필드
  officNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position); // 안쓰면 오류
    this.officNumber = officeNumber;
  }
}

const employeeB = new Employee("남경진", 30, "개발자");
console.log(employeeB);

const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {},
};
