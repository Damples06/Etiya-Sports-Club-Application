import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Arrival } from '../../models/arrival';
import { AdminService } from '../../service/admin.service';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { CommonModule } from '@angular/common';
import { NgClass, NgForOf, NgIf } from '@angular/common';

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
  message: string | null = null;
  isSuccess: boolean = false;
  showCalendar: boolean = false;

  constructor(private adminService: AdminService) {}

  fetchArrivals(): void {
    this.arrivals$ = this.adminService.getCalendar();

    this.arrivals$.subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.arrivals = response;
          this.message = 'Arrivals retrieved successfully!';
          this.isSuccess = true;
          this.showCalendar = true;
          this.generateCalendar();
        } else {
          this.message = 'No arrivals found for the selected period.';
          this.isSuccess = false;
          this.showCalendar = false;
        }
      },
      error: (error) => {
        console.error('Error fetching arrivals:', error);
        this.message = `Error: ${error.status} - ${error.message}`;
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
