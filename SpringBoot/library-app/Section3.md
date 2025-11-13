# 1. JPA (Java Persistence API)
- 자바 진영의 ORM (Object-Relational Mapping)
- 객체와 관계형 DB의 테이블을 짝지어 데이터를 영구적으로 저장할 수 있도록 정해진 Java 진영의 규칙

## SQL을 직접 작성하면 안좋은 점
- 컴파일 시점에 발견되지 않고, 런타임 시점에 발견된다.
- 특정 데이터베이스에 종속적이게 된다.
- 반복 작업이 많아진다. 테이블을 하나 만들 때마다 CRUD 쿼리가 항상 필요하다.
- 데이터베이스의 테이블과 객체는 패러다임이 다르다.

## JPA 어노테이션
```bash
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = null;

    @Column(nullable = false, length = 20)
    private String name;
    private Integer age;

    protected User() {

    }
    ...
}
```

- @Entity : 스프링이 User 객체와 user 테이블을 같은 것으로 바라본다.
- @Id: 이 필드를 primary key로 간주한다.
- @GeneratedValue: primary key는 자동 생성되는 값이다.
- @Column: 객체의 필드와 Table의 필드를 매핑함
  - null이 들어갈 수 있는지 여부, 길이 제한, DB에서의 column 이름
  - 객체의 필드 이름과 테이블의 column 이름이 동일하면 생략 가능
  - Column은 생략 할 수도 있다.

```bash
spring:
  jpa:
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        show_sql: true
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect
```

- ddl-auto: 스프링이 시작할 때 DB에 있는 테이블 처리 방식 설정
  - none: 별다른 조치를 하지 않는다
  - create: 기존 테이블이 있다면 삭제 후 다시 생성 (주의)
  - create-drop: 스프링이 종료될 때 테이블을 모두 제거 (주의)
  - update: 객체와 테이블이 다른 부분만 변경
  - validate: 객체와 테이블이 동일한지 확인

- hibernate: JPA를 사용하기 위한 구현체
  - format_sql: SQL을 보여줄 때 예쁘게 포맷팅 할 것인가
  - show_sql: JAP를 사용해 DB에 SQL을 날릴 때 SQL을 보여줄 것인가
  - dialect: 특정한 DB에 따라 SQL을 수정해준다. (맞춤)

## Spring Data JAP
: 복잡한 JPA 코드를 스프링과 함께 쉽게 사용할 수 있도록 도와주는 라이브러리 <br />
: Simple JPA Repository에서 확인가능

```bash
@Service
public class UserServiceV2 {
    ...
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }
    
    public void updateUser(UserUpdateRequest request){
        // select * from user where id = ?;
        User user = userRepository.findById(request.getId())
                .orElseThrow(IllegalAccessError::new);

        user.updateName(request.getName());
        userRepository.save(user);
    }
}
```

- save(): 주어지는 객체를 저장하거나 업데이트 시켜줌
- findAll(): 주어지는 객체가 매핑된 테이블의 모든 데이터를 가져온다.
- findById(): id를 기준으로 특정한 1개의 데이터를 가져온다.
- orElseThrow(): User가 없다면 예외를 던진다.

```bash
public interface UserRepository extends JpaRepository<User, Long> {

    # 반환 타입은 User, 없다면 null이 반환
    User findByName(String name);
}
```

### By 앞에 들어갈 수 있는 구절 정리
- find: 1건을 가져온다. 반환 타입은 객체가 될 수도 있고, Optional<타입>이 될 수도 있다.
- findAll: 쿼리의 결과물이 N개인 경우 사용. List<타입> 반환
- exists: 쿼리 결과가 존재하는지 확인. 반환 타입은 boolean
- count: SQL의 결과 개수를 센다. 반환 타입은 long
- By 뒤에 붙는 필드 이름으로 SELECT 쿼리의 WHERE 문이 작성된다.

```bash
# SELECT * FROM user WHERE name = ? AND age = ?;
List<User> findAllByNameAndAge(String name, int age);

# SELECT * FROM user WHERE age BETWEEN ? AND ?;
List<User> findAllByAgeBetween(int startAge, int endAge);
```
### By 뒤에 들어갈 수 있는 기능
- GreaterThan: 초과
- GreaterThanEqual: 이상
- LessThan: 미만
- LessThanEqual: 이하
- Between: 사이에
- StartsWith: ~로 시작하는
- EndsWith: ~로 끝나는

# 2. 트랜잭션
: 쪼갤 수 없는 업무의 최소 단위

```bash
# 트랜잭션 시작
start transaction;

# 정상 종료 (SQL 반영)
commit; 

# 트랜잭션 실패 (SQL 미반영)
rollback;
```
## @Transactional

```bash
@Service
public class UserServiceV2 {
    ...
    // 아래 있는 함수가 시작될 때 start transaction;을 해준다 (트랜잭션을 시작)
    // 함수가 예외 없이 잘 끝났다면 commit
    // 문제가 있다면 rollback
    @Transactional
    public void saveUser(UserCreateRequest request){
        User u = userRepository.save(new User(request.getName(), request.getAge()));
    }

    // 읽기 전용
    @Transactional(readOnly = true)
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }
}
```
- 주의 사항
: IOException과 같은 Checked Exception은 롤백이 일어나지 않는다.

## 영속성 컨텍스트 (Persistence Context)
: 테이블과 매핑된 Entity 객체를 관리/보관하는 역할
: 스프링에서는 트랜잭션을 사용하면 영속성 컨텍스트가 생겨나고, 트랜잭션이 종료되면 영속성 컨텍스트가 종료된다.

### 영속성 컨텍스트의 특수 능력
- 변경 감지 (Dirty Check)
: 영속성 컨텍스트 안에서 불러와진 Entity는 명시적으로 save하지 않더라도, 변경을 감지해 자동으로 저장된다.
- 쓰기 지연
: DB의 INSERT / UPDATE / DELETE SQL을 바로 날리는 것이 아니라, 트랜잭션이 commit될 때 모아서 한번만 날린다.
- 1차 캐싱
: ID를 기준으로 Entity를 기억한다.
- 