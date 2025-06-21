import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proveedores } from '../../interfaces/proveedores';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
proveedores = signal<Proveedores[]>([]);

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
      this.proveedores.update(proveedor=>[...proveedor , this.providerForm().value])
      this.providerForm().reset()
    }
    else{
      alert('Favor, ingresa el nombre del proveedor');
      return
    }
    
    
  }

  eliminarProveedor(id: any){
    this.proveedores.update(proveedor => proveedor.filter(nombre=>nombre.nombre !== id))
  }

}
