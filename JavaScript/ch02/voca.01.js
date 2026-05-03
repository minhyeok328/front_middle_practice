let drink = prompt("가격 조회를 원하는 음료수를 입력하세요. (콜라, 사이다, 커피 중 선택하세요.)", "");

switch (drink) {
    case "콜라":
        console.log("1,000원 입니다.");
        break;
    case "사이다":
        console.log("2,000원 입니다.");
        break;
    case "커피":
        console.log("3,000원 입니다.");
        break;
    default:
        console.log("잘못된 단어 입력");
        break;
}
