import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, Productos } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class GestionProductosService {
http = inject(HttpClient);
url = 'http://localhost:3000/productos';

nuevoProducto(producto: Producto){
  return this.http.post(`${this.url}`, producto);
};

productos(){
  return this.http.get<Productos>(`${this.url}`);
}
  
}
