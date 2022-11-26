const result = document.createElement("div");
const number = document.createElement('div');
const temp = document.createElement('div');
const operator = document.createElement('div');

operator.classList.add('operator')
result.classList.add("result");
number.classList.add('number');
temp.classList.add('temp');

const container=document.querySelector(".container");
container.appendChild(result);
container.appendChild(number);
container.appendChild(temp);
container.appendChild(operator);

popDisplay("0");

// coloca o conteudo do resultado na tela //
function popDisplay(string) {
  const display=document.querySelector("div.display");
  display.textContent=string;
  return;
}

function numberEntry(typed) {
  let typedWindow = document.querySelector("div.temp").textContent;
  if (typedWindow=="0"){
    typedWindow="";
  }
  if (typedWindow.length>=14) {
    return;
  }
  if (typed=="." && typedWindow.includes(".")) {
    return;
  }
  typedWindow+=typed;
  document.querySelector(".temp").textContent=typedWindow;
  popDisplay(typedWindow);
  return;
}

function clear() {
  document.querySelector('.result').textContent="";
  document.querySelector('.number').textContent="";
  document.querySelector('.temp').textContent="";
  document.querySelector('.operator').textContent="";
  popDisplay("0");
  return;
}

function back() {
  let backed = document.querySelector('.temp').textContent;
  if (!backed) return;
  backed = backed.slice(0,backed.length-1);
  backed = backed=="" ? "0" : backed;
  document.querySelector('.temp').textContent=backed;
  popDisplay(backed);
  return;
}

function add(number1,number2) {
  let sum = parseFloat(number1)+parseFloat(number2);
  document.querySelector('.result').textContent=sum.toString();
  return;
}
function subtract(number1,number2) {
  let minus =parseFloat(number1)-parseFloat(number2);
  document.querySelector('.result').textContent=minus.toString();
  return };
function divide (number1,number2) {
  if (parseFloat(number2)==0) {
    document.querySelector('.result').textContent="ERROR!!";
    return;
  }
  let divide=parseFloat(number1)/parseFloat(number2);
  document.querySelector('.result').textContent=divide.toString();
    return; 
};
function multiply (number1,number2) {
  let multiply=parseFloat(number1)*parseFloat(number2);
  document.querySelector('.result').textContent=multiply.toString();
  return; 
};

function computate() {
  let number1=document.querySelector('.number');
  let number2=document.querySelector('.temp');
  let operator=document.querySelector('.operator');

  if (operator.textContent=="add") {
    add(number1.textContent,number2.textContent);
  }
  if (operator.textContent=="subtract") {
    subtract(number1.textContent,number2.textContent);
  }
  if (operator.textContent=="divide") {
    divide(number1.textContent,number2.textContent);
  }
  if (operator.textContent=="multiply") {
    multiply(number1.textContent,number2.textContent);
  }
}

function equal() {
  let number1=document.querySelector('.number');
  let number2=document.querySelector('.temp');
  let operator=document.querySelector('.operator');
  let result=document.querySelector('.result'); 
  if (!number1.textContent || !operator.textContent || !number2.textContent) {

    return;
  }
  computate();
  
  if (result.textContent.includes(".")){
    result.textContent=parseFloat(result.textContent).toFixed(2).toString();
  }
  popDisplay(result.textContent);
  operator.textContent="";
  number1.textContent="";
  number2.textContent="";
  return;
}

function operate() {
  let operator=document.querySelector('.operator');
  let temp=document.querySelector('.temp');
  let number=document.querySelector('.number');
  let result=document.querySelector('.result');
  if (result.textContent){
    number.textContent=result.textContent;
    result.textContent="";
    temp.textContent="";
    return; 
    }
  if (operator.textContent) {
    computate();
    popDisplay(result.textContent);
    number.textContent=result.textContent;
    temp.textContent="";
    return;   
    ;}
  number.textContent=temp.textContent;
  temp.textContent="";
  
}

const buttons=document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click',() => {
    const typed=button.textContent;
   
   if ((typed>="0" && typed <="9")||typed==".") {
      numberEntry(typed);
    }
    if (typed=="clear") {
      clear();
    }
    if (typed=="←") {
      back();
    }
    if (typed=="=") {
      equal();
    }
    if (typed=="/" || typed=="+" || typed=="-" || typed=="x") {    
      operate();
     operator.textContent=button.className;
    }
  })
})



