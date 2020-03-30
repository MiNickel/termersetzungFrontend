import {Component, OnInit, Input} from '@angular/core';
import {Exam, Task, TaskDto} from 'src/app/app.model';
import {MainService} from 'src/app/main/main.service';
import {ExamService} from '../../services/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  @Input()
  public taskList: TaskDto[];
  public activeTask = new TaskDto(-1, '', '', '', 0, 0, 0);
  public taskStateMap: Map<string, string> = new Map();

  constructor(private examService: ExamService) {
  }

  ngOnInit() {
    this.examService.currentTaskState.subscribe(taskState => {
      this.taskStateMap.set(taskState.key, taskState.value);
    });
  }

  selectTask(task: TaskDto) {
    this.activeTask = task;
    this.examService.changeTask(task);
  }


}
