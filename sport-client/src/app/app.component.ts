import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router ,RouterLink, RouterOutlet} from '@angular/router';
import {AllUsersComponent} from "./admin-page/all-users/all-users.component";
import { RegisterComponent} from "./user-page/register/register.component";
import {LoginComponent} from "./user-page/login/login.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "./service/user.service";
import {Subscription} from "rxjs";
import {NotificationComponent} from "./notification/notification.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AllUsersComponent, RegisterComponent, LoginComponent, RouterLink, NgOptimizedImage, NgIf, NgClass, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'sport-client';
  isMenuOpen = false;
  isLoggedIn = false;
  private loginStatusSubscription: Subscription;

  constructor(private userService: UserService, private router: Router, private cdr: ChangeDetectorRef) {
    this.loginStatusSubscription = this.userService.loginStatusChanged.subscribe(() => {
      this.checkLoginStatus();
    })
  }

  ngOnInit() {
    this.checkLoginStatus();
    // this.userService.loginStatusChanged.subscribe(() => {
    //   this.checkLoginStatus();
    // })
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  checkLoginStatus() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      this.isLoggedIn = !!token && !!userId;
      this.cdr.detectChanges();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    this.userService.notifyLoginStatusChange();
    this.router.navigate(['/login']);
  }
}
