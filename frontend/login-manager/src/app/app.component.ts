import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'notifier';
  isLoggedIn = sessionStorage.getItem('user_id');
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('user_id')) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
