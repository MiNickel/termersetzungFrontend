import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exam, StudentExam, Task} from '../app.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  public taskState = new BehaviorSubject<any>('');

  public currentTaskState = this.taskState.asObservable();

  public task = new BehaviorSubject<any>('');

  public currentTask = this.task.asObservable();

  constructor(private http: HttpClient) {
  }

  private url = 'http://localhost:11090/exam';

  changeTaskState(key: string, value: string) {
    this.taskState.next({key, value});
  }

  changeTask(task: Task) {
    this.task.next(task);
  }

  getExam(code: string) {
    return this.http.get<Exam>(this.url + '?code=' + code);
  }

  getExamForStudent(code: string) {
    return this.http.get<Exam>(this.url + '/student?code=' + code);
  }

  uploadExam(exam: Exam) {
    return this.http.post<Exam>(this.url,
      exam
    );
  }

  getAllExamsForExaminer(examinerId: number) {
    return this.http.get(this.url + '/examiner/' + examinerId);
  }

  getExamById(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  saveExam(exam: Exam) {
    return this.http.post(this.url + '/save',
      exam);
  }

  correctStudentExam(studentExam: StudentExam) {
    return this.http.post(this.url + '/student',
    studentExam);
  }

}
