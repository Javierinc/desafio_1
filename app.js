/*Array de objetos que contiene diferentes intereses según el riesgo.
Próximamente será JSON con los perfiles CONSERVATIVE, MODERATE y RISKY.
 */
const CONSERVATIVE = [  
    {year: 1, realistic: 0.04, optimistic: 0.09, pessimistic:0.01}, 
    {year: 2, realistic: 0.06, optimistic: 0.1, pessimistic: -0.04}, 
    {year: 3, realistic: 0.1, optimistic: 0.3, pessimistic: -0.06}, 
    {year: 4, realistic: 0.1, optimistic: 0.3, pessimistic:0.07}, 
    {year: 5, realistic: 0.4, optimistic: 0.5, pessimistic:0.12},
    {year: 6, realistic: 0.4, optimistic: 0.6, pessimistic:0.2},
    {year: 7, realistic: 0.5, optimistic: 0.8, pessimistic:0.3},
    {year: 8, realistic: 0.6, optimistic: 0.9, pessimistic:0.4},
    {year: 9, realistic: 0.7, optimistic: 0.9, pessimistic:0.4},
    {year: 10, realistic: 0.8, optimistic: 0.9, pessimistic:0.4},
    {year: 11, realistic: 1, optimistic: 1.2, pessimistic:0.5},
];

/* Función que permite validar el input entragado por el usuario. Más adelante debería
tener expresiones regulares para validar todos las entradas posibles.
*/
function entryValidation(input, maxInput){
    if(isNaN(input)|| input < 1 || input > maxInput) {
        return false;
    }
    return true;
}

// Año en curso, se utiliza para calcular los años de inversión y próximamente graficarlo.
const CURRENT_YEAR = new Date().getFullYear();

let userYearsInvest = (prompt("ingresa la cantidad de años de inversión. De 1 a 10 años, ejemplo: 4"));
let validationYears = entryValidation(userYearsInvest, 10);
// console.log(entryValidation(userYearsInvest, 10));

while(validationYears === false) {
    userYearsInvest = parseInt(prompt('Debes ingresar un año entre 1 y 10.'));
    validationYears = entryValidation(userYearsInvest, 10);
}

let initialUserAmount = parseInt(prompt('Ingresa el monto inicial de inversión. Ejemplo: 400'));

let validationAmount = entryValidation(initialUserAmount);
// console.log(entryValidation(initialUserAmount));

while(validationAmount === false) {
    initialUserAmount = parseInt(prompt('Debes ingresar un monto valido.'));
    validationAmount = entryValidation(initialUserAmount);
}
/* Función que devuelve un array con los años de inversión
será utilizada más adelante para la creación de un gráfico. */
function entryYearsHandler (userYear){
    let investmentYears = userYear + CURRENT_YEAR;
    let years = [];
    for(let i= CURRENT_YEAR; i <= investmentYears; i++){
        years.push(i);
    }
    return years;
}
//Array con los años de inversión del usuario.Iran en el eje X del gráfico que se creará próximamente.
let yearsScneario = entryYearsHandler(userYearsInvest);
// console.log(yearsScneario);

//Escenarios de inversión posibles.
const SCENARIO_REALISTIC = 'realistic';
const SCENARIO_OPTIMISTIC = 'optimistic';
const SCENARIO_PESSIMISTIC = 'pessimistic';

/*Función que entrega un array con las ganancias año por año. Se utilizará en el eje Y del gráfico
que espero crear.*/
function investmentCalculator (user,pronostic) {
    let arr =[initialUserAmount,];
    for(let i= 0; i < user; i++){
        arr.push( (CONSERVATIVE[i][pronostic] * initialUserAmount) + initialUserAmount);
    } 
    return arr;
}

let realisticPrediction = investmentCalculator(userYearsInvest, SCENARIO_REALISTIC);
let optimisticPrediction = investmentCalculator(userYearsInvest, SCENARIO_OPTIMISTIC);
let pessimisticPrediction = investmentCalculator(userYearsInvest, SCENARIO_PESSIMISTIC);

// console.log(realisticPrediction);
// console.log(optimisticPrediction);
// console.log(pessimisticPrediction);


function createProfileInvestment (years, amount, realistic, optimistic, pessimistic){
    this.years = years,
    this.amount = amount,
    this.realistic = realistic,
    this.optimistic = optimistic,
    this.pessimistc = pessimistic
}

let scenarioUser = new createProfileInvestment(userYearsInvest, initialUserAmount, realisticPrediction[realisticPrediction.length-1],
    optimisticPrediction[optimisticPrediction.length-1], pessimisticPrediction[pessimisticPrediction.length-1]);

// console.log(scenarioUser.years, scenarioUser.amount, scenarioUser.realistic, scenarioUser.optimistic, scenarioUser.pessimistc);

//INTERACCIÓN CON EL DOM - DE ESTA SE FORMA SE MOSTRARAN LOS DATOS JUNTO A UN GRÁFICO.
const YEARS_SUBTITLE = document.querySelector('#subtitle');
YEARS_SUBTITLE.textContent = `Según el escenario realista en ${scenarioUser.years} años tendrías`;

const REALISTIC_ID = document.querySelector('#realistic');
REALISTIC_ID.textContent = `$ ${scenarioUser.realistic} CLP`;

const INITIAL_ID = document.querySelector('#initial-investment');
INITIAL_ID.textContent = `$ ${scenarioUser.amount} CLP`;

const OPTIMISTIC_ID = document.querySelector('#optimistic');
OPTIMISTIC_ID.textContent = `$ ${scenarioUser.optimistic} CLP`;

const PESSIMISTIC_ID = document.querySelector('#pessimistic');
PESSIMISTIC_ID.textContent = `$ ${scenarioUser.pessimistc} CLP`;

alert(`Según el escenario realista en ${scenarioUser.years} años tendrías:
➡️$ ${scenarioUser.realistic} CLP
Con una inversión inicial de:
➡️$ ${scenarioUser.amount} CLP`);
alert(`En un escenario optimista podrías tener:
➡️$ ${scenarioUser.optimistic} CLP
En un escenario pesimista podrías tener:
➡️$ ${scenarioUser.pessimistc} CLP`);
