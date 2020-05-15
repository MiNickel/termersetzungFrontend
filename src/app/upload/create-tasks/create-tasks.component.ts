import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/app.model';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.css']
})
export class CreateTasksComponent implements OnInit {

  @Output()
  emitTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<number>();

  @Output()
  deselectTask = new EventEmitter<string>();

  private counter = -1;
  public error;

  @Input()
  public set task(task: Task) {
    this.createForm();
    console.log('tas');
    this.onTask(task);
  }

  public taskForm: FormGroup;
  public activeInputElement: any;
  public taskIsRemovable = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  private onTask(task: Task) {
    if (task instanceof Object) {
      this.taskIsRemovable = true;
      this.taskForm.reset(this.modelToForm(task));
      this.steps.clear();
      for (const step of task.steps) {
        const stepGroup = new FormGroup({
          step: new FormControl(step.step),
          score: new FormControl(step.score),
          conversion: new FormControl(step.conversion)
        });
        this.steps.push(stepGroup);
      }
    }
  }

  private createForm() {
    this.taskForm = this.fb.group({
      id: [this.counter, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      steps: this.fb.array([
        new FormGroup({
          step: new FormControl(),
          score: new FormControl(),
          conversion: new FormControl()
        })
      ]),
      score: [null, Validators.required],
    });
  }

  get steps(): FormArray {
    return this.taskForm.get('steps') as FormArray;
  }

  addStep() {
    const step = new FormGroup({
      step: new FormControl(),
      score: new FormControl(),
      conversion: new FormControl()
    });
    this.steps.push(step);
  }

  removeStep(i: number) {
    this.steps.removeAt(i);
  }

  public checkValue(value: string) {
    return value !== '' && value !== null && value !== undefined;
  }

  public check() {
    console.log(this.steps);
  }

  public onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  public setSymbol(symbol: string) {
    this.activeInputElement.value += symbol;
  }

  private formToModel() {
    const formValues = this.taskForm.controls;
    return new Task(
      formValues.id.value,
      formValues.name.value,
      formValues.description.value,
      formValues.steps.value,
      formValues.score.value,
      0,
      0,
      0,
      0
    );
  }

  private modelToForm(task: Task) {
    return {
      id: task.id,
      name: task.name,
      description: task.description,
      steps: task.steps,
      score: task.score
    };
  }

  public saveTask() {
    if (this.taskForm.valid) {
      this.error = undefined;
      const task: Task = this.formToModel();
      task.steps = task.steps.filter(step => step.step != null && step.score != null);
      if (task.steps.length > 1) {
        this.emitTask.emit(task);
        this.counter -= 1;
        this.createForm();
      } else {
        this.error = 'Vervollständigen Sie die Zwischenschritte.';
      }
    } else {
      this.error = 'Füllen Sie alle Felder aus.';
    }
  }

  public removeTask() {
    const taskId: number = this.taskForm.controls.id.value;
    this.deleteTask.emit(taskId);
    this.createForm();
  }

  public refreshForm() {
    this.taskIsRemovable = false;
    this.deselectTask.emit('deselect');
    this.createForm();
  }

}
