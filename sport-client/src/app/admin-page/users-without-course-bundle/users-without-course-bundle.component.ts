import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {AdminService} from "../../service/admin.service";
import {Observable} from "rxjs";
import {UserBasic} from "../../models/user-basic";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-users-without-course-bundle',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './users-without-course-bundle.component.html',
  styleUrl: './users-without-course-bundle.component.css'
})
export class UsersWithoutCourseBundleComponent {
  users$!: Observable<UserBasic[]>;
  isSuccess!: boolean;

  constructor(private adminService: AdminService, private notificationService: NotificationService) {}

  fetchUsersWithoutCourseBundle() {
    this.users$ = this.adminService.getUsersWithoutCourse();

    this.users$.subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.notificationService.showNotification('Users retrieved successfully!', 'green', 3000, 'success')
          this.isSuccess = true;
        } else {
          this.notificationService.showNotification('No users found with the specified remaining courses.', 'green', 3000, 'info')
          this.isSuccess = false;
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.notificationService.showNotification('An error occurred during fetching users', 'green', 3000, 'error')
        this.isSuccess = false;
      }
    });
  }
}
