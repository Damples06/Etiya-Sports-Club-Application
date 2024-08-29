import { Component } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {catchError, of} from "rxjs";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-sell-course-bundle',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgIf
  ],
  templateUrl: './sell-course-bundle.component.html',
  styleUrl: './sell-course-bundle.component.css'
})
export class SellCourseBundleComponent {
  userId!: number;
  isSuccess!: boolean;

  constructor(private adminService: AdminService, private notificationService: NotificationService) { }

  sellBundle() {
    this.adminService.sellCourseBundle(this.userId).pipe(
      catchError((error) =>{
        if (error.status === 404) {
          this.notificationService.showNotification('User not found', 'green', 3000, 'warning')
          this.isSuccess = false;
        } else {
          this.notificationService.showNotification('An error occurred during selling course bundle', 'green', 3000, 'error')
          this.isSuccess = false;
        }
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response){
          this.notificationService.showNotification('Course bundle sold successfully', 'green', 3000, 'success')
          this.isSuccess = true;
        }
      }
    })
  }
}
