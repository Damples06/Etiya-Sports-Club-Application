import {Component} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-arrival',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    FormsModule
  ],
  templateUrl: './arrival.component.html',
  styleUrl: './arrival.component.css'
})
export class ArrivalComponent {
  userId: number | null = null;
  arrivals: any[] = [];

  constructor(private memberService: MemberService, private userService: UserService, private notificationService: NotificationService) {}

  fetchArrivals() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.notificationService.showNotification('User ID is not available. Please log in.', 'green', 3000, 'warning')
      return;
    }

    this.memberService.getArrival(this.userId).subscribe({
      next: (response) => {
        this.arrivals = response;
        this.notificationService.showNotification('Arrivals retrieved successfully!', 'green', 3000, 'success')
      },
      error: (error) => {
        if (error.status === 404) {
          this.notificationService.showNotification('Arrivals not found!', 'green', 3000, 'info')
        } else
          this.notificationService.showNotification('An error occurred during fetching arrivals', 'green', 3000, 'error')
      }
    });
  }
}
