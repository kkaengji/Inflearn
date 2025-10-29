# 1. 스프링 프로젝트를 시작하는 방법

## 설치

- JAVA JDK : 프로그래밍 언어
- JetbrainToolBox / IntelliJ : 통합 개발 도구
- POSTMAN : API 테스트 프로그램
- MySQL: 데이터베이스
- Git : 버전관리 프로그램

## 프로젝트 시작하기

https://start.spring.io/

---

# 2. @SpringBootApplication과 서버

## 1. annotation @어노테이션

: 자바 소스 코드에 **메타데이터(metadata)**를 추가하는 방법
: 프로그램의 동작에는 직접적인 영향을 주지 않지만, Spring이 해석해서 특정 기능을 자동 수행하게 만드는 역할

```bash
# 서버 실행 및 다양한 초기 설정 자동화
@SpringBootApplication
public class LibraryAppApplication {

  public static void main(String[] args) {
    SpringApplication.run(LibraryAppApplication.class, args);
  }
}
```

---

# 3. HTTP 요청과 응답

## HTTP Method & Path

: HTTP Method는 클라이언트가 서버에게 어떤 동작을 요청하는지를 나타내는 방식

| 메서드   | 의미             | 데이터 전달 방식  | 예시 요청       |
| -------- | ---------------- |------------| --------------- |
| `GET`    | 데이터 조회      | Query(URL) | GET /users      |
| `POST`   | 데이터 생성      | Body       | POST /users     |
| `PUT`    | 데이터 전체 수정 | Body       | PUT /users/1    |
| `PATCH`  | 데이터 일부 수정 | Body       | PATCH /users/1  |
| `DELETE` | 데이터 삭제      | Query(URL) | DELETE /users/1 |

## URL (Uniform Resource Locator)

- Http://spring.com:3000/portion?color=red&count=2
  사용하고 있는 프로토콜://도메인이름:포트/자원의경로(path)?쿼리(추가정보)

## 상태 코드

- 2xx (Success): 성공
- 3xx (Redirection): 리다이렉션
- 4xx (Client Error): 클라이언트 오류
- 5xx (Server Error): 서버 오류

---

# 4. GET API 개발하고 테스트

## API (Application Programming Interface)

: 응용 프로그램들이 서로 상호작용할 수 있도록 정해 놓은 규칙 또는 약속

## API를 이루고 있는 요소

- HTTP Method
- HTTP Path
- 쿼리 (key와 value)
- API의 반환 결과

## GET query
```bash
GET /add? number1=10&number2=20
Host:localhost:8080
```

## 실습 예제 1. RequestParam을 이용

```bash
@RestController
public class CalculatorController {

    @GetMapping("/add")
    public int addTwoNumbers(
        @RequestParam int number1,
        @RequestParam int number2
    ) {
        return number1 + number2;
    }
}
```

### @RestController

: 클래스를 API의 진입 지점으로 만들어주는 RESTful 웹 서비스 (API) 개발 핵심 어노테이션
: 주어진 Class를 Controller로 등록 (API의 입구)

### @GetMapping("/add")

: 아래 함수를 HTTP Method가 GET이고 HTTP path가 /add인 API로 지정

### @ReqyestParam

: 주어지는 쿼리를 함수 파라미터에 넣는다.

---

## 실습 예제 1.2. Controller에서 @RequestParam 제거

```bash
@RestController
public class CalculatorController {

    @GetMapping("/add")
    public int addTwoNumbers(CalculatorAddRequest request) {
        return request.getNumber1() + request.getNumber2();
    }
}
```

```bash
# DTO (Data Transfer Object): 정보를 전달하는 역할의 객체
public class CalculatorAddRequest {
    // 필드 생성
    private final int number1;
    private final int number2;

    // 생성자 생성 Alt + Insert
    public CalculatorAddRequest(int number1, int number2) {
        this.number1 = number1;
        this.number2 = number2;
    }

    // getter 생성
    public int getNumber1() {
        return number1;
    }
    public int getNumber2() {
        return number2;
    }

}
```

---

# 5. POST API 개발하고 테스트하기

## JSON (JavaScript Object Notation)

: 객체 표기법, 무언가를 표현하기 위한 형식

```bash
POST/multiply
Host:localhost:8080

{
  "number1": 10,
  "number2": 20
}
```

```bash
@RestController
public class CalculatorController {
    
    
    @PostMapping("/multiply") // POST /multiply
    public int multiplyTwoNumbers(@RequestBody CalculatorMultiplyRequest request) {
        return request.getNumber1() * request.getNumber2();
    }
}
```

## @PostMapping("/multiply")
: 아래 함수를 HTTP Method가 POST이고 Path가 /multiply인 API로 지정

## @RequestBody
: HTTP Body로 들어오는 JSON을 객체(CalculatorMultiplyRequest)로 바꿈

---
