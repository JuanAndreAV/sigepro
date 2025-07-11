import { Component, signal, inject, OnInit } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoteService } from '../../services/lote.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { ProveedoresList } from '../../interfaces/proveedores';
import { GestionProductosService } from '../../services/gestion-productos.service';
import { Productos } from '../../interfaces/producto';
import { Lote } from '../../interfaces/lote';

@Component({
  selector: 'app-lot-entry-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lot-entry-form.component.html',
  styleUrl: './lot-entry-form.component.css'
})

export class LotEntryFormComponent implements OnInit {
loteService = inject(LoteService);
proveedoresService = inject(ProveedoresService);
productService = inject(GestionProductosService);
proveedores = signal<ProveedoresList[]>([]);
productos = signal<Productos[]>([])

  entryForm = signal<FormGroup>(
    new FormGroup({
      proveedorId: new FormControl('',[Validators.required]),
      productoId: new FormControl('',[Validators.required]),
      fechaIngreso: new FormControl('',[Validators.required]),
      pesoIngresoKg: new FormControl('',[Validators.required, Validators.min(0)]),
      precioPorKg: new FormControl('',[Validators.required, Validators.min(1000)]),
      loteProveedorRef: new FormControl(''),

    })
  );
  
  ngOnInit(): void {
    this.proveedoresService.proveedoresList()
    .subscribe((proveedores) =>{
      this.proveedores.update(()=>proveedores)
    },
    (error) =>{
      alert('Error al cargar proveedores')
    }
  );
  this.productService.productos().subscribe({
      next: (productos) => {
        // Asegurarse de que siempre sea un array
        this.productos.set(Array.isArray(productos) ? productos : [productos]);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar productos');
      }
    });
  }
  constructor(){
    //console.log(this.loteService.lotes())
    
  }
sendForm() {
  if (this.entryForm().valid) {
      const formData: Lote = {
      fechaIngreso: this.entryForm().value.fechaIngreso,
      pesoIngresoKg: parseFloat(this.entryForm().value.pesoIngresoKg),
      precioPorKg: parseFloat(this.entryForm().value.precioPorKg),
      loteProveedorRef: this.entryForm().value.loteProveedorRef || undefined,
      estado: 'Pendiente de Procesar',
      //creadoEn: new Date(),
      proveedorId: Number(this.entryForm().value.proveedorId), // Convertir a número
      productoId: Number(this.entryForm().value.productoId),   // Convertir a número
      usuarioRegistroId: 1 // Reemplaza con el ID real del usuario logueado
    };


    this.loteService.createLote(formData)
      .subscribe({
        next: (lote) => {
          alert(`Lote creado con éxito`);
          this.entryForm().reset();
        },
        error: (error) => {
          alert(`Error al crear lote: ${error.error.message || 'Error desconocido'}`);
          console.error('Error detallado:', error);
        }
      });
  }
}

}
