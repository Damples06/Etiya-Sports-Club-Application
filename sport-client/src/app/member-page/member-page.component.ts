import { Component } from '@angular/core';
import {CalendarComponent} from "./calendar/calendar.component";
import {ArrivalComponent} from "./arrival/arrival.component";
import {CourseBundlesComponent} from "./course-bundles/course-bundles.component";
import {CreateArrivalComponent} from "./create-arrival/create-arrival.component";
import {DeleteArrivalComponent} from "./delete-arrival/delete-arrival.component";

@Component({
  selector: 'app-member-page',
  standalone: true,
  imports: [
    CalendarComponent,
    ArrivalComponent,
    CourseBundlesComponent,
    CreateArrivalComponent,
    DeleteArrivalComponent
  ],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.css'
})
export class MemberPageComponent {

}
