import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NotificationService} from "../service/notification.service";
import {isPlatformBrowser, NgClass, NgForOf, NgStyle} from "@angular/common";
import {Notification} from "../models/notification";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgClass
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.notificationService.notification$.subscribe(notifications => {
      this.notifications = notifications;

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const lastNotification = document.querySelector('.notification:last-child');
          if (lastNotification) {
            lastNotification.classList.add('show');
          }
        }, 100);
      }
    });
  }
}
