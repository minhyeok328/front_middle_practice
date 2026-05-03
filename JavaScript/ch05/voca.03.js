// this
// 일반 함수의 this는 호출 위치에서 정의
// 화살표 함수의 this는 자신이 선언된 함수(렉시컬) 범위에서 정의
// 렉시컬: 함수가 동작할수 있는 유효한 범위를 의미

// ✅ 일반 함수의 this는 "호출 위치"에 따라 결정된다.
// ✅ 화살표 함수의 this는 "선언 당시의 외부 스코프(this)"를 따른다.
// 🔍 렉시컬(Lexical): 코드가 선언된 "문법적 위치"를 기준으로 스코프가 정해지는 방식

const user = {
    firstName: "9Diin",
    lastName: "Park",
    age: 50,
    getFullName: function () {
        return `${user.firstName} | ${user.lastName}`;
    },
};
console.log(user.getFullName()); // 9Diin | Park

// getFullName에서 어떻게 user 내부의 프로퍼티에 접근할 수 있을까요?
// 이게 가능한 이유는 자바스크립트의 스코프 체인 덕분입니다.
// 자바스크립트에서 변수나 식별자를 찾을 때, 현재 스코프 -> 바로 바깥 스코프 -> 그 바깥 ... -> 전역 스코프 순서대로 찾아 나갑니다.
// 이 연결 구조가 마치 체인처럼 연결되어 있어서 '스코프 체인'이라고 부릅니다.

// user 객체는 함수 바깥에 선언되어 있어서 함수 안에서도 접근할 수 있는 거예요.
// 즉, 전역 혹은 바깥 블록에 선언된 이름을 함수 내부에서 참조하는 것은 문제 없이 됩니다.

// 그러나 이렇게 작성하는 건 위험할 수 있습니다.
// getFullName: function () {
//     return `${user.firstName} | ${user.lastName}`;
// },

// user 변수가 다른 객체로 바뀌거나, 아예 없어지면 코드가 깨질 수가 있기 때문입니다.

const user2 = user;
user = null;

console.log(user2.getFullName()); // ❌ TypeError 발생

// 그래서 더 안전하고 일반적인 방식은?
// this 키워드를 사용하여 getFullName을 호출한 객체, 즉 user를 가리킵니다.
// 따라서 객체의 자기 자신의 프로퍼티를 참조하는 가장 안전하고 유연한 방법이에요.

const user3 = {
    firstName: "9Diin",
    lastName: "Park",
    age: 50,
    getFullName: function () {
        return `${this.firstName} | ${this.lastName}`;
    },
};
console.log(user3.getFullName()); // 9Diin | Park

function user4() {
    this.firstName = "홍";
    this.lastName = "길동";

    return {
        firstName: "9Diin",
        lastName: "Park",
        age: 32,
        getFullName: () => {
            return `${this.firstName} | ${this.lastName}`;
        },
    };
}

console.log(user4().getFullName()); // 홍 | 길동

// user4() 함수가 호출됩니다.
// 이 함수 안에서 this.firstName = "홍"; 으로 설정되므로,
// this는 user4 함수의 호출 주체를 가리킵니다.

// getFullName은 user4 함수 내부에서 화살표 함수로 정의 되었습니다.
// 그래서 this는 user4 함수의 this를 그대로 가리킵니다.

const timer = {
    title: "TIMER!",
    timeout() {
        console.log(this.title); // TIMER!

        setTimeout(function () {
            console.log(this.title); // undefined
        }, 1000);
        setTimeout(() => {
            console.log(this.title); // TIMER!
        }, 1000);
    },
};
timer.timeout();

// 이 코드는 timer라는 객체를 정의하고, 그 안에 title이라는 프로퍼티와 timeout이라는 메서드를 가지고 있습니다.
// 이 객체의 timeout() 메서드를 실행하면 내부에서 this가 어떻게 작동하는지를 보여주는 세 가지 콘솔 출력이 발생합니다.

// 먼저 timer.timeout()이 호출되면, timeout 함수는 timer 객체의 메서드로 실행되므로 이 시점의 this는 timer 객체를 가리킵니다.
// 따라서 console.log(this.title)은 "TIMER!"를 출력합니다.

// 그 다음 setTimeout 안에 일반 함수(function() {}) 형태로 정의된 콜백이 실행됩니다.
// 이때 이 콜백은 나중에 브라우저의 타이머(Web API)에 의해 호출되는데,
// 일반 함수는 호출될 때의 문맥(context)에 따라 this가 결정됩니다.
// setTimeout은 콜백을 특정 객체의 메서드처럼 호출하지 않기 때문에,
// 해당 콜백의 this는 기본적으로 전역 객체(window)를 가리키며,
// 따라서 console.log(this.title)은 undefined를 출력합니다.

// 마지막으로, 두 번째 setTimeout은 화살표 함수(() => {})를 콜백으로 사용하고 있습니다.
// 화살표 함수는 자신만의 this를 가지지 않고, 선언된 위치의 this를 그대로 상속받습니다.
// 이 화살표 함수는 timeout() 함수 내부에서 정의되었기 때문에, 이 시점의 this—즉 timer 객체—를 그대로 사용합니다.
// 결과적으로 console.log(this.title)은 다시 "TIMER!"를 출력합니다.
