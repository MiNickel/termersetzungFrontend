import {Component, OnInit, ViewChild} from '@angular/core';
import {ExaminerTasklistComponent} from '../examiner-tasklist/examiner-tasklist.component';
import {Exam, Examiner, Exercise, Task} from '../../app.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ExerciseService} from '../../services/exercise.service';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-examiner-exercise',
  templateUrl: './examiner-exercise.component.html',
  styleUrls: ['./examiner-exercise.component.scss']
})
export class ExaminerExerciseComponent implements OnInit {

  public form: FormGroup;
  public tasks: Task[] = [];
  public task: Task;
  public created = false;


  @ViewChild(ExaminerTasklistComponent, {static: false})
  private taskList: ExaminerTasklistComponent;

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService,
              private fb: FormBuilder, private taskService: TaskService) {
  }

  ngOnInit() {
    const exerciseId = this.route.snapshot.params.id;
    this.exerciseService.getExerciseById(exerciseId).subscribe((exercise: Exercise) => {
      this.createForm(exercise);
      this.created = true;
      this.taskList.taskList = exercise.tasks;
    });
    this.taskService.currentTask.subscribe((task: any) => {
      if (task !== '') {
        this.task = task;
      }
    });
  }

  private createForm(exercise: Exercise) {
    this.form = this.fb.group({
      id: [{value: exercise.id, disabled: true}, Validators.required],
      name: [exercise.name, Validators.required],
      examiner: new FormGroup({
        firstname: new FormControl(exercise.examiner.firstname),
        lastname: new FormControl(exercise.examiner.lastname)
      }),
      category: [exercise.category, Validators.required]
    });
  }

  private formToModel() {
    const formValues = this.form.controls;
    return new Exercise(
      formValues.id.value,
      formValues.name.value,
      new Examiner(-1, formValues.examiner.get('firstname').value, formValues.examiner.get('lastname').value),
      formValues.category.value,
      this.tasks
    );
  }

  public saveTask(task: Task) {
    const taskIndex = this.tasks.findIndex(t => t.name === task.name);
    if (taskIndex === -1) {
      this.tasks.push(task);
      this.taskList.taskList.push(task);
    } else {
      this.tasks[taskIndex] = task;
      this.taskList.taskList[taskIndex] = task;
    }
  }

  public upload(event: any) {
    const exercise: Exercise = this.formToModel();
    this.exerciseService.uploadExercise(exercise).subscribe(result => {
    });
  }

}
