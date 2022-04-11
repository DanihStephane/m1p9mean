import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiURL: string = 'https://nodejs-deploye.herokuapp.com/produits';

  produits: Produit[];

  // produit : Produit;

  constructor(private http: HttpClient) {
    /*  this.produits = [
        {idProduit : 1, nomProduit:"PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011")},
        {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010")},
        {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020")}
      ];*/
  }

  listeProduit() {
    let head = new HttpHeaders()
      .set("Authorization", "Bearer " + localStorage.getItem('token'));
    let body = {
      "code":1,
      "search":"",
      "pageNumber": 1,
      "nPerPage": 10,
      "crt": {
          "id_restaurant": "625183b3ccd3134b2722da35"
      }
    };
    return this.http.post(this.apiURL,body,{headers: head});
  }
  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiURL, prod, httpOptions);
  }
  supprimerProduit(id: string) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  consulterProduit(id: string): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }
  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiURL, prod, httpOptions);
  }
}
