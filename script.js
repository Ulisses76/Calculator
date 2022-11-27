const memo = document.createElement("div");
const type = document.createElement('div');
const operat = document.createElement('div');

operat.classList.add('operator')
memo.classList.add("memory");
type.classList.add('typed');

const container=document.querySelector(".container");
container.appendChild(memo);
container.appendChild(type);
container.appendChild(operat);

let memory = document.querySelector('.memory');
let typed = document.querySelector('.typed');
let operator = document.querySelector('.operator');

popDisplay("0");

// coloca o conteudo do resultado na tela //
function popDisplay(string) {
  const display=document.querySelector("div.display");
  display.textContent=string;
  return;
}

function numberEntry(string) {
  let typedWindow = typed.textContent;
  
  if (typedWindow=="0"){
    typedWindow="";
  }
  if (typedWindow.length>=14) {
    return;
  }
  if (string=="." && typedWindow.includes(".")) {
    return;
  }
  typedWindow+=string;
  typed.textContent=typedWindow;
  popDisplay(typedWindow);
  return;
}

function clear() {
  memory.textContent="";
  typed.textContent="";
  operator.textContent="";
  popDisplay("0");
  return;
}

function back() {
  let backed = typed.textContent;
  if (!backed) return;
  backed = backed.slice(0,backed.length-1);
  backed = backed=="" ? "0" : backed;
  typed.textContent=backed;
  popDisplay(backed);
  return;
}

function add(number1,number2) {
  let sum = parseFloat(number1)+parseFloat(number2);
  memory.textContent=sum.toString();
  return;
}
function subtract(number1,number2) {
  let minus =parseFloat(number1)-parseFloat(number2);
  memory.textContent=minus.toString();
  return };
function divide (number1,number2) {
  if (parseFloat(number2)==0) {
    memory.textContent="ERROR!!";
    return;
  }
  let divide=parseFloat(number1)/parseFloat(number2);
  memory.textContent=divide.toString();
    return; 
};
function multiply (number1,number2) {
  let multiply=parseFloat(number1)*parseFloat(number2);
  memory.textContent=multiply.toString();
  return; 
};

function computate() {
 
  if (operator.textContent=="add") {
    add(memory.textContent,typed.textContent);
  }
  if (operator.textContent=="subtract") {
    subtract(memory.textContent,typed.textContent);
  }
  if (operator.textContent=="divide") {
    divide(memory.textContent,typed.textContent);
  }
  if (operator.textContent=="multiply") {
    multiply(memory.textContent,typed.textContent);
  }
}

function equal() {
 
  if (!memory.textContent || !operator.textContent || !typed.textContent) {

    return;
  }
  computate();
  
  if (memory.textContent.includes(".")){
    memory.textContent=parseFloat(memory.textContent).toFixed(2).toString();
  }
  popDisplay(memory.textContent);
  operator.textContent="";
  typed.textContent="";
  return;
}

const buttons=document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click',() => {
    const type=button.textContent;
   
   if ((type>="0" && type <="9")||type==".") {
    if (!operator.textContent) {
      memory.textContent="";
    }
      numberEntry(type);
    }
    if (type=="clear") {
      clear();
    }
    if (type=="←") {
      back();
    }
    if (type=="=") {
      equal();
    }
    if (type=="/" || type=="+" || type=="-" || type=="x") {

      if (memory.textContent && typed.textContent) {
        computate();
        popDisplay(memory.textContent);
        typed.textContent="";
        return;
      }      
      if (memory.textContent && !typed.textContent) {
        operator.textContent=button.className;
        return;
      }
      
      memory.textContent=typed.textContent;
      typed.textContent="";
      operator.textContent=button.className;
    }
    
  })
});




