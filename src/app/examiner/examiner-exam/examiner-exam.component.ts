import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../services/exam.service';
import {Exam, Examiner, Exercise, Task} from '../../app.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ExaminerTasklistComponent} from '../examiner-tasklist/examiner-tasklist.component';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-examiner-exam',
  templateUrl: './examiner-exam.component.html',
  styleUrls: ['./examiner-exam.component.scss']
})
export class ExaminerExamComponent implements OnInit {

  public form: FormGroup;
  private showPassword: boolean;
  public created = false;
  public tasks: Task[] = [];
  public task: Task;

  @ViewChild(ExaminerTasklistComponent, {static: false})
  private taskList: ExaminerTasklistComponent;

  constructor(private route: ActivatedRoute, private examService: ExamService, private fb: FormBuilder, private taskService: TaskService) {
  }

  ngOnInit() {
    const examId = this.route.snapshot.params.id;
    this.examService.getExamById(examId).subscribe((exam: Exam) => {
      this.createForm(exam);
      this.created = true;
      this.taskList.taskList = exam.tasks;
    });
    this.taskService.currentTask.subscribe((task: any) => {
      if (task !== '') {
        this.task = task;
      }
    });
  }

  private createForm(exam: Exam) {
    this.form = this.fb.group({
      id: [{value: exam.id, disabled: true}, Validators.required],
      name: [exam.name, Validators.required],
      examiner: new FormGroup({
        firstname: new FormControl(exam.examiner.firstname),
        lastname: new FormControl(exam.examiner.lastname)
      }),
      code: [{value: exam.code, disabled: true}, Validators.required],
      startDate: [exam.startDate, Validators.required],
      endDate: [exam.endDate, Validators.required]
    });
  }

  private formToModel() {
    const formValues = this.form.controls;
    return new Exam(
      formValues.id.value,
      formValues.name.value,
      new Examiner(-1, formValues.examiner.get('firstname').value, formValues.examiner.get('lastname').value),
      this.tasks,
      formValues.code.value,
      formValues.startDate.value,
      formValues.endDate.value
    );
  }

  changePasswordState() {
    this.showPassword = !this.showPassword;
  }

  upload() {
    const exam: Exam = this.formToModel();
    this.examService.uploadExam(exam).subscribe(result => {

    });
  }

  public saveTask(task: Task) {
    const taskIndex = this.tasks.findIndex(t => t.id === task.id);
    if (taskIndex === -1) {
      this.tasks.push(task);
      this.taskList.taskList.push(task);
    } else {
      this.tasks[taskIndex] = task;
      this.taskList.taskList[taskIndex] = task;
    }
  }

}
