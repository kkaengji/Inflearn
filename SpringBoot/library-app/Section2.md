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
### 1. MySQL 접속 /종료
```bash
# MySQL 접속
  $ cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
  $ ./mysql -u root -p
```

### 2. 데이터베이스 관리
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

### 3. 테이블 관리
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

### 4. 데이터 조작 (CRUD)
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