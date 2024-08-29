import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Arrival } from '../../models/arrival';
import { AdminService } from '../../service/admin.service';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { CommonModule } from '@angular/common';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-all-calendar',
  templateUrl: './all-calendar.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./all-calendar.component.css']
})
export class AllCalendarComponent {
  arrivals$!: Observable<Arrival[]>;
  arrivals: Arrival[] = [];
  daysInMonth: Date[] = [];
  arrivalsByDate: { [key: string]: Arrival[] } = {};
  isSuccess: boolean = false;
  showCalendar: boolean = false;

  constructor(private adminService: AdminService, private notificationService: NotificationService) {}

  fetchArrivals(): void {
    this.arrivals$ = this.adminService.getCalendar();

    this.arrivals$.subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.notificationService.showNotification('Arrivals fetched successfully', 'green', 3000, 'success')
          this.arrivals = response;
          this.isSuccess = true;
          this.showCalendar = true;
          this.generateCalendar();
        } else {
          this.notificationService.showNotification('There is no data', '', 3000, 'info')
          this.isSuccess = false;
          this.showCalendar = false;
        }
      },
      error: (error) => {
        console.error('Error fetching arrivals:', error);
        this.notificationService.showNotification('An error occurred during fetching arrivals', 'red', 3000, 'warning')
        this.isSuccess = false;
        this.showCalendar = false;
      }
    });
  }

  generateCalendar(): void {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    this.daysInMonth = eachDayOfInterval({ start, end });

    this.arrivalsByDate = this.arrivals.reduce((acc, arrival) => {
      const dateKey = format(new Date(arrival.date), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(arrival);
      return acc;
    }, {} as { [key: string]: Arrival[] });
  }

  protected readonly format = format;
}
