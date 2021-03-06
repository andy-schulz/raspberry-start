var gpio = require("onoff").Gpio;

//use GPIO pin numbers
var stepPins = [6, 13, 19, 26];
var pinNumber = stepPins.length;
var pins = [];
var stepCounter = 0;
var timeout = 0.01;
var stepCount = 8;

Seq = [];
Seq[0] = [1,0,0,0];
Seq[1] = [1,1,0,0];
Seq[2] = [0,1,0,0];
Seq[3] = [0,1,1,0];
Seq[4] = [0,0,1,0];
Seq[5] = [0,0,1,1];
Seq[6] = [0,0,0,1];
Seq[7] = [1,0,0,1];

for(var i=0; i<pinNumber; i++){
    pins[i] = new gpio(stepPins[i], 'out');
}

let counter = 0;

var step = function(){
    for(var pin = 0; pin<4; pin++){
        if(Seq[stepCounter][pin] != 0){
            pins[pin].writeSync(1);
        }else{
            pins[pin].writeSync(0);
        }
    }
    stepCounter += 1
    if (stepCounter==stepCount){
        stepCounter = 0;
    }
    if (stepCounter<0){
        stepCounter = stepCount;
    }
    counter++;
    console.log(`DONE ${counter}`);

    setTimeout( function(){step()}, timeout );
}

step();