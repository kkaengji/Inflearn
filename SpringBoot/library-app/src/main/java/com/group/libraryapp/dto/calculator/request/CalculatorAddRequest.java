package com.group.libraryapp.dto.calculator.request;

// DTO 데이터 전송 객체
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
