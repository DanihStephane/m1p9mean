import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { User } from './../model/User';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  user = new User();

  constructor(private authService : AuthService,
              public router: Router) { }

  ngOnInit(): void {

  }

  async onSignUp()
  {
    await this.authService.SignUp(this.user);
    if(!localStorage.getItem('loggedUser')){
      this.router.navigate(['/accueil']);
    }else{
      Swal.fire('Non connecté','Donnée incorrecte!','error');
    }
  }
}
