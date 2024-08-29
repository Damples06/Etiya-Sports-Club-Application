import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";

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
  isSuccess!: boolean;

  constructor(private memberService: MemberService, private userService: UserService, private notificationService: NotificationService) {}

  deleteArrival() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.notificationService.showNotification('User ID is not available. Please log in.', 'green', 3000, 'warning')
      return;
    }
    this.memberService.deleteArrival(this.userId,this.arrivalId)
      .subscribe({
        next: (response) => {
          this.notificationService.showNotification(<string>response.body, 'green', 3000, 'success')
          this.isSuccess = true;
        },
        error: () => {
          this.notificationService.showNotification('An error occurred during deleting arrival', 'green', 3000, 'error')
          this.isSuccess = false;
        }
      });
  }

}
