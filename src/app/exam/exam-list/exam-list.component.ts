import { Component, OnInit, Input } from '@angular/core';
import { Exam, Task } from 'src/app/app.model';
import { MainService } from 'src/app/main/main.service';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  @Input()
  public exam: Exam;
  public taskStateMap: Map<string, string> = new Map();

  constructor(private mainService: MainService,
              private examService: ExamService) { }

  ngOnInit() {
    console.log(this.exam);
    this.examService.currentTaskState.subscribe(taskState => {
      this.taskStateMap.set(taskState.key, taskState.value);
      console.log(taskState);
    });
  }

  selectTask(task: Task) {
    this.mainService.changeTask(task);
  }



}
