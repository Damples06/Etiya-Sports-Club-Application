import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Notification} from "../models/notification";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications = new BehaviorSubject<Notification[]>([]);
  notification$ = this._notifications.asObservable();

  constructor() { }

  showNotification(message: string, background: string, duration: number, type: Notification['type']) {
    const currentNotifications = this._notifications.value;
    const newNotification: Notification = {type, message, background, duration};
    this._notifications.next([...currentNotifications, newNotification]);

    setTimeout(() => {
      this._notifications.next(this._notifications.value.filter(n => n !== newNotification));
    }, duration);
  }
}
