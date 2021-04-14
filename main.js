let running = 0;
let buffer = "0";
let previous_operator = null;
const screen = document.querySelector('.screen');

document.querySelector(".calc-buttons").addEventListener("click", function(event){
    console.log("here");
    buttonClick(event.target.innerText);    
});

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    renderer();
}

function handleNumber(value){
    if(buffer ==="0"){
        buffer = value;
    }else{
        buffer+=value;
    }

}


function handleSymbol(value){
    switch(value){
        case 'C':
            buffer = "0";
            running = 0;
            break;
        case '=':
            if(previous_operator===null){
                return;
            }
            flushOperation(parseInt(buffer));
            previous_operator = null;
            buffer = ""+running;
            running = 0
            break;
        case "←":
            if(buffer.length===1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        case ".":
            buffer=buffer+".";
            break;
        default:
            handleMath(value);
            break;   
    }
}

function handleMath(value){
    const intBuffer = parseFloat(buffer);
    if(running === 0){
        running = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previous_operator = value;
    buffer = "0";
}

function renderer(){
    screen.innerText = buffer;
}

function flushOperation(intBuffer){
    if(previous_operator==="+"){
        running+=intBuffer;
    }else if(previous_operator==="−"){
        running-=intBuffer;
    }else if(previous_operator==="×"){
        running*=intBuffer;
    }else{
        running/=intBuffer;
    }

}

