// 콜백(callback)
// 함수는 하나의 데이터로써, 소괄호를 열고 닫지 않으면 하나의 함수 데이터이고
// 소괄호를 열고 닫아야지만, 함수를 실행한다고 배웠습니다.

const a = () => {
    console.log("A");
};
const b = () => {
    console.log("B");
};

// a(b); // b: 콜백, 콜백 함수라고 부릅니다. 함수가 실행될 때, 인수/인자로 들어가는 또 다른 함수를 콜백이라 부릅니다.

const c = (callback) => {
    console.log("C");
    callback();
};
const d = () => {
    console.log("D");
};
c(d);

// ====================================================================================================

const sum = (x, y) => {
    setTimeout(() => {
        return x + y;
    }, 1000);
};

console.log("===== 첫 번째 sum =====");
console.log(sum(10, 20)); // ?
console.log("===== 두 번째 sum =====");
console.log(sum(30, 70)); // ?

const add = (a, b, c) => {
    setTimeout(() => {
        c(a + b);
    }, 1000);
};
add(10, 20, (value) => {
    console.log(value);
});
add(30, 70, (value) => {
    console.log(value);
});

// ====================================================================================================

// 재귀
// 재귀 호출은 개념적으로 함수 내부에서 자기 자신을 다시 호출한다는 것
// 주의사항은 재귀 호출은 무한으로 반복 실행되기 때문에 멈출 수 있는 조건식을 반드시 작성해주어야 한다.

let i = 0;
const e = () => {
    console.log("E");
    i += 1;

    if (i < 5) {
        e();
    }
};
e();

// ====================================================================================================

const userA = {
    name: "A",
    parent: null,
};

const userB = {
    name: "B",
    parent: userA,
};

const userC = {
    name: "C",
    parent: userB,
};

const userD = {
    name: "D",
    parent: userC,
};

const getRootUser = (user) => {
    if (user.parent) {
        return getRootUser(user.parent);
    }
    return user;
};

console.log(getRootUser(userC));
