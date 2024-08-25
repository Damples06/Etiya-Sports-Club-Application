import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {catchError, throwError} from "rxjs";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-delete-arrival',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './delete-arrival.component.html',
  styleUrl: './delete-arrival.component.css'
})
export class DeleteArrivalComponent {
  userId: number | null = null;
  arrivalId!: number;
  message!: string;
  isSuccess!: boolean;

  constructor(private memberService: MemberService, private userService: UserService) {}

  deleteArrival() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.message = 'User ID is not available. Please log in.';
      return;
    }
    this.memberService.deleteArrival(this.userId,this.arrivalId)
      .pipe(
        catchError((error: any) => {
          if (error.status === 404) {
            this.message = 'Arrival not found';
          } else {
            this.message = 'Error deleting arrival';
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
