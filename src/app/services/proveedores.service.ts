import { Injectable, inject } from '@angular/core';
import { Proveedores, ProveedoresList } from '../interfaces/proveedores';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
 http = inject(HttpClient);
 private apiUrl = 'http://localhost:3000/proveedores';
 
  nuevoProveedor(proveedor: Proveedores) {
   return this.http.post<Proveedores>(this.apiUrl, proveedor);
  };
  proveedoresList(): Observable<ProveedoresList[]> {
  return this.http.get<ProveedoresList[]>(this.apiUrl)
  }
}
