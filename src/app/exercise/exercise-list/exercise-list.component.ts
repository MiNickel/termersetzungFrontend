import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/app.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  @Input()
  public taskList: Task[];

  public activeTask = new Task(-1, '', '', [], 0);

  public taskStateMap: Map<string, string> = new Map();

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseService.currentTaskState.subscribe(taskState => {
      this.taskStateMap.set(taskState.key, taskState.value);
    });
  }

  selectTask(task: Task) {
    this.activeTask = task;
    this.exerciseService.changeTask(task);
  }

}
