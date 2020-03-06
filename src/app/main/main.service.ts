import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {

    }

    private url = 'http://localhost:8080/MathParserDev';

    public task = new BehaviorSubject<any>('');

    public currentTask = this.task.asObservable();

    public taskState = new BehaviorSubject<any>({});

    public currentTaskState = this.taskState.asObservable();

    changeTask(task: any) {
        this.task.next(task);
    }

    changeTaskState(taskState: any) {
        this.taskState.next(taskState);
    }

    applyTransformCheck(startEquation: string, rule: string, targetEquation: string) {
        startEquation = startEquation.replace('$', '');
        startEquation = startEquation.replace('$', '');
        return this.http.post<any>(
            this.url + '/equation/apply_transform_check',
            {
                startEquation,
                rule: 'f -> f' + rule,
                targetEquation
            },
            {
                headers: this.headers
            }
        );
    }
}
