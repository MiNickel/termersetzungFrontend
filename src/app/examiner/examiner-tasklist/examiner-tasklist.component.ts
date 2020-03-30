import {Component, OnInit} from '@angular/core';
import {Task} from '../../app.model';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-examiner-tasklist',
  templateUrl: './examiner-tasklist.component.html',
  styleUrls: ['./examiner-tasklist.component.scss']
})
export class ExaminerTasklistComponent implements OnInit {

  public taskList: Task[] = [];
  public activeTask = new Task(-1, '', '', [], 0);

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  public selectTask(task: Task) {
    this.activeTask = task;
    this.taskService.changeTask(task);
  }

}
