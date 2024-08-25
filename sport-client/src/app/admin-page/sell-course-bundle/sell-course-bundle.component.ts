import { Component } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {catchError, map, of, tap, throwError} from "rxjs";
import {HttpResponse} from "@angular/common/http";

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
  message!: string | null;
  isSuccess!: boolean;

  constructor(private adminService: AdminService) { }

  sellBundle() {
    this.adminService.sellCourseBundle(this.userId).pipe(
      catchError((error) =>{
        if (error.status === 404) {
          this.message = error.error || 'User not found';
          this.isSuccess = false;
        } else {
          this.message = `Unexpected error: ${error.status} -  ${error.message}`;
          this.isSuccess = false;
        }
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response){
          this.message = 'Course bundle sold successfuly'
          this.isSuccess = true;
        }
      }
    })
  }
}
