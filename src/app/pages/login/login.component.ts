import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";

 enum State {
    PENDING,
    REQUESTING,
    SUCCESS,
    ERROR
  }

@Component({
  selector: 'gef-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  State:typeof State = State;
  state:State = State.REQUESTING;

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form:any) {
    this.state = State.REQUESTING;
    this.authService.login(form.email, form.password)
    .then(() => {
        this.router.navigate(['/private']);
        this.state = State.SUCCESS;
    })
    .catch(() => {
        this.state = State.ERROR;
    });
  }

}