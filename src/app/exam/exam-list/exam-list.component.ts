import {Component, OnInit, Input} from '@angular/core';
import {Exam, Task} from 'src/app/app.model';
import {ExamService} from '../../services/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  public taskList: Task[] = [];
  public activeTask = new Task(-1, '', '', '', [], 0, 0, 0, 0, 0);
  public taskStateMap: Map<string, string> = new Map();

  constructor(private examService: ExamService) {
  }

  ngOnInit() {
    this.examService.currentTaskState.subscribe(taskState => {
      this.taskStateMap.set(taskState.key, taskState.value);
    });
  }

  selectTask(task: Task) {
    this.activeTask = task;
    this.examService.changeTask(task);
  }


}
