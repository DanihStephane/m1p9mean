import { User } from './../model/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly rootUrl = 'https://nodejs-deploye.herokuapp.com/auth';

  public loggedUser: string;
  public roles: string[];


  constructor(private router: Router, private http: HttpClient) { }

  isloggedIn(){
    return (!localStorage.getItem('loggedUser'));
  }
  //general
  getHeaders() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json');
    return headers;
  }
  getStatus(data) {
    return (data.meta.status == 1);
  };


  logout() {
    let head = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem('token'));
    let out = this.http.delete(this.rootUrl + '/logout', { headers: head }).subscribe((data: any) => {
      console.log(data);
    });
    localStorage.removeItem('token');
    localStorage.removeItem('id_utilisateur');
    localStorage.removeItem('id_profile');

    this.loggedUser = undefined;
    this.roles = undefined;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  SignIn(user: User) {
    var body = {
      "nomUtilisateur": user.username,
      "mdp": user.password
    };
    return this.http.post(this.rootUrl + '/login', body, { headers: this.getHeaders() }).subscribe((data: any) => {
      if (this.getStatus(data)) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('id_utilisateur', data.data.id_utilisateur);
        localStorage.setItem('id_profile', data.data.id_profile);
        let name = data.data.nom + " " + data.data.prenom;
        let loggedIn = true;
        localStorage.setItem('loggedUser', name);
        localStorage.setItem('isloggedIn', String(loggedIn));
      } else {
        Swal.fire('Non connecté', 'Login ou mot de passe incorrecte!', 'error');
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });;
  }

  getName(){
    return localStorage.getItem('loggedUser');
  }

  isAdmin(): Boolean {
    if (!this.roles) //this.roles== undefiened
      return false;
    return (this.roles.indexOf('ADMIN') > -1);
  }

  isProfile() {
    let id = localStorage.getItem('id_profile');
    switch (id) {
      case "625182eeccd3134b2722da31":
        return "Responsable restaurant :";
        break;
      case "62518342ccd3134b2722da33":
        return "Responsable ekaly :";
        break;
      case "62518316ccd3134b2722da32":
        return "Livreur :";
        break;
      case "625182d0ccd3134b2722da30":
        return "Client :";
        break;
      default:
        return "";
    }
  }

  isClient(): Boolean {
    if (localStorage.getItem('id_profile') === "625182d0ccd3134b2722da30") //
      return true;
    return false;
  }

  isRestaurant() {
    if (localStorage.getItem('id_profile') === "625182eeccd3134b2722da31") //
      return true;
    return false;
  }

  isEkaly() {
    if (localStorage.getItem('id_profile') === "62518342ccd3134b2722da33") //
      return true;
    return false;
  }

  isLivreur() {
    if (localStorage.getItem('id_profile') === "62518316ccd3134b2722da32") //
      return true;
    return false;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    // this.users.forEach((curUser) => {
    //   if (curUser.username == username) {
    //     this.roles = curUser.roles;
    //   }
    // });
  }

  SignUp(user: User) {
    var body = {
      "utilisateur": {
        "nomUtilisateur": user.username,
        "mdp": user.password,
        "nom": user.nom,
        "prenom": user.prenom
      }
    };
    return this.http.post(this.rootUrl + '/sign-up', body, { headers: this.getHeaders() }).subscribe((data: any) => {
      console.log(data);
      console.log(body);
      if (this.getStatus(data)) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('id_utilisateur', data.data.id_utilisateur);
        localStorage.setItem('id_profile', data.data.id_profile);
        let name = data.data.nom + " " + data.data.prenom;
        let loggedIn = true;
        localStorage.setItem('loggedUser', name);
        localStorage.setItem('isloggedIn', String(loggedIn));
      } else {
        Swal.fire('Non connecté', 'Login ou mot de passe incorrecte!', 'error');
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });;
  }

}
