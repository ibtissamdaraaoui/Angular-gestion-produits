import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Image } from '../model/image.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit.component.html',
  styles: ``,
})
export class UpdateProduitComponent implements OnInit {
  currentProduit = new Produit();

  categories!: Categorie[];
  updatedCatId!: number;
  myImage! : string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
      });
      
      this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
      subscribe( prod =>{ this.currentProduit = prod;
      this.updatedCatId = prod.categorie.idCat;
      this.produitService
      .loadImage(this.currentProduit.image.idImage)
      .subscribe((img: Image) => {
      this.myImage = 'data :' + img.type + ';base64,' + img.image;
      });
      } ) ;
    }



  updateProduit() {
    this.currentProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.updatedCatId
    )!;
    this.produitService.updateProduit(this.currentProduit).subscribe((prod) => {
      this.router.navigate(['produits']);
    });
  }
}