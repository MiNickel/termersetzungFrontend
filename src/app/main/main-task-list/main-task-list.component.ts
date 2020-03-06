import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main.service';
import { ExamComponent } from 'src/app/exam/exam.component';
import { Exam } from 'src/app/app.model';

@Component({
  selector: 'app-main-task-list',
  templateUrl: './main-task-list.component.html',
  styleUrls: ['./main-task-list.component.css']
})
export class MainTaskListComponent implements OnInit {


  @Input()
  public exam: Exam;

  public tasks = [
    {
      tasks: [
        { subtask: 'x-2=-1', solution: 'x=1', name: 'Aufgabe 1' },
        { subtask: '5x-6=29', solution: 'x=7', name: 'Aufgabe 2' },
        { subtask: 'A3', solution: 'S3', name: 'Aufgabe 3' },
        { subtask: 'A4', solution: 'S4', name: 'Aufgabe 4' }
      ],
      name: 'Themenbereich 1'
    },
    {
      tasks: [
        { subtask: 'AA1', solution: 'S1', name: 'Aufgabe 1' },
        { subtask: 'AA2', solution: 'S2', name: 'Aufgabe 2' },
        { subtask: 'AA3', solution: 'S3', name: 'Aufgabe 3' },
        { subtask: 'AA4', solution: 'S4', name: 'Aufgabe 4' }
      ],
      name: 'Integral'
    }
  ];


  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  selectTask(subtask: any) {
    this.mainService.changeTask(subtask);
  }

}
