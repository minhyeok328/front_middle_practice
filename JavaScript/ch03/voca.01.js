// 3. 프로퍼티 열거
// 객체의 프로퍼티 전체를 순회해야 할 때도 있다.

let newObj = { x: 1, y: 2, z: 3 }; // 열거 가능한 자체 프로퍼티는 3개
for (let property in newObj) {
    console.log(property);
}

// for-in 루프를 사용하는 것 보다는 객체의 프로퍼티 이름을 배열에 지정해서 for-of 루프를 사용하는 경우도 있습니다.
// 예를 들어, Object.keys()를 사용하여 객체의 열거 가능한 자체 프로퍼티 이름을 배열로 반환하여 이후에 for-of를 사용하는 방법이 있겠죠?

// ====================================================================================================

// 4. 객체의 확장
// 자바스크립트 프로그램에서 객체의 프로퍼티를 다른 객체에 복사하는 것은 흔한 일입니다. 얕은 복사, 깊은 복사라는 말이 여기에 해당이 됩니다.

let user = { nickname: "9Diin" };
let information = {
    job: "Programmer",
    email: "9Diin@gmail.com",
};

for (let key of Object.keys(information)) {
    user[key] = information[key];
}
console.log(user); // { nickname: '9Diin', job: 'Programmer', email: '9Diin@gmail.com' }

// 하지만 이런 경우가 빈번하지 않으므로, 여러 자바스크립트 프레임워크에서 이런 복사 동작을 수행하는 유틸리티 함수를 정의했습니다.
// Object.assign() 이에 해당합니다.
// Object.assign()은 인자로 두 개 이상의 객체를 받습니다. 첫 번째 인자는 수정해서 반환할 대상 객체이고
// 두 번째 또는 그 이후의 인자는 소스 객체이므로 수정하지 않습니다. 각 소스 객체의 열거 가능한 자체 프로퍼티를 대상 객체에 복사합니다.

// 복사할 때 소스 객체를 인자 순서대로 처리하는데, 첫 번째 소스 객체의 프로퍼티는 대상 객체에 있는 같은 이름의 프로퍼티를 덮어 쓰고,
// 두 번째 소스 객체가 있다면 그 객체의 프로퍼티가 첫 번째 소스 객체에 있는 같은 이름의 프로퍼티를 덮어 씁니다.

// 이렇게 복사를 하는 이유가 가장 중요하겠죠?
// 프로퍼티를 객체에서 다른 객체로 복사하는 이유 중 하나는 소스 객체에 기본 값을 정의해 두고 대상 객체에 그런 이름이 존재하지 않는다면 복사해서 쓰려는 목적입니다.

// 아래와 같이 Object.assign()을 생각 없이 사용하면 원하는 결과를 얻지 못할 수도 있습니다.
// Object.assign(newObj, user); // newObj를 전부 user로 덮어 쓴다.

// console.log(newObj);
// Object.assign(newObj, user);
// console.log(newObj);

// 다음과 같이 새 객체를 생성하고 기본 값을 복사한 다음, 이 기본 값을 newObj의 프로퍼티로 덮어 써야 의도에 맞습니다.
let copy1 = Object.assign({}, user, newObj);
let copy2 = { ...user, ...newObj };

// 위처럼 객체를 복사하고 덮어쓰는 동작을 다음과 같이 스프레드 연산자(분해 연산자) ...으로 하는 방법도 있습니다.

console.log(copy1);
console.log(copy2);
console.log(copy1 === copy2); // false

// ====================================================================================================

// 5. 객체 직렬화
// 객체 직렬화는 객체를 문자열로 반환하는 작업입니다.
// 이 문자열은 나중에 다시 객체로 되돌릴 수 있습니다.
// JSON.stringify()와 JSON.parse()는 자바스크립트 객체를 직렬화하고 되돌리는 함수입니다.

let obj = { x: 1, y: { z: [false, null, ""] } };
let str = JSON.stringify(obj);
let par = JSON.parse(str);

// JSON 문법은 자바스크립트 문법의 부분 집합이며 자바스크립트 값 전체를 표현하지는 못합니다.
// 객체, 배열, 문자열, 유한한 숫자, true, false, null은 모두 지원되고 직렬화와 복원이 가능합니다.
// NaN, Infinity, -Infinity는 null로 직렬화됩니다.
