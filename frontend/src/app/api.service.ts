import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Produit } from './models/produit';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

    constructor(private http:HttpClient) { }

    public getProducts () : Observable<Produit[]> {
        return this.http.get<Produit[]>(environment.backendProduit);
    }

    public register(email: string, username: string, password: string): Observable<any> {
        const body = { email, username, password };
        return this.http.post(environment.backendRegister, body);
    }
    
    public login(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post(environment.backendLogin, body);
    }
    
    public getCurrentUser(): Observable<any> {
        return this.http.get<any>(environment.backendUser); 
    }
    
    public updateUser(updatedUser: any): Observable<any> {
        return this.http.put<any>(environment.backendUser, updatedUser);
    }
}