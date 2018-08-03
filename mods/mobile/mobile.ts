import {PirMotionDetector} from "../pir/PirMotionDetector";
import {StepperMotor} from "../stepper_motor/StepperMotor";

const pirmd = new PirMotionDetector();
const motor = new StepperMotor(pirmd);

pirmd.start();
