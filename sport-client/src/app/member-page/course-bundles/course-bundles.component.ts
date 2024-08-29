import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MemberService} from "../../service/member.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";

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

  constructor(private memberService: MemberService, private userService: UserService, private notificationService: NotificationService) {}

  fetchCourseBundles() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.notificationService.showNotification('User ID is not available. Please log in.', 'green', 3000, 'warning')
      return;
    }

    this.memberService.getCourseBundles(this.userId)
      .subscribe({
        next: (response) => {
          this.courseBundles = response;
          this.notificationService.showNotification('Arrivals retrieved successfully!', 'green', 3000, 'success')
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

}
