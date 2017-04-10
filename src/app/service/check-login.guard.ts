import { CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckLoginGuard implements CanActivateChild {

    canActivateChild() {
        return true;
    }
}
