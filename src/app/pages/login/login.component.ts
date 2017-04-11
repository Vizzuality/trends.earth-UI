import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'gef-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  onClick(email:string, password:string) {
    this.authService.login(email, password)
    .then(() => {
        this.router.navigate(['/private']);
    });
  }

}