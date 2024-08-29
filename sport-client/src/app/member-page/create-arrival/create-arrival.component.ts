import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";

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
  isSuccess!: boolean;

  constructor(private memberService: MemberService, private userService: UserService, private notificationService: NotificationService) {}

  createArrival() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.notificationService.showNotification('User ID is not available. Please log in.', 'green', 3000, 'warning')
      return;
    }

    const arrivalRequest = {
      userId: this.userId,
      date: this.date,
      courseBundleId: this.courseBundleId
    };

    this.memberService.createArrival(arrivalRequest)
      .subscribe({
        next: (response) => {
          this.notificationService.showNotification(<string>response.body, 'green', 3000, 'success')
          this.isSuccess = true;
        },
        error: () => {
          this.notificationService.showNotification('An error occurred during creating arrival', 'green', 3000, 'error')
          this.isSuccess = false;
        }
    });
  }
}
