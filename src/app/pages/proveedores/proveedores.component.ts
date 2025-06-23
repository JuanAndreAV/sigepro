import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresList } from '../../interfaces/proveedores';
import { ProveedoresService } from '../../services/proveedores.service';


@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {
//proveedores = signal<Proveedores[]>([]);
proveedoresService = inject(ProveedoresService);
proveedores: ProveedoresList[] = []
successMessage = signal<string>('');

  providerForm = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contactoNombre: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('', )
    })
  );
  addProveedor(){
    if(this.providerForm().valid){
      const prov = this.providerForm().value;
      this.proveedoresService.nuevoProveedor(prov).subscribe(
        (res) =>this.successMessage.update(()=>`Proveedor: ${res.nombre} agregado con éxito!`),
      );
      this.providerForm().reset()
    }else{
      alert('Favor, ingresa el nombre del proveedor');
    }  
  };
  ngOnInit(): void {
    this.proveedoresService.proveedoresList()
    .subscribe((data) => {
      this.proveedores = data;
    }, (err) => {
      alert(`Error al cargar proveedores', ${err}`);
    });
  }
 
  // addProveedor(){
  //   if(this.providerForm().valid){
  //     this.proveedores.update(proveedor=>[...proveedor , this.providerForm().value])
  //     this.providerForm().reset()
  //   }
  //   else{
  //     alert('Favor, ingresa el nombre del proveedor');
  //     return
  //   }
    
    
  // }

  // eliminarProveedor(id: any){
  //   this.proveedores.update(proveedor => proveedor.filter(nombre=>nombre.nombre !== id))
  // }

}
