
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/general/error404/error404.component';
import { AddComponent } from './pages/posts/add/add.component';
import { MypostsComponent } from './pages/posts/myposts/myposts.component';
import { ActivateComponent } from './pages/user/activate/activate.component';
import { AddhoppiesComponent } from './pages/user/addhoppies/addhoppies.component';
import { HomeComponent } from './pages/general/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { NotLoggedGuard } from './providers/guards/not-logged.guard';
import { LoggedGuard } from './providers/guards/logged.guard';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AllUsersComponent } from './pages/admin/all-users/all-users.component';
import { AdminlogedGuard } from './providers/guards/adminloged.guard';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { DispallProjectsComponent } from './admin/dispall-projects/dispall-projects.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "user", children: [
      { path: "", component: ProfileComponent, canActivate: [LoggedGuard] },
      { path: "register", component: RegisterComponent, canActivate: [NotLoggedGuard] },
      { path: "activate/:id", component: ActivateComponent },
      { path: "addHoppies", component: AddhoppiesComponent },
      { path: "login", component: LoginComponent, canActivate: [NotLoggedGuard] }
    ]
  },
  {
    path: "post", children: [
      { path: "", component: MypostsComponent },
      { path: "add", component: AddComponent }
    ]
  },
  {
    path: "admin", children: [
      { path: "", component: DashboardComponent, canActivate: [AdminlogedGuard] },
      { path: "register", component: AdminRegisterComponent, canActivate: [NotLoggedGuard] },
      { path: "dispAllUsers", component: AllUsersComponent },
      { path: "addProject", component: AddProjectComponent },
      { path: "dispProject", component: DispallProjectsComponent }
    ]
  },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
