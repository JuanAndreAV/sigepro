import { Component, signal } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-lot-entry-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lot-entry-form.component.html',
  styleUrl: './lot-entry-form.component.css'
})
export class LotEntryFormComponent {

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
sendForm(){
  if(this.entryForm().valid){
    console.log(this.entryForm().value);
  }
  
}

}
