import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Task } from 'src/app/app.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.css']
})
export class CreateTasksComponent implements OnInit {

  @Output()
  uploadTest = new EventEmitter<any>();

  @Output()
  emitTask = new EventEmitter<Task>();

  @Input()
  public set task(task: Task) {
    this.onTask(task);
  }

  public taskForm: FormGroup;
  public activeInputElement: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.createForm();
  }

  private onTask(task: Task) {
    if (task !== undefined) {
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
      id: [-1, Validators.required],
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
    if (value !== '' && value !== null && value !== undefined) {
      return true;
    } else {
      return false;
    }
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
      -1,
      formValues.name.value,
      formValues.description.value,
      formValues.steps.value,
      formValues.score.value
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
      const task: Task = this.formToModel();
      const steps = task.steps.filter(step => step.step != null);
      task.steps = steps;
      this.emitTask.emit(task);
      this.createForm();
    } else {

    }
  }

  public submit() {
    this.uploadTest.emit('upload');
  }

}
