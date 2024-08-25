import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AllUsersComponent} from "./admin-page/all-users/all-users.component";
import { RegisterComponent} from "./user-page/register/register.component";
import {LoginComponent} from "./user-page/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AllUsersComponent, RegisterComponent, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sport-client';
}
