import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorksComponent } from './components/works/works.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { WorkDetailsComponent } from './components/work-details/work-details.component';
import { EditWorkComponent } from './components/edit-work/edit-work.component';
import { NewWorkComponent } from './components/new-work/new-work.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageOverlayDirective } from './directives/image-overlay.directive';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorksComponent },
  { path: 'newWork', component: NewWorkComponent },
  {
    path: 'details/:id',
    component: WorkDetailsComponent,
  },
  {
    path: 'edit/:id',
    component: EditWorkComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: EditProfileComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    WorksComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    WorkDetailsComponent,
    EditWorkComponent,
    NewWorkComponent,
    ImageOverlayDirective,
    ImageDialogComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
