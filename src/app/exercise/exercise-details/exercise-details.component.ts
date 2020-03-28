import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExerciseService} from 'src/app/services/exercise.service';
import {Exercise, Task, CheckStep} from 'src/app/app.model';
import {MainService} from 'src/app/main/main.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  public id: number;
  public exercise: Exercise;
  public activeInputElement: any;
  public steps: string[] = [];
  public newTerm = '';
  public operations: string[] = [];
  public taskObject: Task;
  public editStepBool: boolean[] = [false];

  public form: FormGroup;

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private mainService: MainService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.exerciseService.getExerciseById(this.id).subscribe(exercise => {
        this.exercise = exercise;
      });
    });
    this.exerciseService.currentTask.subscribe((task) => {
      if (this.taskObject !== undefined) {
        this.saveCurrentTask();
      }
      if (task !== '') {
        this.taskObject = task;
        let taskFromLocalStorage: any = localStorage.getItem(task.name);
        if (taskFromLocalStorage === null) {
          this.steps = [];
          this.operations = [];
          this.steps[0] = '$' + this.taskObject.steps[0].step + '$';
        } else {
          taskFromLocalStorage = JSON.parse(taskFromLocalStorage);
          this.steps = taskFromLocalStorage.steps;
          this.operations = taskFromLocalStorage.operations;
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
      this.exerciseService.changeTaskState(this.taskObject.name, val);
      console.log(typeof (val));
    });
  }

  saveCurrentTask() {
    const taskData = {
      task: this.taskObject.steps[0].step,
      steps: this.steps,
      operations: this.operations
    };
    localStorage.setItem(this.taskObject.steps[0].step, JSON.stringify(taskData));
  }

  onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  setSymbol(symbol: string) {
    this.activeInputElement.value = symbol;
  }

  check() {
    const checkStepList: CheckStep[] = [];
    for (let i = 0; i < this.steps.length - 1; i++) {
      const startEquation: string = this.steps[i].replace(/\$/g, '');
      const targetEquation: string = this.steps[i + 1].replace(/\$/g, '');
      checkStepList.push(new CheckStep(startEquation, this.operations[i], targetEquation, null));
    }
    this.exerciseService.checkTask(checkStepList).subscribe(result => {
      console.log(result);
    });
  }

  editStep(index: number) {
    this.editStepBool[index] = this.editStepBool[index] !== true;
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
    console.log(this.taskObject.steps[this.taskObject.steps.length - 1].step);
    if (result === this.taskObject.steps[this.taskObject.steps.length - 1].step) {
      console.log('richtig');
    }
  }

}
