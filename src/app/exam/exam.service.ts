import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TaskDto} from '../app.model';

@Injectable({providedIn: 'root'})
export class ExamService {

  public taskState = new BehaviorSubject<any>('');

  public currentTaskState = this.taskState.asObservable();

  constructor() {
  }

  changetaskState(key: string, value: string) {
    this.taskState.next({key, value});
  }



}
