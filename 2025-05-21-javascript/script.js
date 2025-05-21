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

