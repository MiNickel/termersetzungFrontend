import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { ExamComponent } from './exam/exam.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { UploadComponent } from './upload/upload.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { ExerciseDetailsComponent } from './exercise/exercise-details/exercise-details.component';
import { ExaminerComponent } from './examiner/examiner.component';
import { ExaminerExamComponent } from './examiner/examiner-exam/examiner-exam.component';
import { ExaminerExerciseComponent } from './examiner/examiner-exercise/examiner-exercise.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'help', component: HelpComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'exercise/:id', component: ExerciseDetailsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'pdf', component: GeneratePdfComponent },
  { path: 'examiner', component: ExaminerComponent },
  { path: 'examiner/exam/:id', component: ExaminerExamComponent },
  { path: 'examiner/exercise/:id', component: ExaminerExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
