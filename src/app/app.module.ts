import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { HomeComponent } from './pages/general/home/home.component';
import { ActivateComponent } from './pages/user/activate/activate.component';
import { AddhoppiesComponent } from './pages/user/addhoppies/addhoppies.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { AddComponent } from './pages/posts/add/add.component';
import { MypostsComponent } from './pages/posts/myposts/myposts.component';
import { Error404Component } from './pages/general/error404/error404.component';
import { DoctorcardComponent } from './shared/doctorcard/doctorcard.component';
import { CommonModule } from '@angular/common';
import { GlobalService } from './providers/services/global.service';
import { AuthInterceptor } from './providers/interceptors/auth.interceptor';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AllUsersComponent } from './pages/admin/all-users/all-users.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddNewUserComponent } from './pages/admin/add-new-user/add-new-user.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { DispallProjectsComponent } from './admin/dispall-projects/dispall-projects.component';
// import { LoginAdminComponent } from './adminDashboard/login-admin/login-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    ActivateComponent,
    AddhoppiesComponent,
    LoginComponent,
    ProfileComponent,
    AddComponent,
    MypostsComponent,
    Error404Component,
    DoctorcardComponent,
    AdminRegisterComponent,
    DashboardComponent,
    AllUsersComponent,
    AddNewUserComponent,
    AddProjectComponent,
    DispallProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    Ng2SearchPipeModule

  ],
  providers: [
    GlobalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
