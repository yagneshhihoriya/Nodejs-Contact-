import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(username, password) {
    let user = username.value;
    let psw = password.value;

    if (!user || !psw) {
      this.toastr.error('username and password is required');
      return;
    }
    this.http
      .post('http://localhost:3000/register', { email: user, password: psw })
      .subscribe((response: any) => {
        if (response.status != 200) {
          this.toastr.error(response.message);
          return;
        }
        sessionStorage.setItem('user_id', response.data._id);
        this.toastr.success('login success');
        this.router.navigate(['/']);
      }).catch();
  }
}
