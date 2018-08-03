import {Gpio} from 'onoff';
import {Subject} from "../interfaces/Subject";
import {Observer} from "../interfaces/Observer";
import {getLogger} from "log4js";




export class PirMotionDetector implements Subject{

    private observers: Set<Observer> = new Set();
    private currentMotion: number = 0;
    private logger = getLogger("PIRMotionDetector");

    private pir: Gpio;

    constructor() {
        this.pir = new Gpio(23, 'in', 'both');
    }



    setMotion(motion: number) {
        this.logger.info("Motion detected");
        this.currentMotion = motion;

        this.notify();

    }

    notify() {
        for (let observer of this.observers) {
            observer.update(this.currentMotion);
        }
    }

    register(observer: Observer) {
        this.observers.add(observer);
    }

    remove(observer: Observer) {
        this.observers.delete(observer)
    }

    start() {
        this.pir.watch( (err, value) => {

            if (err) {
                this.logger.error(`There was an error: ${err}`);
                return;
            }
            this.setMotion(value);
            this.logger.debug(`Motion Detected: ${this.currentMotion}`);
        });

        process.on('SIGINT',  () => {
            console.log("Unload PIR.");
            this.pir.unexport();
        });
    }

}








