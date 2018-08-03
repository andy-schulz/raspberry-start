import {Observer} from "../interfaces/Observer";
import {Subject} from "../interfaces/Subject";
import {Gpio} from 'onoff';
import {getLogger} from "log4js"; //include onoff to interact with the GPIO


export class StepperMotor implements Observer {
    private motionState: number = 0;
    private sequence: number[][] = [];
    private logger = getLogger("StepperMotor");

    // used GPIOs 6, 13, 19, 26
    private sm1: Gpio = new Gpio(6, 'out', 'both');
    private sm2: Gpio = new Gpio(13, 'out', 'both');
    private sm3: Gpio = new Gpio(19, 'out', 'both');
    private sm4: Gpio = new Gpio(26, 'out', 'both');

    constructor(subject: Subject) {
        subject.register(this);

        // motor sequence
        this.sequence.push([1,0,0,0]);
        this.sequence.push([1,1,0,0]);
        this.sequence.push([0,1,0,0]);
        this.sequence.push([0,1,1,0]);
        this.sequence.push([0,0,1,0]);
        this.sequence.push([0,0,1,1]);
        this.sequence.push([0,0,0,1]);
        this.sequence.push([1,0,0,1]);

        this.run();
    }

    update(value: number) {
        if (value == 1) {
            this.motionState = 1;
        } else {
            this.motionState = 0;
        }

    }

    async run() {
        this.logger.debug(`trying to run motor`);
        while (this.motionState == 1 ) {
            for(let step of this.sequence) {
                this.sm1.writeSync(step[0]);
                this.sm2.writeSync(step[1]);
                this.sm3.writeSync(step[2]);
                this.sm4.writeSync(step[3]);

                this.logger.trace(`Step ${step} set.`);
                await sleep(1);
            }
        }

        this.timeout();

        function sleep(ms){
            return new Promise(resolve=>{
                setTimeout(resolve,ms)
            })
        }

    }

    timeout() {
        setTimeout(() => {
            this.run()
        },500)
    }
}