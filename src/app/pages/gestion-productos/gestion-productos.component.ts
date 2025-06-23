import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css'
})
export class GestionProductosComponent {

  productoForm = signal<FormGroup>(
    new FormGroup({
      nombreProducto: new FormControl('',[Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl(''),
      mermasConfig: new FormArray([])
    })
  );
  get mermasConfigArray(): FormArray {
    return this.productoForm().get('mermasConfig') as FormArray;
  }
   // Método para añadir una nueva merma
  agregarMerma() {
    this.mermasConfigArray.push(new FormControl('', Validators.required));
  }

  // Método para eliminar una merma
  eliminarMerma(index: number) {
    this.mermasConfigArray.removeAt(index);
  }

  // Método para enviar el formulario
  guardarProducto() {
    if (this.productoForm().valid) {
      const productoData = this.productoForm().value;
      console.log('Producto a guardar:', productoData);
      // Aquí iría la lógica para guardar en la base de datos
    }
  }
}
