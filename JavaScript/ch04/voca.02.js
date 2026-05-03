// 5. 배열 순회
let letters = [..."Hello World"];
let string = "";

for (let letter of letters) {
    string += letter;
}
console.log(string); // => "Hello World"

let everyother = "";
for (let [index, letter] of letters.entries()) {
    if (index % 2 === 0) everyother += letter; // 짝수 번째 인덱스의 글자
}
console.log(everyother); // HloWrd

// forEach()도 배열을 순회하는 좋은 방법 중 하나입니다.
// 이 메서드는 for 루프의 변형이 아니라 배열 순회를 함수형으로 바꾼 배열 메서드입니다.
// forEach()는 전달받은 함수를 각 배열 요소에서 호출합니다.

let uppercase = "";
letters.forEach((letter, index) => {
    // 화살표 함수 문법을 썼습니다.
    uppercase += letter.toUpperCase();
    console.log(letter, index);
});
console.log(uppercase); // => "HELLO WORLD"

// forEach()는 배열을 순서대로 순회하며 배열 인덱스를 함수의 두 번째 인자로 전달합니다.
// for-of 루프와 달리 forEach()는 성긴 배열을 인식하고, 존재하지 않는 요소에 대해서는 함수를 호출하지 않습니다.

let test1 = [1, 2, 3];
delete test1[1];

console.log("delete 메서드가 동작한 직후, test: ", test1); // [1, 비어있음, 3]
console.log("test1 배열의 길이: ", test1.length); // 3
test1.forEach((item) => console.log(item));

let test2 = [1, 2, 3];
test2[1] = undefined;

console.log("delete 메서드가 동작한 직후, test: ", test2); // [1, undefined, 3]
console.log("test2 배열의 길이: ", test2.length); // 3
test2.forEach((item) => console.log(item));

// ====================================================================================================

// 6. 배열 메서드

// 지금까지는 배열과 관련된 기본적인 자바스크립트 문법에 집중을 했다면,
// 이제부터는 가장 자주 사용되는 Array 클래스에 정의된 메서드를 공부해보도록 하겠습니다.

// - 배열 요소를 순회하는 이터레이터 메서드, 이들은 일반적으로 각 요소에 대해 함수를 호출합니다.
// - 배열의 앞이나 뒤에 요소를 추가하거나 제거하는 스택, 큐 메서드
// - 큰 배열을 추출, 삭제, 삽입, 충당(fill), 복사하는 하위 배열 메서드
// - 배열을 검색하고 정렬하는 메서드

// 6.1 배열 이터레이터 메서드
// 이터레이터 메서드는 배열 요소를 순서대로 함수에 전달하는 방식으로 동작하며 배열 요소를 순회, 변환, 필터, 체크, 축소(reduce)할 수 있습니다.
// 이터레이터 메서드는 모두 첫 번째 인자로 함수를 받으며, 각 배열 요소(또는 일부 요소)에 대해 그 함수를 한 번씩 호출합니다.
// 성긴 배열이라면, 존재하지 않는 요소에 대해서는 함수를 호출하지 않습니다.
// 대부분의 경우 이터레이터 메서드는 배열 요소의 값, 인덱스, 배열 자체 세 가지 인자를 받습니다.

// 6.1.1 forEach()
// forEach() 메서드는 배열을 순회하며 각 요소에서 함수를 호출합니다.

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;

// 배열의 요소의 합을 계산합니다.
nums.forEach((num) => {
    sum += num;
});
console.log(sum); // 55

// 배열의 요소를 각각 증가시킵니다.
nums.forEach((num, idx) => (nums[idx] = num + 1));
console.log(nums); // => [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// forEach()에서 모든 요소를 함수에 전달하기 전에 반복을 멈추는 방법은 없습니다.
// 즉, 일반적인 for 루프에 사용되는 break 문과 동등한 수단이 없습니다.

// 6.1.2 map()
// map() 메서드는 각 배열 요소를 함수에 전달해 호출하며, 그 함수가 반환한 값으로 이루어진 배열을 반환합니다.
let nums2 = [1, 2, 3];
nums2.map((num) => num * num); // => [1, 4, 9]; 함수는 num를 받아 num*num를 반환합니다.

// map()에 전달하는 함수는 forEach()에 전달하는 함수와 같은 방법으로 호출됩니다. 하지만 map() 메서드에 전달하는 함수는 값을 반환해야 합니다.
// map()은 새 배열을 반환하며 기존 배열은 수정하지 않습니다. 성긴 배열이라면 존재하지 않는 요소에 대해서는 함수를 호출하지 않지만,
// 반환된 배열 역시 같은 위치에 갭이 있으며 길이 또한 같습니다.

// 6.1.3 filter()
// filter() 메서드는 기존 배열의 일부만 포함하는 부분 집합을 반환합니다.
// 전달하는 함수를 기준으로 하며 이 함수는 true 또는 false를 반환합니다.
// 반환 값이 true이거나 true로 변환될 수 있는 값이면, 해당 요소는 반환되는 배열에 포함됩니다.

let nums3 = [5, 4, 3, 2, 1];
nums3.filter((num) => num < 3); // => 3 미만의 값만 추출
nums3.filter((num, idx) => idx % 2 === 0); // => 인덱스가 짝수인 값만 추출

// filter()는 성긴 배열에서 존재하지 않는 값은 건너뛰며, 반환하는 배열은 항상 빽빽한 배열입니다.

// 6.1.4 find()와 findIndex()
// find()와 findIndex() 메서드는 판별 함수에서 true 같은 값을 반환하는 요소를 찾아 배열을 순회한다는 점은 filter()와 같습니다.
// 하지만 filter()와 달리 이들 메서드는 기준을 만족하는 첫 번째 요소를 찾는 즉시 순회를 멈춥니다.
// 만족하는 요소를 찾으면 find()는 그 요소를, findIndex()는 그 요소의 인덱스를 반환합니다.
// 만족하는 요소를 찾지 못하면, find()는 undefined를, findIndex()는 -1을 반환합니다.

let nums4 = [1, 2, 3, 4, 5];
nums4.findIndex((x) => x === 3); // => 2; 값 3은 인덱스 2에 있습니다.
nums4.findIndex((x) => x < 0); // => -1; 배열에는 음수가 없습니다.
nums4.find((x) => x % 5 === 0); // => 5; 5의 배수입니다.
nums4.find((x) => x % 7 === 0); // => undefined; 이 배열에는 7의 배수가 없습니다.

// 6.1.5 every()와 some()
// every()와 some() 메서드는 배열 요소에 판별 함수를 적용하고 결과에 따라 true 또는 false를 반환합니다.
// every() 메서드는 판별 함수가 배열의 모든 요소에 대해 true를 반환할 때만 true를 반환합니다.

let nums5 = [1, 2, 3, 4, 5];
nums5.every((x) => x < 10); // => true: 모든 값이 10 미만입니다.
nums5.every((x) => x % 2 === 0); // => false: 짝수가 아닌 값이 있습니다.

// some() 메서드는 배열 요소 중 판별 함수가 true를 반환하는 것이 하나라도 있으면 true를 반환하며, 요소 전체가 false를 반환할 때만 false를 반환합니다.
let nums6 = [1, 2, 3, 4, 5];
nums6.some((x) => x % 2 === 0); // => true; nums6에는 짝수가 있습니다.
nums6.some(isNaN); // => false; nums6에 NaN은 없습니다.

// every()와 some()은 자신이 어떤 값을 반환할지 확실해지는 순간 순회를 멈춥니다.
// some()은 판별 함수가 true를 반환하는 즉시 true를 반환하므로 (마지막 요소를 제외한) 모든 요소가 false를 반환할 때만 배열 전체를 순회합니다.
// every()는 반대로 판별 함수가 false를 반환하는 즉시 false를 반환하므로 (마지막 요소를 제외한) 모든 요소가 true를 반환할 때만 배열 전체를 순회합니다.
