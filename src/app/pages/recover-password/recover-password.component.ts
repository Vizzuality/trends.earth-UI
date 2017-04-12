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
  selector: 'gef-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  State:typeof State = State;
  state:State = State.PENDING;

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  recoverPass(form:any) {
    this.state = State.REQUESTING;
    this.authService.recoverPass(form.email)
    .then(() => {
        this.router.navigate(['/login']);
        this.state = State.SUCCESS;
    })
    .catch(() => {
        this.state = State.ERROR;
    });
  }

}