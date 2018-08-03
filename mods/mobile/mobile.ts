import {PirMotionDetector} from "../pir/PirMotionDetector";
import {StepperMotor} from "../stepper_motor/StepperMotor";
import { configure } from 'log4js';
configure('../../config/log4js.json');


const pirmd = new PirMotionDetector();
const motor = new StepperMotor(pirmd);

pirmd.start();
