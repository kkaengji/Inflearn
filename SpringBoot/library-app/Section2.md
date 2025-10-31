# 1. Database
## Database란?
: 데이터를 구조화 시켜 저장

### RDB(Relational Database) - MySQL
: 데이터를 표처럼 구조화 시켜 저장하는 방식

### SQL(Structured Query Language)
: 표처럼 구조화된 데이터를 조회하는 언어

---

# 2. MySQL
## MySQL에 접근하는 방법 2가지
1. IntelliJ Ultimate로 연결
2. CLI로 접근 
- MySQL Command Line Client
- 터미널 (git bash, powerShell)

## MySQL 타입
### 정수타입
- tinyint: 1바이트 정수
- int: 4바이트 정수
- bigint: 8바이트 정수
### 실수타입
- double: 8바이트 정수
- decimal(A, B): 소수점을 B개 가지고 있는 전체 A자릿수 실수
### 문자열 타입
- char(A): A 글자가 들어갈 수 있는 문자열 (글자수 고정)
- varchar(A): 최대 A글자가 들어갈 수 있는 문자열
### 날짜, 시간 타입
- date: 날짜, yyyy-MM-dd
- time: 시간, HH:mm:ss
- datetime: 날짜와 시간을 합친 타입, yyyy-MM-dd HH:mm:ss

## MySQL 명령어
### MySQL 접속 /종료
```bash
# MySQL 접속
  $ cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
  $ ./mysql -u root -p
```

### 데이터베이스 관리
```sql
-- 모든 데이터베이스 목록 보기
SHOW DATABASES;

-- 데이터베이스 생성
CREATE DATABASE 데이터베이스명;

-- 데이터베이스 삭제
DROP DATABASE 데이터베이스명;

-- 사용할 데이터베이스 선택
USE 데이터베이스명;
```

### 테이블 관리
```sql
-- 테이블 생성
CREATE TABLE fruit (
  id 			BIGINT AUTO_INCREMENT,
  name 			VARCHAR(20),
  price 		INT,
  stocked_date  DATE,
  PRIMARY KEY (ID)
);

-- 테이블 삭제
DROP TABLE 테이블명;

-- 테이블 이름 변경
RENAME TABLE oldname TO newname;

-- 현재 데이터베이스의 모든 테이블 보기
SHOW TABLES;

-- 테이블 구조 보기
DESCRIBE 테이블명;
-- 또는
SHOW COLUMNS FROM 테이블명;

```

### 데이터 조작 (CRUD)
```sql
-- 데이터 삽입 (Create)
INSERT INTO fruit (name, price, stocked_date) VALUES ('사과', 1000, '2025-10-30');

-- 데이터 조회 (Read)
-- 조건에는 =, <=, !=, <, >, >=, BETWEEN, IN, NOT IN 등이 있음.
SELECT * FROM fruit;
SELECT name, price FROM fruit WHERE id = 1;
SELECT name, price FROM fruit WHERE name = '사과' OR price = 1000;
SELECT * FROM fruit WHERE price BETWEEN 1000 AND 2000;
SELECT * FROM fruit WHERE name IN ('사과', '수박');

-- 데이터 수정 (Update)
-- 조건을 붙이지 않으면 모든 데이터가 수정된다.
UPDATE fruit SET price = 1500 WHERE name = '사과';

-- 데이터 삭제 (Delete)
-- 조건을 붙이지 않으면 모든 데이터가 삭제된다.
DELETE FROM fruit WHERE id = 1;
```

---

# 3. Spring에서 Database 사용
## application.yml
: 스프링 부트가 MySQL에 접속하기 위한 설정 파일

```bash
spring:
  datasource:
    url: "jdbc:mysql://localhost/library"
    username: "root"
    password: ""
    driver-class-name: com.mysql.cj.jdbc.Driver
```

- datasource: Springboot가 어떤 db를 가리키게 할 것인가
- url: spring이 붙을 데이터베이스의 주소
  - jdbc: java-database-connector
  - mysql: 데이터베이스 종류
  - library: 데이터베이스 이름 
- driver-class-name: 데이터베이스에 접근할 때 사용할 프로그램

## GET API 변경 
```bash
@RestController
public class UserController {

    # jdbcTemplate을 이용해 SQL 사용
    private final JdbcTemplate jdbcTemplate;

    # 생성자를 만들어 jdbcTemplate을 파라미터로 넣으면, 자동으로 들어옴
    public UserController(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping("/user")
    public void saveUser(@RequestBody UserCreateRequest request) {
        String sql = "INSERT INTO user (name, age) VALUES (?, ?)";
        jdbcTemplate.update(sql, request.getName(), request.getAge());
    }

    @GetMapping("/user")
    public List<UserResponse> getUsers() {
        String sql = "SELECT * FROM user";
        return jdbcTemplate.query(sql, new RowMapper<UserResponse>() {
            @Override
            public UserResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
                long id = rs.getLong("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                return new UserResponse(id, name, age);
            }
        });
    }
    
    @PutMapping("/user")
    public void updateUser(@RequestBody UserUpdateRequest request) {
        String readSql = "SELECT * FROM user WHERE id = ?";
        boolean isUserNotExist = jdbcTemplate.query(readSql, (rs, rowNum) -> 0, request.getId()).isEmpty();
        if (isUserNotExist) {
            throw new IllegalArgumentException();
        }

        String sql = "UPDATE user SET name = ? WHERE id = ?";
        jdbcTemplate.update(sql, request.getName(), request.getId());
    }
    
    
}
```
- @RestController
 : UserController 클래스의 API의 진입지점으로 만들 뿐 아니라 스프링 빈으로 등록
- String sql = "INSERT INTO user (name, age) VALUES (?, ?)";
 : SQL을 만들어 문자열 변수로 저장
 : 값이 들어가는 부분에 ?를 사용하면, 값을 유동적으로 넣을 수 있음
- jdbcTemplate.update(sql, request.getName(), request.getAge());
 : 첫 파라미터로는 sql을 받고, ?를 대신할 값을 차례로 넣으면 됨
- RowMapper: query의 결과를 받아 원하는 객체를 반환해주는 역할
- @Override 
  - mapRow()
  : JDBC Template의 쿼리가 SQL을 수행하여 유저 정보를 UserResponse로 바꿔주는 역할을 수행
    - ResultSet에 getType("필드이름")을 사용해 실제 값을 가져옴

- String readSql = "SELECT * FROM user WHERE id = ?";
 : id를 기준으로 유저가 존재하는지 확인하기 위해 쿼리 작성
- jdbcTemplate.query(readSql, (rs, rowNum) -> 0, request.getId())
 : read SQL에 있던 물음표 자리에 request.getId()가 들어갔고, 결과가 있으면 0이 담긴 List가 반환되고 없으면 빈 List가 나옴
- throw new IllegalArgumentException();
 : 메서드에 전달된 인수가 유효하지 않거나 부적절할 때 예외를 던짐

---

# 4. Clean Code
- 가독성: 의도를 분명히 밝히는 이름, 간결하고 작은 함수
- 단순성: DRY, KISS
- 설계: SOLID 원칙 준수, 높은 응집도, 낮은 결합도
- 습관: 보이 스카우트 규칙

---

# 5. 스프링 빈 등록 및 의존성 주입 과정
: 컨테이너는 의존 관계(Controller -> Service -> Repository)의 역순으로, 즉 필요한 객체가 먼저 준비(등록)되는 순서에 따라 빈을 인스턴스화하고 의존성을 주입
 - 컨테이너 시작: 서버 시작과 함께 스프링 컨테이너가 구동되며 가장 기본적인 빈들이 등록
 - 하위 계층 빈 등록: JdbcTemplate을 의존하는 **UserRepository**가 먼저 등록
 - 중간 계층 빈 등록: UserRepository를 의존하는 **UserService**가 등록
 - 상위 계층 빈 등록: UserService를 의존하는 **UserController**가 최종적으로 등록

## 컨트롤러-서비스-리포지토리 3계층 역할
- 컨트롤러 계층 (Controller Layer)
: 클라이언트(웹 브라우저, 모바일 앱 등)의 요청을 받아들이고 응답하는 역할
- 서비스 계층 (Service Layer)
: 
- 리포지토리 계층 (Repository Layer)
: 

---

# 6. 스프링 컨테이너 (ApplicationContext)
: 스프링 빈들을 생성하고 관리하며, 이 빈들이 서로 필요한 다른 빈들을 주입받도록 연결
 *빈? 스프링 컨테이너가 관리하는 자바 객체

- @Configuration
: 클래스에 붙이는 어노테이션
: @Bean을 사용할 때 함께 사용해 주어야 한다.

- @Bean
: 메소드에 붙이는 어노테이션
: 반환되는 객체를 스프링 빈에 등록한다.

- @Component
: 주어진 클래스를 '컴포넌트'로 간주한다.
: 이 클래스들은 스프링 서버가 뜰 때 자동으로 감지된다.

- @Primary
: 동일한 타입의 빈(Bean)이 여러 개 존재할 때, 그중에서 기본적으로 주입될 빈을 지정

- @Qualifier
: 동일한 타입의 빈(Bean)이 여러 개 존재할 때, 스프링에게 "정확히 어떤 빈을 주입해야 하는지" 지정해주는 역할
: @Primary보다 높은 우선순위를 가짐

## 스프링 빈을 주입 받는 몇 가지 방법
1. (가장 권장)생성자를 이용해 주입받는 방식
2. setter와 @Autowired 사용
3. 필드에 직접 @Autowired 사용