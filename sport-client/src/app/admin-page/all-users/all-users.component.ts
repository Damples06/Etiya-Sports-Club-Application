import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {NgForOf, NgIf} from "@angular/common";
import {AdminService} from "../../service/admin.service";


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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  getAllUsers(): void {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      this.showTable = true;
    })
  }

  close(): void {
    this.showTable = false;
  }

}
