import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, Task, CheckStep, Exam, StudentExercise, Student } from '../app.model';
import { BehaviorSubject } from 'rxjs';
import { setHeaders } from '../shared/header';

@Injectable({ providedIn: 'root' })
export class StudentService {

    private url = 'http://localhost:11090/student/';

    constructor(private http: HttpClient) {

    }

    getStudentByIds(ids: string) {
        return this.http.get<Student[]>(this.url + '?studentIds=' + ids,
            {
                headers: setHeaders()
            });
    }

    getStudentById(id: number) {
        return this.http.get<Student>(this.url + id,
            {
                headers: setHeaders()
            });
    }
}
