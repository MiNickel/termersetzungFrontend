import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/app.model';
import {TaskService} from 'src/app/services/task.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {

  public taskList: Task[] = [];
  public activeTask = new Task(-1, '', '', '', [], 0, 0, 0, 0, 0);

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  public selectTask(task: Task) {
    this.activeTask = task;
    this.taskService.changeTaskUpload(task);
  }

  public deselectTask() {
    this.activeTask = new Task(-1, '', '', '', [], 0, 0, 0, 0, 0);
  }

}
