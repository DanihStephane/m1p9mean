import { Router } from '@angular/router';
import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
  }

  async onLoggedin() {
    await this.authService.SignIn(this.user);
    if (!localStorage.getItem('loggedUser')) {
      this.router.navigate(['/']);
    } else {
      Swal.fire('Non connecté', 'Login ou mot de passe incorrecte!', 'error');
    }
  }
}
