import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HelpComponent } from './help/help.component';
import { ExamComponent } from './exam/exam.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { UploadComponent } from './upload/upload.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { ExerciseDetailsComponent } from './exercise/exercise-details/exercise-details.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'help', component: HelpComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'exercise/:id', component: ExerciseDetailsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'pdf', component: GeneratePdfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
