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

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  public selectTask(task: Task) {
    this.taskService.changeTask(task);
  }

}
