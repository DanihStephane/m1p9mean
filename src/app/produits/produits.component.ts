import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit {

  produits: any;

  constructor(private produitService: ProduitService,
    public authService: AuthService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("loggedUser"));
    this.produitService.listeProduit().subscribe((prods:any) => {
      console.log(prods.data);
      this.produits = prods.data;
    });
  }


  supprimerProduit(p: Produit) {
    console.log("suppppppppppppppppppppppppppppp supprimé");
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p._id).subscribe(() => {
        console.log("produit supprimé");
        // this.SuprimerProduitDuTableau(p);
      });
  }

  // SuprimerProduitDuTableau(prod: Produit) {
  //   this.produits.forEach((cur, index) => {
  //     if (prod.idProduit === cur.idProduit) {
  //       this.produits.splice(index, 1);
  //     }
  //   });
  // }

}
