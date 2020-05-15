import {Component, OnInit, Input} from '@angular/core';
import {Task} from '../../app.model';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-examiner-tasklist',
  templateUrl: './examiner-tasklist.component.html',
  styleUrls: ['./examiner-tasklist.component.scss']
})
export class ExaminerTasklistComponent implements OnInit {

  public taskList: Task[] = [];
  public activeTask = new Task(-1, '', '', [], 0, 0, 0, 0, 0);

  @Input()
  type: string;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  public selectTask(task: Task) {
    this.activeTask = task;
    if (this.type === 'exercise') {
      this.taskService.changeTaskExaminerExercise(task);
    } else if (this.type === 'exam') {
      console.log('aasdasd');
      this.taskService.changeTaskExaminerExam(task);
    }
  }

  public deselectTask() {
    this.activeTask = new Task(-1, '', '', [], 0, 0, 0, 0, 0);
  }

}
