import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {NgForOf, NgIf} from "@angular/common";
import {AdminService} from "../../service/admin.service";
import {NotificationService} from "../../service/notification.service";


@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit{
  users: User[] = [];
  showTable: boolean = false;

  constructor(private adminService: AdminService, private notificationService: NotificationService) {}

  ngOnInit(): void {}

  getAllUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.showTable = true;
        this.notificationService.showNotification('Users fetched successfully', 'green', 3000, 'success')

      },
      error: ()  => {
        this.notificationService.showNotification('An error occurred during fetching users', 'green', 3000, 'error')
      }
    });
  }

  close(): void {
    this.showTable = false;
  }

}
