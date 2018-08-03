import {Observer} from "./Observer";

export interface Subject {
    register(observer: Observer): void
    remove(observer: Observer): void
    notify(value: any): void
}