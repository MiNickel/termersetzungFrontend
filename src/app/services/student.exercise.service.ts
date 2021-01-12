import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentExercise } from '../app.model';
import { setHeaders } from '../shared/header';

@Injectable({ providedIn: 'root' })
export class StudentExerciseService {

    private url = 'http://localhost:11090/studentexercise/';

    constructor(private http: HttpClient) { }

    getAllExercisesForStudent(studentId: number) {
        return this.http.get<StudentExercise[]>(this.url + studentId,
            {
                headers: setHeaders()
            });
    }

    getStudentExerciseByExerciseIdAndStudentId(exerciseId: number, studentId: number) {
        return this.http.get<StudentExercise>(this.url + exerciseId + '/' + studentId,
            {
                headers: setHeaders()
            });
    }

    uploadStudentExercise(studentExercise: StudentExercise) {
        return this.http.post<StudentExercise>(this.url,
            studentExercise,
            {
                headers: setHeaders()
            }
        );
    }
}
