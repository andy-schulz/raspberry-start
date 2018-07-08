import {Gpio} from 'onoff'; //include onoff to interact with the GPIO

const pir: Gpio = new Gpio(23, 'in', 'both'); //use GPIO 23 as input, and 'both' button presses, and releases should be handled

pir.watch( (err, value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
        console.error(`There was an error: ${err}`); //output error message to console
        return;
    }
    console.log(`Value: ${value}`)
});


process.on('SIGINT', function () {
    pir.unexport();
});