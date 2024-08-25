import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {catchError, throwError} from "rxjs";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-course-bundles',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './course-bundles.component.html',
  styleUrl: './course-bundles.component.css'
})
export class CourseBundlesComponent {
  userId: number | null = null;
  courseBundles: any[] = [];
  message!: string;

  constructor(private memberService: MemberService, private userService: UserService ) {}

  fetchCourseBundles() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.message = 'User ID is not available. Please log in.';
      return;
    }

    this.memberService.getCourseBundles(this.userId)
      .pipe(
        catchError((error: any) => {
          if (error.status === 404) {
            this.message = 'No course bundles found for this user';
          } else {
            this.message = 'Error fetching course bundles';
          }
          return throwError(() => error);  // Propagate the error if necessary
        })
      )
      .subscribe({
        next: (response) => {
          this.courseBundles = response;
          this.message = this.courseBundles.length ? '' : 'No course bundles found';
        },
        error: () => {
          // Error handling is already done in the pipe, no need to handle it again here.
        }
      });
  }

}
