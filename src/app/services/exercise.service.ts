import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../app.model';

@Injectable({ providedIn: 'root' })
export class ExerciseService {

    private url = 'http://localhost:11090/exercise';

    constructor(private http: HttpClient) { }

    getAllExercises() {
        return this.http.get<Exercise[]>(this.url);
    }

    uploadExercise(exercise: Exercise) {
        return this.http.post<Exercise>(this.url,
            exercise
        );
    }
}
