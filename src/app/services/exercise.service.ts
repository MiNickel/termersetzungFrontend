import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, Task, CheckStep, Exam, StudentExercise } from '../app.model';
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
        this.taskState.next({ key, value });
    }

    changeTask(task: Task) {
        this.task.next(task);
    }

    getAllExercisesForExaminer(examinerId: number) {
        return this.http.get<Exercise[]>(this.url + '/examiner/' + examinerId);
    }

    getAllExercisesForStudent(studentId: number) {
        return this.http.get<StudentExercise[]>(this.url + '/student/' + studentId);
    }

    getAllExercises() {
        return this.http.get<Exercise[]>(this.url + '/student');
    }

    getExerciseById(id: number) {
        return this.http.get<Exercise>(this.url + '/' + id);
    }

    getStudentExerciseByExerciseIdAndStudentId(exerciseId: number, studentId: number) {
        return this.http.get<StudentExercise>(this.url + '/' + exerciseId + '/' + studentId);
    }

    uploadExercise(exercise: Exercise) {
        return this.http.post<Exercise>(this.url,
            exercise
        );
    }

    uploadStudentExercise(studentExercise: StudentExercise) {
        return this.http.post<StudentExercise>(this.url + '/studentexercise',
            studentExercise
        );
    }

    checkTask(checkStepList: CheckStep[]) {
        return this.http.post<CheckStep[]>(this.url + '/check',
            checkStepList
        );
    }
}
