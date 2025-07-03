import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { GestionProductosService } from '../../services/gestion-productos.service';
import { Productos } from '../../interfaces/producto';
@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css'
})
export class GestionProductosComponent implements OnInit {
  productService = inject(GestionProductosService);
  productos = signal<Productos[]>([]);

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
ngOnInit(): void {
    this.productService.productos()
    .subscribe((response) =>{
      this.productos.set(Array.isArray(response) ? response : [response])
      console.log(this.productos())
    },
    (error) => {alert('Error al cargar productos')}
  )
}
  // Método para enviar el formulario
  guardarProducto() {
    if (this.productoForm().valid) {
      const productoData = this.productoForm().value;
      this.productService.nuevoProducto(productoData)
      .subscribe((response) =>{
        alert(`Producto registrado con éxito`);
      },
      (error) =>{
      alert(`Error al registrar el producto: ${error}`);
    })   
  }
  
  };
  
}
