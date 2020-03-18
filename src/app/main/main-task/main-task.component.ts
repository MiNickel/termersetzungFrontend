import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { MainService } from '../main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/app.model';
import { ExamService } from 'src/app/exam/exam.service';

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css']
})
export class MainTaskComponent implements OnInit {

  public taskObject: Task;

  public newTerm = '';
  public task = '';
  public solution = '';

  public test = '';

  public map: Map<number, Map<number, string[]>> = new Map();

  public steps: string[] = [];
  public operations: string[] = [];

  public activeInputElement: any;

  public form: FormGroup;

  constructor(private mainService: MainService,
              private fb: FormBuilder, private examService: ExamService) { }

  ngOnInit() {
    console.log(this.task);
    this.mainService.currentTask.subscribe((task: Task) => {
      this.taskObject = task;
      console.log(task);
      let taskFromLocalStorage: any = localStorage.getItem(task.name);
      // this.solution = task.endTerm;
      if (taskFromLocalStorage === null) {
        // this.task = task.startTerm;
        this.steps = [];
        this.operations = [];
        this.steps[0] = '$' + this.task + '$';
      } else {
        taskFromLocalStorage = JSON.parse(taskFromLocalStorage);
        this.task = taskFromLocalStorage.task;
        this.steps = taskFromLocalStorage.steps;
        this.operations = taskFromLocalStorage.operations;
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
      this.examService.changetaskState(this.taskObject.name, val);
      console.log(typeof(val));
    });
  }

  check() {
    this.mainService.applyTransformCheck(this.steps[this.steps.length - 1], this.operations[this.operations.length - 1], this.newTerm)
      .subscribe((data) => {
        if (data.result) {
          this.steps.push('$' + this.newTerm + '$');
          this.newTerm = '';

          const taskData = {
            task: this.task,
            steps: this.steps,
            operations: this.operations
          };

          localStorage.setItem(this.task, JSON.stringify(taskData));
        }
      });
  }

  finished() {
    let result = this.steps[this.steps.length - 1].replace('$', '');
    result = result.replace('$', '');
    console.log(result);
    console.log(this.solution);
    if (result === this.solution) {
      console.log('richtig');
    }
  }

  onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  setSymbol(symbol: string) {
    this.activeInputElement.value = symbol;
  }
}
