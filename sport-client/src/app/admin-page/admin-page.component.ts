import { Component } from '@angular/core';
import {AllUsersComponent} from "./all-users/all-users.component";
import {UsersByRemainingCourseComponent} from "./users-by-remaining-course/users-by-remaining-course.component";
import {AllCalendarComponent} from "./all-calendar/all-calendar.component";
import {SellCourseBundleComponent} from "./sell-course-bundle/sell-course-bundle.component";
import {UsersWithoutCourseBundleComponent} from "./users-without-course-bundle/users-without-course-bundle.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    AllUsersComponent,
    UsersByRemainingCourseComponent,
    UsersWithoutCourseBundleComponent,
    AllCalendarComponent,
    SellCourseBundleComponent,
    UsersWithoutCourseBundleComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
