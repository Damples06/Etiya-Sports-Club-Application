import {Component, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../service/user.service";
import {response} from "express";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('userForm') userForm!: NgForm;
  user: Partial<User> = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  notification: string | null = null;

  constructor(private userService: UserService) {
  }

  saveUser() {
    this.userService.register(this.user).subscribe({
      next: (response) => {
        console.log('User saved successfully', response);
        this.notification = 'User saved successfully!';
        this.userForm.resetForm();
        setTimeout(() => this.notification = null, 3000); // Clear notification after 3 seconds
      },
      error: (error) => {
        console.error('Error saving user', error);
        this.notification = 'Failed to save user. Please try again.';
        setTimeout(() => this.notification = null, 3000); // Clear notification after 3 seconds
      },
      complete: () => {
        console.log('User save process completed.');
      }
    });
  }
}
