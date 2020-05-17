import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise, Task, CheckStep, StudentExercise, Step } from 'src/app/app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';
import { MathJaxDirective } from 'ngx-mathjax';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  public studentExercise: StudentExercise;
  public activeInputElement: any;
  public newTerm = '';
  public editStepBool: boolean[] = [false];
  public conversions: boolean[] = [];
  public task: Task;

  public editStepMap = new Map<number, string>();
  public editConversionMap = new Map<number, string>();

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
          this.task = undefined;
          this.studentExercise = studentExercise;
          this.exerciseList.taskList = studentExercise.tasks;
        });
    });
    this.exerciseService.currentTask.subscribe((task: any) => {
      console.log('currentTask');
      if (this.task !== undefined) {
        this.saveCurrentTask();
      }
      if (task !== '') {
        this.task = task;
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
    });
  }

  onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  setSymbol(symbol: string) {
    this.activeInputElement.value += symbol;
  }

  saveCurrentTask() {
    const index: number = this.exerciseList.taskList.findIndex(task => task.name === this.task.name);
    this.exerciseList.taskList[index] = this.task;
  }

  check() {
    const me = this;
    const checkStepList: CheckStep[] = [];
    for (let i = 0; i < this.task.steps.length - 1; i++) {
      const startEquation: string = this.task.steps[i].step;
      const targetEquation: string = this.task.steps[i + 1].step;
      checkStepList.push(new CheckStep(startEquation, this.task.steps[i].conversion, targetEquation, null));
    }
    this.exerciseService.checkTask(checkStepList).subscribe(correctedSteps => {
      for (const [index, step] of correctedSteps.entries()) {
        me.conversions[index] = step.correct;
      }
      console.log(me.conversions);
    });
  }

  editStep(index: number, step: string) {
    this.editStepBool[index] = this.editStepBool[index] !== true;
    /*if (this.editStepBool[index] === true) {
      this.editStepMap.set(index, this.task.steps[index].step);
      this.editConversionMap.set(index, this.task.steps[index].conversion);
    } else {
      this.task.steps[index].step = this.editStepMap.get(index);
      this.task.steps[index].conversion = this.editConversionMap.get(index);
    }*/
  }

  nextStep() {
    this.task.steps.push(new Step(-1, this.newTerm, 0, ''));
    this.newTerm = '';
    this.editStepBool.push(false);
  }

  getBackgroundColor(index: number) {
    const bool = this.conversions[index];
    if (bool === true) {
      return '#d4edda';
    } else if (bool === false) {
      return '#f8d7da';
    } else {
      return '#fff';
    }
  }

  /* finished() {
    let result = this.steps[this.steps.length - 1].replace('$', '');
    result = result.replace('$', '');
    console.log(result);
    console.log(this.task.steps[this.task.steps.length - 1].step);
    if (result === this.task.steps[this.task.steps.length - 1].step) {
      console.log('richtig');
    }
  } */

  save() {
    this.saveCurrentTask();
    this.studentExercise.tasks = this.exerciseList.taskList;
    this.studentExercise.studentId = this.getStudentId();
    this.exerciseService.uploadStudentExercise(this.studentExercise).subscribe(result => {

    });
  }

  private getStudentId(): number {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const studentId: number = jsonObject.studentId;
    return studentId;
  }

}
