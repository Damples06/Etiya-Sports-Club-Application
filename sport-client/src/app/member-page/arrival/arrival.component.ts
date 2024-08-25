import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Arrival} from "../../models/arrival";
import {catchError, Observable, of} from "rxjs";
import {MemberService} from "../../service/member.service";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-arrival',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    FormsModule
  ],
  templateUrl: './arrival.component.html',
  styleUrl: './arrival.component.css'
})
export class ArrivalComponent {
  userId: number | null = null;
  arrivals: any[] = [];
  message!: string;

  constructor(private memberService: MemberService, private userService: UserService) {}

  fetchArrivals() {
    this.userId = this.userService.getUserId();
    if (this.userId === null) {
      this.message = 'User ID is not available. Please log in.';
      return;
    }

    this.memberService.getArrival(this.userId)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            this.message = 'No arrivals found for the given User ID';
          } else {
            this.message = 'Error fetching arrivals';
            console.error('Fetch Arrivals Error:', error);
          }
          return of([]);  // Return an empty array to the subscriber
        })
      )
      .subscribe({
        next: (response) => {
          this.arrivals = response;
          this.message = this.arrivals.length ? '' : 'No arrivals found';
        },
        error: (error) => {
          this.message = 'Unexpected error occurred';
          console.error('Unexpected Fetch Arrivals Error:', error);
        }
      });
  }
}
