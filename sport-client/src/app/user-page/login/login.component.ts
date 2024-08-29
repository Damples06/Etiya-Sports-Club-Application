import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {NgIf} from "@angular/common";
import {User} from "../../models/user";
import {NotificationService} from "../../service/notification.service";

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
  // notification: string | null = null;

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  onSubmit() {
    this.userService.login(this.model).subscribe({
      next: (response) => {
        if (response.status === 200) {
          const { token, userId } = response.body!;
          if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId.toString());  // Save userId to local storage
            this.notificationService.showNotification('login successfully!', 'orange', 3000, "success");
            this.userService.notifyLoginStatusChange();
          } else {
            this.notificationService.showNotification('Failed to login. No token received', 'red', 3000, "error")
          }
        }
      },
      error: (error) => {
        console.log('Error status:', error.status)
        if (error.status == 400) {
          this.notificationService.showNotification('Email or password is incorrect', 'orange', 3000, "warning");
        } else {
          console.error('login error', error);
          this.notificationService.showNotification('An error occurred during logging in', 'red', 3000, "error");
        }
      }
    });
  }
}
