import {Component, OnInit} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {Exam, ExamDto, Step, Task, TaskDto} from '../app.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  public code = '';
  public exam: ExamDto;
  public activeInputElement: any;
  public error: string;
  public steps: string[] = [];
  public newTerm = '';
  public operations: string[] = [];
  public taskObject: TaskDto;
  public editStepBool: boolean[] = [false];
  public form: FormGroup;

  constructor(private examService: ExamService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.examService.currentTask.subscribe((task) => {
      if (this.taskObject !== undefined) {
        this.saveCurrentTask();
      }
      if (task !== '') {
        this.taskObject = task;
        let taskFromLocalStorage: any = localStorage.getItem(task.name);
        if (taskFromLocalStorage === null) {
          this.steps = [];
          this.operations = [];
          this.steps[0] = '$' + this.taskObject.startTerm + '$';
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

  getExam() {
    this.error = undefined;
    this.examService.getExamForStudent(this.code).subscribe(examDto => {
      this.exam = examDto;
      console.log(this.exam);
    }, e => {
      this.error = 'Falscher Code';
    });
  }

  createForm() {
    this.form = this.fb.group({
      taskState: ['', Validators.required]
    });
  }

  onFormChange() {
    this.form.get('taskState').valueChanges.subscribe(val => {
      this.examService.changeTaskState(this.taskObject.name, val);
      console.log(typeof (val));
    });
  }

  saveCurrentTask() {
    const taskData = {
      task: this.taskObject.startTerm,
      steps: this.steps,
      operations: this.operations
    };
    localStorage.setItem(this.taskObject.startTerm, JSON.stringify(taskData));
  }

  onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  setSymbol(symbol: string) {
    this.activeInputElement.value = symbol;
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
    this.saveCurrentTask();
    const tasks: TaskDto[] = this.exam.tasks;
    for (const task of tasks) {
      let taskFromLocalStorage: any = localStorage.getItem(task.name);
      taskFromLocalStorage = JSON.parse(taskFromLocalStorage);
      const steps = taskFromLocalStorage.steps;
      const operations = taskFromLocalStorage.operations;
      const taskSteps: Step[] = [];
      for (let i = 0; i < steps - 1; i++) {
        const step: Step = new Step(-1, steps[i], null, operations[i]);
        taskSteps.push(step);
      }
    }
  }

}
