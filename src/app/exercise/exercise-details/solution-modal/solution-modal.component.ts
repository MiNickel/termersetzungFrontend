import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/app.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-solution-modal',
  templateUrl: './solution-modal.component.html',
  styleUrls: ['./solution-modal.component.css']
})
export class SolutionModalComponent implements OnInit {

  public task: Task;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
