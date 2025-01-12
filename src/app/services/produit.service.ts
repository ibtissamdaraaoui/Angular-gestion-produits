import { Injectable } from '@angular/core'; 
import { Produit } from '../model/produit.model';  // 
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/image.model'; 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/catgorieWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[]; //un tableau de Produit
  produit!: Produit;
  categories!: Categorie[];

  apiURL: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';

  constructor(private http: HttpClient,
              private authService : AuthService ) {}

  listeProduit(): Observable<Produit[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.get<Produit[]>(this.apiURL+"/all",{headers:httpHeaders});

  }

  ajouterProduit( prod: Produit):Observable<Produit>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.post<Produit>(this.apiURL+"/addprod", prod, {headers:httpHeaders});
    }
   
    
 
supprimerProduit(id : number) {
     const url = `${this.apiURL}/delprod/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.delete(url,  {headers:httpHeaders});
      }
    
 consulterProduit(id: number): Observable<Produit> {
        const url = `${this.apiURL}/getbyid/${id}`;
        console.log(url);
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.get<Produit>(url,{headers:httpHeaders});
        }

  updateProduit(prod :Produit) : Observable<Produit>    {
      console.log(prod.categorie);
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.put<Produit>(this.apiURL+"/updateprod", prod, {headers:httpHeaders});
        }


       
     listeCategories():Observable<CategorieWrapper>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return  this.http.get<CategorieWrapper>(this.apiURLCat,{headers:httpHeaders});
      
          }     



  consulterCategorie(id: number): Categorie {
    return this.categories.find((cat) => cat.idCat == id)!;
  }

 
  
 rechercherParCategorie(idCat: number):Observable< Produit[]> {
  const url = `${this.apiURL}/prodscat/${idCat}`;
  return this.http.get<Produit[]>(url);
    }

    rechercherParNom(nom: string):Observable< Produit[]> {
      const url = `${this.apiURL}/prodsByName/${nom}`;
        return this.http.get<Produit[]>(url);
     }

     ajouterCategorie( cat: Categorie):Observable<Categorie>{
      return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
     }
     uploadImage(file: File, filename: string): Observable<Image>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + '/image/upload'}`;
      return this.http.post<Image>(url, imageFormData);
      }
      loadImage(id: number): Observable<Image> {
      const url = `${this.apiURL +'/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
      }


}