/**
 * 접근 제어자
 * access modifier
 * => public private protected
 */

class Employee {
  // 필드 생략가능

  // 생성자
  constructor(
    public name: string,
    private age: number,
    protected position: string
  ) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log(`${this.name}는 ${this.position} 입니다.`);
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

  // 메서드
  func() {
    this.name;
    //this.age;
    this.position;
  }
}

const employee = new Employee("남경진", 30, "개발자");
employee.name = "박주선";
//employee.age = 27;
//employee.position = "학생";
