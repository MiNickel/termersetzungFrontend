import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MathjaxComponent} from './mathjax/mathjax.component';
import {ConfigService} from './services/config.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {HelpComponent} from './help/help.component';
import {ExamComponent} from './exam/exam.component';
import {ExamService} from './services/exam.service';
import {ExerciseComponent} from './exercise/exercise.component';
import {ExamListComponent} from './exam/exam-list/exam-list.component';
import {UploadComponent} from './upload/upload.component';
import {ErrorComponent} from './error/error.component';
import {CreateTasksComponent} from './upload/create-tasks/create-tasks.component';
import {UploadListComponent} from './upload/upload-list/upload-list.component';
import {GeneratePdfComponent} from './generate-pdf/generate-pdf.component';
import {ExerciseService} from './services/exercise.service';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ExerciseDetailsComponent} from './exercise/exercise-details/exercise-details.component';
import {ExerciseListComponent} from './exercise/exercise-list/exercise-list.component';
import {ExaminerComponent} from './examiner/examiner.component';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExaminerExamComponent} from './examiner/examiner-exam/examiner-exam.component';
import {ExaminerExerciseComponent} from './examiner/examiner-exercise/examiner-exercise.component';
import {ExaminerTasklistComponent} from './examiner/examiner-tasklist/examiner-tasklist.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { SuccessModalComponent } from './modal/success-modal/success-modal.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';

@NgModule({
   declarations: [
      AppComponent,
      MathjaxComponent,
      HeaderComponent,
      HelpComponent,
      ExamComponent,
      ExamListComponent,
      ExerciseListComponent,
      ExerciseComponent,
      UploadComponent,
      ErrorComponent,
      CreateTasksComponent,
      UploadListComponent,
      GeneratePdfComponent,
      ExerciseDetailsComponent,
      ExaminerComponent,
      ExaminerExamComponent,
      ExaminerExerciseComponent,
      ExaminerTasklistComponent,
      LoginComponent,
      SuccessModalComponent,
      ConfirmModalComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      NgbModalModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      BrowserAnimationsModule
   ],
   providers: [
      ConfigService,
      ExamService,
      ExerciseService,
      AuthService,
      {provide: OWL_DATE_TIME_LOCALE, useValue: 'de'},
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      SuccessModalComponent,
      ConfirmModalComponent
   ]
})
export class AppModule {
}
