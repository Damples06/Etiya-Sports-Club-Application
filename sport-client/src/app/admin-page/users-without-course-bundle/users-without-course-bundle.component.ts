import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {AdminService} from "../../service/admin.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {UserBasic} from "../../models/user-basic";

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
  message!: string | null;
  isSuccess!: boolean;
  showTable: boolean = false;

  constructor(private adminService: AdminService) {}

  fetchUsersWithoutCourseBundle() {
    this.users$ = this.adminService.getUsersWithoutCourse();

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

      // next: (response) => {
      //   if (response.length > 0) {
      //     this.message = 'Users retrieved successfully!';
      //     this.isSuccess = true;
      //     this.showTable = true;
      //   } else {
      //     this.message = 'No users found without a course bundle.';
      //     this.isSuccess = false;
      //     this.showTable = false;
      //   }
      // },
      // error: (error) => {
      //   console.error('Error fetching users:', error);
      //   this.message = `Error: ${error.status} - ${error.message}`;
      //   this.isSuccess = false;
      //   this.showTable = false;
      // }
    });
  }
}
