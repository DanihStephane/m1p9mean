import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  currentProduit = new Produit();

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params.id).
      subscribe((prod:any) => {
        console.log(prod.data);
        this.currentProduit = prod.data;
      });
  }
}
