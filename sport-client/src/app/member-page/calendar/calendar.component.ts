import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {catchError, throwError} from "rxjs";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  userId: number | null = null;
  calendar: any[] = [];
  filteredCalendar: any[] = [];
  message!: string;
  selectedStatus: string = '';

  constructor(private memberService: MemberService, private userService: UserService) {}

  fetchCalendar() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.message = 'User ID is not available. Please log in.';
      return;
    }

    this.memberService.getCalendar(this.userId)
      .pipe(
        catchError((error: any) => {
          if (error.status === 404) {
            this.message = 'No calendar data found for this user';
          } else {
            this.message = 'Error fetching calendar';
          }
          return throwError(() => error);  // Propagate the error if necessary
        })
      )
      .subscribe({
        next: (response) => {
          this.calendar = response;
          this.message = this.calendar.length ? '' : 'No calendar data found';
          this.filterCalendar();
        },
        error: () => {
          // Error handling is already done in the pipe, no need to handle it again here.
        }
      });
  }

  filterCalendar() {
    if (this.selectedStatus) {
      this.filteredCalendar = this.calendar.filter(arrival => arrival.status === this.selectedStatus);
    } else {
      this.filteredCalendar = this.calendar;
    }
  }

}
