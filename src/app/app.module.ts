import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MainTaskListComponent } from './main/main-task-list/main-task-list.component';
import { MainTaskComponent } from './main/main-task/main-task.component';
import { MainService } from './main/main.service';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { ConfigService } from './services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HelpComponent } from './help/help.component';
import { ExamComponent } from './exam/exam.component';
import { ExamService } from './services/exam.service';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { UploadComponent } from './upload/upload.component';
import { ErrorComponent } from './error/error.component';
import { CreateTasksComponent } from './upload/create-tasks/create-tasks.component';
import { UploadListComponent } from './upload/upload-list/upload-list.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { ExerciseService } from './services/exercise.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ExerciseDetailsComponent } from './exercise/exercise-details/exercise-details.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { ExaminerComponent } from './examiner/examiner.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   declarations: [
      AppComponent,
      MainComponent,
      MainTaskListComponent,
      MainTaskComponent,
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
      ExaminerComponent
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
      MainService,
      ConfigService,
      ExamService,
      ExerciseService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
