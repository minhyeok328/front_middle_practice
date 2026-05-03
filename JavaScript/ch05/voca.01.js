// 함수
// 1. 함수 선언문(Declaration)
// 2. 함수 표현식(Expression)

// 함수 선언문
function fn() {}

// 함수 표현식
const fn = function () {};

// ====================================================================================================

// 호이스팅(Hoisting)
// 자바스크립트에서 함수 호이스팅(Hoisting)은 함수 선언이 해당 함수의 호출보다 먼저 평가되는 개념입니다.
// 즉, 자바스크립트 엔진은 함수 선언을 코드의 실행 전에 끌어올려서 처리하기 때문에, 함수가 선언되기 전에 호출해도 에러가 발생하지 않습니다.
// 따라서, 하단의 hello() 함수 호출의 코드가 함수 선언 이전에 작성되어도 작동하는 것이 바로 이 이유에서 입니다.

// 단, 함수 호이스팅 현상은 함수 선언문에서만 발생하고, 함수 표현식에서는 발생하지 않습니다.

hello();
arrow();

function hello() {
    console.log("테스트: 함수 선언문으로 작성된 함수입니다.");
}

const arrow = function () {
    console.log("테스트: 함수 표현식으로 작성된 함수입니다.");
};

// ====================================================================================================

// 함수의 반환 및 종료
function hello() {
    return "Hello world!";
    // return 키워드 이후에 작성된 코드는 동작하지 않습니다.
}

function plusOne(num) {
    // 방어 코드 작성
    if (typeof num !== "number") {
        console.log("숫자가 아닌 값이 전달되었습니다.");
        return 0;
    }
    return num + 1;
}

console.log(plusOne()); // NaN => undefined + 1
console.log(plusOne(10)); // 11

// 매개변수 패턴 (Parameter Pattern)
// 기본값(Default Value)
function total(x, y) {
    return x + y;
}

console.log(total(10, 20)); // 30
console.log(total(10)); // 11

// 구조 분해 할당
const user = {
    name: "9Diin",
    born: 1900,
};

function getName(user) {
    const { name, born } = user;
    return name;
    // return user.name;
}

function getName({ name }) {
    return name;
}

function getEmail({ email }) {
    return email;
}

console.log(getName(user)); // "9Diin"
console.log(getEmail(user)); // undefined

const fruits = ["Apple", "Banana", "Cherry"];
const numbers = [1, 2, 3, 4, 5];

function getSecondItem([a, b, c]) {
    console.log("a:", a);
    console.log("b:", b);
    console.log("c:", c);

    return b;
}
console.log(getSecondItem(fruits));
console.log(getSecondItem(numbers));

// 나머지 매개변수
function add(...rest) {
    console.log(rest); // => 왜 이 부분이 배열로 출력이 될까?
    // ...rest는 함수의 가변 인자를 처리하기 위한 문법입니다. 즉, 전달된 인자들을 배열 형태로 자동 수집해 줍니다.

    return rest.reduce(function (acc, cur) {
        // acc: 누적 값
        // cur: 현재 값
        return acc + cur;
    }, 0);
}
console.log(add(1, 2));
console.log(add(1, 2, 3, 4));
console.log(add(1, 2, 3, 4, 5, 6, 7, 8, 9));
