import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentExam } from '../app.model';
import { setHeaders } from '../shared/header';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentExamService {

    private url = `${environment.url}/studentexam/`;

    constructor(private http: HttpClient) { }

    getExamForStudent(code: string, studentId: number, firstname: string, lastname: string) {
        return this.http.get<StudentExam>(this.url + code + '/' + studentId + '/' + firstname + '/' + lastname,
            {
                headers: setHeaders()
            });
    }

    correctStudentExam(studentExam: StudentExam) {
        return this.http.post(this.url,
            studentExam,
            {
                headers: setHeaders()
            });
    }

    getAllStudentExamsWithExamId(examId: number) {
        return this.http.get<StudentExam[]>(this.url + 'all/' + examId,
            {
                headers: setHeaders()
            });
    }

    getStudentExam(id: number) {
        return this.http.get<StudentExam>(this.url + id,
            {
                headers: setHeaders()
            });
    }

}
