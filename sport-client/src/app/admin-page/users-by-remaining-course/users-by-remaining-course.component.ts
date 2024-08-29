import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {AdminService} from "../../service/admin.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-users-by-remaining-course',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './users-by-remaining-course.component.html',
  styleUrl: './users-by-remaining-course.component.css'
})
export class UsersByRemainingCourseComponent implements OnInit{
  remainingCourses!: number;
  users$!: Observable<any[]>;
  isSuccess!: boolean;

  constructor(private adminService: AdminService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    // Optionally, initialize with a default value if needed
  }

  fetchUsers() {
    if (this.remainingCourses != null && this.remainingCourses >= 0) {
      this.users$ = this.adminService.getUsersByRemainingCourse(this.remainingCourses);

      this.users$.subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.notificationService.showNotification('Users retrieved successfully!', 'green', 3000, 'success')
            this.isSuccess = true;
          } else {
            this.notificationService.showNotification('No users found with the specified remaining courses.', 'green', 3000, 'warning')
            this.isSuccess = false;
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          this.notificationService.showNotification('An error occurred during searching', 'green', 3000, 'error')
          this.isSuccess = false;
        }
      });
    } else {
      this.notificationService.showNotification('Please enter a valid number of remaining courses.', 'green', 3000, 'info')
      this.isSuccess = false;
    }
  }
}
