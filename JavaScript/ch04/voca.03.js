// 1. reduce() reduceRight()
// reduce()와 reduceRight() 메서드는 제공하는 함수를 사용해 배열 요소를 값 하나로 만듭니다.
// reduce()는 인자를 두 개를 받습니다
// 첫 번째는 "축소" 동작을 행하는 함수입니다. 이 함수가 하는 일은 어떤 방식으로든 값 두 개를 받아서 하나를 반환하는 겁니다.
// 두 번째 인자는 선택 사항이며 함수에 전달할 초깃값입니다.

// reduce()에 사용하는 함수는 forEach()와 map()에 사용하는 함수와는 다릅니다.
// 값, 인덱스, 배열 그 자체는 각각 두 번째, 세 번째, 네 번째 인자로 전달됩니다.
// 첫 번째 인자는 여태까지 행한 "축소" 작업의 결과가 할당됩니다.
// 함수를 처음 호출할 때는 그동안 행한 작업이 없으니 reduce()의 두 번째 인자로 전달한 초깃값을 사용합니다.

let nums = [1, 2, 3, 4, 5];

const res1 = nums.reduce((x, y) => {
    console.log("x:", x);
    console.log("y:", y);
    return x + y;
}, 0);
console.log(res1); // 15

const res2 = nums.reduce((x, y) => x * y, 1);
console.log(res2); // 120

const res3 = nums.reduce((x, y) => (x > y ? x : y));
console.log(res3); // 5 => 해당 배열에서 가장 큰 값을 조회

// reduceRight()는 reduce()와 마찬가지지만 오른쪽에서 왼쪽으로 진행한다는 점이 다릅니다.
const letters = ["a", "b", "c", "d"];
const res4 = letters.reduceRight((acc, current) => acc + current);
console.log(res4); // "dcba"

let a = [2, 3];
const res5 = a.reduceRight((acc, val) => Math.pow(val, acc));
console.log(res5); // 8

// ====================================================================================================

// 2. flat() flatMap()을 사용한 배열 평탄화
// flat() 메서드는 기존 배열과 같은 요소로 이루어진 '평탄한 새 배열' 즉, 중첩되지 않은 새 배열을 반환합니다.
// 인자 없이 flat()을 호출하면 한 단계만 평탄화합니다. a라는 원래 배열에 b라는 배열 요소가 있었다면, b는 평탄화되지만
// b 안에서 다시 c 배열이 있었다면 c는 평탄화되지 않습니다. 평탄화 레벨을 늘리려면 flat()에 숫자를 인자로 넘겨주면 됩니다.

let arr1 = [1, [2, 3]];
const res6 = arr1.flat();
console.log(res6); // [1, 2, 3]

let arr2 = [1, [2, [3, 4]]];
const res7 = arr2.flat(1);
const res8 = arr2.flat(2);
const res9 = arr2.flat(3);
const res10 = arr2.flat(4);

console.log("res7", res7);
console.log("res8", res8);
console.log("res9", res9);
console.log("res10", res10);

let phrases = ["hello world", "the definitive guide"];
let words = phrases.flatMap((phrase) => phrase.split(" "));
console.log(words); // ['hello', 'world', 'the', 'definitive', 'guide']

// ====================================================================================================

// 3. concat()으로 배열 병합
// concat() 메서드는 기존 배열의 요소를 포함하고 그 뒤에 concat()의 인자를 포함하는 새 배열을 만들어 반환합니다.
// 인자에 배열이 아니라 요소가 들어가 있다면, 그 요소를 추가합니다. 하지만 concat()은 배열의 배열을 재귀적으로 평탄화하지는 않습니다.
// concat()은 기존 배열을 수정하지 않습니다.

let arr3 = [1, 2, 3];
const res11 = arr3.concat(4, 5);
console.log(res11); // [1, 2, 3, 4, 5]

const res12 = arr3.concat([4, 5], [6, 7]);
console.log(res12); // [1, 2, 3, 4, 5, 6, 7]

const res13 = arr3.concat(4, [5, [6, 7]]);
console.log(res13); // [1, 2, 3, 4, 5, [6, 7]]

console.log(arr3); // [1, 2, 3]

// ====================================================================================================

// 4. 스택과 큐 메서드
// push()와 pop() 메서드는 배열을 스택처럼 다루는 메서드입니다. push() 메서드는 배열의 끝에 하나 이상의 새 요소를 추가하고 새 길이를 반환합니다.
// push()는 concat()과 달리 배열 인자를 평탄화하지 않습니다.
// pop() 메서드는 그 반대입니다. 배열의 마지막 요소를 꺼내서 반환하며 배열 길이를 줄입니다.
// 두 메서드는 모두 기존 배열을 수정합니다.

let stack = []; // stack == [];
stack.push(1, 2); // stack == [1, 2];
stack.pop(); // stack == [1]; 2를 반환
stack.push(3); // stack == [1, 3]
stack.pop(); // stack == [1]; 3을 반환
stack.push([4, 5]); // stack == [1, [4, 5]]
stack.pop(); // stack == [1]; [4, 5]을 반환
stack.pop(); // stack == []; 1을 반환

// unshift()와 shift() 메서드는 push()와 pop()과 거의 비슷하지만 배열의 마지막이 아니라 앞부분에서 이루어진다는 것이 다릅니다.
// unshift()는 배열의 시작 부분에 요소를 추가하고, 기존의 배열 요소를 뒤로 밀고, 새 길이를 반환합니다.
// shift()는 배열의 첫 번째 요소를 꺼내 반환하고, 기존의 배열 요소를 앞으로 당깁니다.

let queue = []; // queue == []
queue.push(1, 2); // queue == [1, 2]
queue.shift(); // queue == [2]; 1을 반환
queue.push(3); // queue == [2, 3]
queue.shift(); // queue == [3]; 2을 반환
queue.shift(); // queue == []; 3을 반환
