import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {AllUsersComponent} from "./admin-page/all-users/all-users.component";
import {NgModule} from "@angular/core";
import {RegisterComponent} from "./user-page/register/register.component";
import {LoginComponent} from "./user-page/login/login.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {MemberPageComponent} from "./member-page/member-page.component";

export const routes: Routes = [
  { path: 'users', component: AllUsersComponent },
  // { path: '', redirectTo: '/users', pathMatch: "full"}
  {path: 'admin', component: AdminPageComponent},
  {path: 'member', component: MemberPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterOutlet, AllUsersComponent, RouterModule.forRoot(routes)],
  exports: [RouterOutlet, AllUsersComponent, RouterModule]
})
export class AppRoutingModule {}
