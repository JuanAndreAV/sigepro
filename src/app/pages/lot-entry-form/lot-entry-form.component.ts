import { Component, signal, inject, OnInit } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoteService } from '../../services/lote.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { ProveedoresList } from '../../interfaces/proveedores';

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
proveedores = signal<ProveedoresList[]>([]);

  entryForm = signal<FormGroup>(
    new FormGroup({
      proveedor: new FormControl('',[Validators.required]),
      producto: new FormControl('',[Validators.required]),
      peso: new FormControl('',[Validators.required, Validators.min(0)]),
      precio: new FormControl('',[Validators.required, Validators.min(1000)]),
      fecha: new FormControl('',[Validators.required]),
      factura: new FormControl(''),

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
  )
  }
  constructor(){
    //console.log(this.loteService.lotes())
    
  }
sendForm(){
  if(this.entryForm().valid){
    this.loteService.createLote(this.entryForm().value)
  }
  
  
}

}
