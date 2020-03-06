import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExamService {

    public taskState = new BehaviorSubject<any>('');

    public currentTaskState = this.taskState.asObservable();

    constructor() { }

    changetaskState(key: string, value: string) {
        this.taskState.next({key, value});
    }

}
