import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {MemberService} from "../../service/member.service";
import {catchError, throwError} from "rxjs";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-create-arrival',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './create-arrival.component.html',
  styleUrl: './create-arrival.component.css'
})
export class CreateArrivalComponent {
  userId: number | null = null;
  date!: string;
  courseBundleId!: number;
  message!: string;
  isSuccess!: boolean;

  constructor(private memberService: MemberService, private userService: UserService) {}

  createArrival() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.message = 'User ID is not available. Please log in.';
      return;
    }

    const arrivalRequest = {
      userId: this.userId,
      date: this.date,
      courseBundleId: this.courseBundleId
    };

    this.memberService.createArrival(arrivalRequest)
      .pipe(
        catchError((error: any) => {
          if (error.status === 404) {
            this.message = 'Course bundle or user not found';
          } else {
            this.message = 'Error creating arrival';
          }
          this.isSuccess = false;
          return throwError(() => error);  // Propagate the error if necessary
        })
      )
      .subscribe({
        next: (response) => {
          this.message = <string>response.body;
          this.isSuccess = true;
        },
        error: () => {
          // Error handling is already done in the pipe, no need to handle it again here.
        }
    });
  }
}
