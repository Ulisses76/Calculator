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

function popDisplay(string) {
  const display=document.querySelector("div.display");
  if (string.length>14) {
    display.textContent="Too Large!";
    memory.textContent="";
    typed.textContent="";
  } else {
  display.textContent=string;}
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
    popDisplay("ERROR!!");
    memory.textContent="";
    typed.textContent="";
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

function pointString () {
let string=memory.textContent;
let stringArray=string.split('.');
if (stringArray[0].length>14) {
  string=stringArray[0];
  return;
}
let mountString=stringArray[0]+"."+stringArray[1];
if (mountString.length>14) {
  mountString=parseFloat(mountString).toFixed(13-stringArray[0].length);
}
mountString=mountString.replaceAll("0"," ").trimEnd();
memory.textContent=mountString;
}

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
  if (memory.textContent.includes(".")) pointString();
}

function equal() { 
  if (!memory.textContent || !operator.textContent || !typed.textContent) return;
  computate();
  if (!memory.textContent) { return};  
  popDisplay(memory.textContent);
  operator.textContent="";
  typed.textContent="";
  return;
}

function typing(type,opera) {
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
      if (typed.textContent=="-") { return};
      if (type=="-" && !typed.textContent) {
        typed.textContent="-";
        popDisplay('-');
        return;
      }
      if (memory.textContent && typed.textContent) {
        computate();
        if(!memory.textContent) {
          operator.textContent="";
          return;
        }
        popDisplay(memory.textContent);
        typed.textContent="";
        operator.textContent=opera;
        return;
      }      
      if (memory.textContent && !typed.textContent) {
        operator.textContent=opera;
        return;
      }
      memory.textContent=typed.textContent;
      typed.textContent="";
      operator.textContent=opera;
    }
}

const buttons=document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click',() => {
    typing(button.textContent,button.className);  
})
});

const keypress=window.addEventListener('keydown',(key) => {
  let type,opera;
  if (key.key>="0" && key.key<="9" || key.key===".") type=key.key;
  if (key.key ==="-" ) {
    type=key.key;
    opera="subtract";
  }
  if (key.key==="+") {
    type=key.key;
    opera="add"; 
  }
  if (key.key==="/") {
    type=key.key;
    opera="divide"
  }
  if (key.key==="*") {
    type="x";
    opera="multiply";
  }
  if (key.key==="Delete") type="clear";
  if (key.key==="Backspace") type="←";
  if (key.key==="=") type="=";
  if (!type && !opera) return;
  typing(type,opera);

})