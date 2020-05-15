import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise, Task, CheckStep, StudentExercise } from 'src/app/app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  public studentExercise: StudentExercise;
  public activeInputElement: any;
  public steps: string[] = [];
  public newTerm = '';
  public operations: string[] = [];
  public editStepBool: boolean[] = [false];
  public conversions: boolean[] = [];
  public task: Task;

  public editStepMap = new Map<number, string>();

  public form: FormGroup;

  @ViewChild(ExerciseListComponent, { static: false })
  private exerciseList: ExerciseListComponent;

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService,
    private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const studentId: number = this.getStudentId();
      const exerciseId: number = +params.id;
      this.exerciseService.getStudentExerciseByExerciseIdAndStudentId(exerciseId, studentId)
        .subscribe((studentExercise: StudentExercise) => {
          console.log(studentExercise.tasks);
          this.studentExercise = studentExercise;
          console.log(this.exerciseList.taskList);
          this.exerciseList.taskList = studentExercise.tasks;

        });
    });
    this.exerciseService.currentTask.subscribe((task: any) => {
      if (task !== '') {
        console.log(this.task);
        this.steps = [];
        this.operations = [];
        this.task = task;
        for (const step of task.steps) {
          this.steps.push('$' + step.step + '$');
          this.operations.push(step.conversion);
        }
      }
    });
    this.createForm();
    this.onFormChange();
  }

  createForm() {
    this.form = this.fb.group({
      taskState: ['', Validators.required]
    });
  }

  onFormChange() {
    this.form.get('taskState').valueChanges.subscribe(val => {
      this.exerciseService.changeTaskState(this.task.name, val);
      console.log(typeof (val));
    });
  }

  onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  setSymbol(symbol: string) {
    this.activeInputElement.value += symbol;
  }

  saveCurrentTask() {
  }

  check() {
    const me = this;
    const checkStepList: CheckStep[] = [];
    for (let i = 0; i < this.steps.length - 1; i++) {
      const startEquation: string = this.steps[i].replace(/\$/g, '');
      const targetEquation: string = this.steps[i + 1].replace(/\$/g, '');
      checkStepList.push(new CheckStep(startEquation, this.operations[i], targetEquation, null));
    }
    this.exerciseService.checkTask(checkStepList).subscribe(correctedSteps => {
      for (const [index, step] of correctedSteps.entries()) {
        me.conversions[index] = step.correct;
      }
      console.log(me.conversions);
      console.log(correctedSteps);
    });
  }

  editStep(index: number, step: string) {
    console.log(index);
    this.editStepBool[index] = this.editStepBool[index] !== true;
    if (this.editStepBool[index] === true) {
      this.editStepMap.set(index, this.steps[index].replace(/\$/g, ''));
    } else {
      this.steps[index] = '$' + this.editStepMap.get(index) + '$';
    }
    console.log(this.steps);
  }

  nextStep() {
    this.steps.push('$' + this.newTerm + '$');
    this.newTerm = '';
    this.editStepBool.push(false);
    console.log(this.steps.length);
    console.log(this.operations.length);
  }

  finished() {
    let result = this.steps[this.steps.length - 1].replace('$', '');
    result = result.replace('$', '');
    console.log(result);
    console.log(this.task.steps[this.task.steps.length - 1].step);
    if (result === this.task.steps[this.task.steps.length - 1].step) {
      console.log('richtig');
    }
  }

  save() {

  }

  private getStudentId(): number {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const studentId: number = jsonObject.studentId;
    return studentId;
  }

}
