import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { ExamComponent } from './exam/exam.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { UploadComponent } from './upload/upload.component';
import { ExerciseDetailsComponent } from './exercise/exercise-details/exercise-details.component';
import { ExaminerComponent } from './examiner/examiner.component';
import { ExaminerExamComponent } from './examiner/examiner-exam/examiner-exam.component';
import { ExaminerExerciseComponent } from './examiner/examiner-exercise/examiner-exercise.component';
import { LoginComponent } from './login/login.component';
import { ExaminerExamFinishedComponent } from './examiner/examiner-exam/examiner-exam-finished/examiner-exam-finished.component';
// tslint:disable-next-line: max-line-length
import { ExaminerExamFinishedDetailComponent } from './examiner/examiner-exam/examiner-exam-finished/examiner-exam-finished-detail/examiner-exam-finished-detail.component';
import { DeactivateGuard } from './services/deactive.guard.service';
import { ActivateGuardProfessor } from './services/activate.guard.professor.service';
import { ActivateGuardStudent } from './services/activate.guard.student.service';


const routes: Routes = [
  { path: '', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'help', component: HelpComponent },
  { path: 'exam', component: ExamComponent, canActivate: [ActivateGuardStudent], canDeactivate: [DeactivateGuard] },
  { path: 'exercise', component: ExerciseComponent, canActivate: [ActivateGuardStudent] },
  { path: 'exercise/:id', component: ExerciseDetailsComponent, canActivate: [ActivateGuardStudent], canDeactivate: [DeactivateGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [ActivateGuardProfessor], canDeactivate: [DeactivateGuard] },
  { path: 'examiner', component: ExaminerComponent, canActivate: [ActivateGuardProfessor] },
  { path: 'examiner/exam/:id', component: ExaminerExamComponent, canActivate: [ActivateGuardProfessor] },
  { path: 'examiner/studentexam/:id', component: ExaminerExamFinishedComponent, canActivate: [ActivateGuardProfessor] },
  { path: 'examiner/studentexam/detail/:id', component: ExaminerExamFinishedDetailComponent, canActivate: [ActivateGuardProfessor] },
  { path: 'examiner/exercise/:id', component: ExaminerExerciseComponent, canActivate: [ActivateGuardProfessor] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
