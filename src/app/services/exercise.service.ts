import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, Task, CheckStep } from '../app.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseService {

    private url = 'http://localhost:11090/exercise';

    public taskState = new BehaviorSubject<any>('');

    public currentTaskState = this.taskState.asObservable();

    public task = new BehaviorSubject<any>('');

    public currentTask = this.task.asObservable();

    constructor(private http: HttpClient) { }

    changeTaskState(key: string, value: string) {
        this.taskState.next({key, value});
    }

    changeTask(task: Task) {
        this.task.next(task);
    }

    getAllExercises() {
        return this.http.get<Exercise[]>(this.url);
    }

    getExerciseById(id: number) {
        return this.http.get<Exercise>(this.url + '/' + id);
    }

    uploadExercise(exercise: Exercise) {
        return this.http.post<Exercise>(this.url,
            exercise
        );
    }

    checkTask(checkStepList: CheckStep[]) {
        return this.http.post<CheckStep[]>(this.url + '/check',
        checkStepList
        );
    }
}
