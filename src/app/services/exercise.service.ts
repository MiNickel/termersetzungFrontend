import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, Task, CheckStep, Exam, StudentExercise } from '../app.model';
import { BehaviorSubject } from 'rxjs';
import { setHeaders } from '../shared/header';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ExerciseService {

    private url = `${environment.url}/exercise`;

    public taskState = new BehaviorSubject<any>('');

    public currentTaskState = this.taskState.asObservable();

    public task = new BehaviorSubject<any>('');

    public currentTask = this.task.asObservable();

    constructor(private http: HttpClient) { }

    changeTaskState(key: string, value: string) {
        this.taskState.next({ key, value });
    }

    changeTask(task: Task) {
        this.task.next(task);
    }

    getAllExercisesForExaminer(examinerId: number) {
        return this.http.get<Exercise[]>(this.url + '/examiner/' + examinerId,
            {
                headers: setHeaders()
            });
    }

    getAllExercises() {
        return this.http.get<Exercise[]>(this.url + '/student',
            {
                headers: setHeaders()
            });
    }

    getExerciseByIdForExaminer(id: number) {
        return this.http.get<Exercise>(this.url + '/' + id,
            {
                headers: setHeaders()
            });
    }

    getExerciseByIdForStudent(id: number) {
        return this.http.get<Exercise>(this.url + '/student/' + id,
            {
                headers: setHeaders()
            });
    }

    uploadExercise(exercise: Exercise) {
        return this.http.post<Exercise>(this.url,
            exercise,
            {
                headers: setHeaders()
            }
        );
    }

    checkTask(checkStepList: CheckStep[]) {
        return this.http.post<CheckStep[]>(this.url + '/check',
            checkStepList,
            {
                headers: setHeaders()
            }
        );
    }
}
