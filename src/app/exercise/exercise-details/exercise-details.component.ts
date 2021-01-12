import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ExerciseService } from "src/app/services/exercise.service";
import {
  Exercise,
  Task,
  CheckStep,
  StudentExercise,
  Step,
} from "src/app/app.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExerciseListComponent } from "../exercise-list/exercise-list.component";
import { MathJaxDirective } from "ngx-mathjax";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SolutionModalComponent } from "./solution-modal/solution-modal.component";
import { StudentExerciseService } from "src/app/services/student.exercise.service";

@Component({
  selector: "app-exercise-details",
  templateUrl: "./exercise-details.component.html",
  styleUrls: ["./exercise-details.component.scss"],
})
export class ExerciseDetailsComponent implements OnInit {
  public exercise: Exercise;
  public studentExercise: StudentExercise;
  public activeInputElement: any;
  public newTerm = "";
  public editStepBool: boolean[] = [false];
  public conversions: boolean[] = [];
  public task: Task;
  public solutionFound: boolean;
  public notCheckedStepsIndices: number[] = [];
  public solutionStep: string;

  public form: FormGroup;

  @ViewChild(ExerciseListComponent, { static: false })
  private exerciseList: ExerciseListComponent;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    // tslint:disable-next-line: align
    private fb: FormBuilder,
    private router: Router,
    // tslint:disable-next-line: align
    private modalService: NgbModal,
    private studentExerciseService: StudentExerciseService
  ) {}

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe((params) => {
      const studentId: number = this.getStudentId();
      const exerciseId: number = +params.id;
      this.studentExerciseService
        .getStudentExerciseByExerciseIdAndStudentId(exerciseId, studentId)
        .subscribe((studentExercise: StudentExercise) => {
          this.task = undefined;
          this.studentExercise = studentExercise;
          this.exerciseList.taskList = studentExercise.tasks;
        });
      this.exerciseService
        .getExerciseByIdForStudent(exerciseId)
        .subscribe((exercise) => {
          this.exercise = exercise;
        });
    });

    this.exerciseService.currentTask.subscribe((task: any) => {
      if (this.task !== undefined) {
        this.saveCurrentTask();
      }
      if (task !== "") {
        this.solutionStep = "";
        this.task = task;
        this.getTaskState();
      }
    });
    this.onFormChange();
  }

  createForm() {
    this.form = this.fb.group({
      taskState: ["", Validators.required],
    });
  }

  onFormChange() {
    this.form.get("taskState").valueChanges.subscribe((val) => {
      this.exerciseService.changeTaskState(this.task.name, val);
    });
  }

  getTaskState() {
    if (this.exerciseList.taskStateMap.size > 1) {
      this.form.controls.taskState.setValue(
        this.exerciseList.taskStateMap.get(this.task.name)
      );
    }
  }

  onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  setSymbol(symbol: string) {
    this.activeInputElement.value += symbol;
  }

  saveCurrentTask() {
    const index: number = this.exerciseList.taskList.findIndex(
      (task) => task.name === this.task.name
    );
    this.exerciseList.taskList[index] = this.task;
  }

  check() {
    const me = this;
    const checkStepList: CheckStep[] = [];
    this.notCheckedStepsIndices = [];
    for (let i = 0; i < this.task.steps.length - 1; i++) {
      if (this.task.steps[i].conversion !== "") {
        const startEquation: string = this.task.steps[i].step;
        const targetEquation: string = this.task.steps[i + 1].step;
        checkStepList.push(
          new CheckStep(
            startEquation,
            this.task.steps[i].conversion,
            targetEquation,
            null
          )
        );
      } else {
        this.notCheckedStepsIndices.push(i);
      }
    }
    this.exerciseService
      .checkTask(checkStepList)
      .subscribe((correctedSteps) => {
        for (const [index, step] of correctedSteps.entries()) {
          me.conversions[index] = step.correct;
        }
        for (const index of this.notCheckedStepsIndices) {
          me.conversions.splice(index, 0, undefined);
        }
        const solution: Task = this.exercise.tasks.find(
          (task) =>
            this.task.name === task.name &&
            this.task.description === task.description
        );
        this.solutionStep = solution.steps[solution.steps.length - 1].step;
        const studentSolutionStep = this.task.steps.find(
          (step) => step.step === this.solutionStep
        );
        if (studentSolutionStep !== undefined) {
          this.solutionFound = true;
        } else {
          this.solutionFound = false;
        }
        if (this.solutionFound === false) {
          setTimeout(() => {
            this.solutionFound = undefined;
          }, 5000);
        }
        console.log(
          "SolutionStep: " +
            this.solutionStep +
            "StudentSolutionStep: " +
            studentSolutionStep +
            ", " +
            this.solutionFound
        );
      });
  }

  editStep(index: number) {
    this.editStepBool[index] = this.editStepBool[index] !== true;
  }

  removeStep(index: number) {
    this.task.steps.splice(index, 1);
  }

  nextStep() {
    this.task.steps.push(new Step(-1, this.newTerm, 0, ""));
    this.newTerm = "";
    this.editStepBool.push(false);
  }

  save() {
    this.saveCurrentTask();
    this.studentExercise.tasks = this.exerciseList.taskList;
    this.studentExercise.studentId = this.getStudentId();
    this.studentExerciseService
      .uploadStudentExercise(this.studentExercise)
      .subscribe((result) => {});
  }

  showSolution() {
    const solution: Task = this.exercise.tasks.find(
      (task) =>
        this.task.name === task.name &&
        this.task.description === task.description
    );
    const modalRef = this.modalService.open(SolutionModalComponent, {
      centered: true,
      size: "lg",
    });
    modalRef.componentInstance.task = solution;
    modalRef.result.then((result) => {}).catch(() => {});
  }

  private getStudentId(): number {
    const currentUser = localStorage.getItem("currentUser");
    const jsonObject = JSON.parse(currentUser);
    const studentId: number = jsonObject.studentId;
    return studentId;
  }
}
