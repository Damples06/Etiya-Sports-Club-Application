import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";

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
  selectedStatus: string = '';

  constructor(private memberService: MemberService, private userService: UserService, private notificationService: NotificationService) {}

  fetchCalendar() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.notificationService.showNotification('User ID is not available. Please log in.', 'green', 3000, 'warning')
      return;
    }

    this.memberService.getCalendar(this.userId).subscribe({
      next: (response) => {
        this.calendar = response;
        this.notificationService.showNotification('Arrivals retrieved successfully!', 'green', 3000, 'success');
        this.filterCalendar()
      },
      error: (error) => {
        // Error handling is already done in the pipe, no need to handle it again here.
        if (error.status === 404) {
          this.notificationService.showNotification('Arrivals not found!', 'green', 3000, 'info')
        } else {
          this.notificationService.showNotification('An error occurred during fetching arrivals', 'green', 3000, 'error')
        }
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
