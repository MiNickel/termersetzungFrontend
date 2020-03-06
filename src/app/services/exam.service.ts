import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../app.model';

@Injectable({
    providedIn: 'root'
})
export class ExamService {

    constructor(private http: HttpClient) { }

    private url = 'http://localhost:11090/exam';

    getExam(code: string) {
        return this.http.get<Exam>(this.url + '?code=' + code);
    }

    uploadExam(exam: Exam) {
        return this.http.post<Exam>(this.url,
            exam
        );
    }

}
