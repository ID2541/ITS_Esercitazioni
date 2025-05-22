let nome = "Mario";
const age = 31;

console.log(nome);
console.log(age);
console.log(nome + " ha " + age + " anni");
console.log(`${nome} ha ${age} anni`); // Template string

function pres(name,age) {
    return `Mi chiamo ${name} e ho ${age} anni`;
}

console.log(pres(nome, age));

function getOdds(array){
    let odds = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 !== 0) {
            odds.push(array[i]);
        }
    }
    return odds;
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(getOdds(numbers));