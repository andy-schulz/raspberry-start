import {Gpio} from 'onoff'; //include onoff to interact with the GPIO

// 6, 13, 19, 26
const sm1: Gpio = new Gpio(6, 'out', 'both');
const sm2: Gpio = new Gpio(13, 'out', 'both');
const sm3: Gpio = new Gpio(19, 'out', 'both');
const sm4: Gpio = new Gpio(26, 'out', 'both');


// Define simple sequence
const StepCount1 = 4;
const Seq1  = [];
Seq1.push([1,0,0,0]);
Seq1.push([1,1,0,0]);
Seq1.push([0,1,0,0]);
Seq1.push([0,1,1,0]);
Seq1.push([0,0,1,0]);
Seq1.push([0,0,1,1]);
Seq1.push([0,0,0,1]);
Seq1.push([1,0,0,1]);


let counter = 0;

async function setState() {


    while (counter < 100000 ) {
        for(let step of Seq1) {
            sm1.writeSync(step[0]);
            sm2.writeSync(step[1]);
            sm3.writeSync(step[2]);
            sm4.writeSync(step[3]);

            console.log(`Step ${step} set.`);
            await sleep(1);
        }
        counter++;
    }

    function sleep(ms){
        return new Promise(resolve=>{
            setTimeout(resolve,ms)
        })
    }

}





setState().then(() => {
    console.log(`ENDE`);
});





