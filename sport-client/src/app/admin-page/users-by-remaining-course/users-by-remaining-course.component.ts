import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {AdminService} from "../../service/admin.service";

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
  message!: string | null;
  isSuccess!: boolean;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Optionally, initialize with a default value if needed
  }

  fetchUsers() {
    if (this.remainingCourses != null && this.remainingCourses >= 0) {
      this.users$ = this.adminService.getUsersByRemainingCourse(this.remainingCourses);

      this.users$.subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.message = 'Users retrieved successfully!';
            this.isSuccess = true;
          } else {
            this.message = 'No users found with the specified remaining courses.';
            this.isSuccess = false;
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          this.message = `Error: ${error.status} - ${error.message}`;
          this.isSuccess = false;
        }
      });
    } else {
      this.message = 'Please enter a valid number of remaining courses.';
      this.isSuccess = false;
    }
  }
}
