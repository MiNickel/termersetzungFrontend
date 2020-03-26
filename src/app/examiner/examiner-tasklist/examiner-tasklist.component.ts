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
  public hovered: boolean;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  public selectTask(task: Task) {
    this.taskService.changeTask(task);
  }

}
