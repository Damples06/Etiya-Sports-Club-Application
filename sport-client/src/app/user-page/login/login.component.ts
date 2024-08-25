import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {NgIf} from "@angular/common";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class LoginComponent {
  @ViewChild('loginForm') userForm!: NgForm;
  model: Partial<User> = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;
  notification: string | null = null;

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.login(this.model).subscribe({
      next: (response) => {
        if (response.status === 200) {
          const { token, userId } = response.body!;
          if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId.toString());  // Save userId to local storage
            this.notification = 'Login successfully!';
          } else {
            this.notification = 'Failed to login. No token received';
          }
        }
      },
      error: (error) => {
        console.error('login error', error);
        this.notification = 'Failed to login. Please try again.';
      }
    });
  }
}
