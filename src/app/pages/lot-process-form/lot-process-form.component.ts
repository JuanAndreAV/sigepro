import { Component, signal, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoteService } from '../../services/lote.service';
import { loteResponse } from '../../interfaces/lote';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateProcesamientoDto } from '../../interfaces/procesamiento';

@Component({
  selector: 'app-lot-process-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './lot-process-form.component.html',
  styleUrl: './lot-process-form.component.css'
})
export class LotProcessFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private loteService = inject(LoteService);
  private route = inject(ActivatedRoute);

  // Estados del componente
  lote = signal<loteResponse | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Formulario reactivo
  processForm: FormGroup;

  constructor() {
    this.processForm = this.fb.group({
      mermas: this.fb.array([]),
      observaciones: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.loadLoteData();
  }

  private loadLoteData(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (isNaN(id)) {
        this.error.set('ID de lote inválido');
        return;
      }

      this.loading.set(true);
      this.error.set(null);

      this.loteService.getLoteById(id).subscribe({
        next: (response) => {
          const loteData = Array.isArray(response) ? response[0] : response;
          this.lote.set(loteData);
          this.initMermasForm(loteData.producto.mermasConfig);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Error al cargar la información del lote');
          this.loading.set(false);
          console.error('Error loading lot data:', err);
        }
      });
    });
  }

  private initMermasForm(mermasConfig: string[]): void {
    const mermasArray = this.processForm.get('mermas') as FormArray;
    mermasArray.clear();

    mermasConfig.forEach(merma => {
      mermasArray.push(this.fb.group({
        nombre: [merma],
        peso: [0, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  get mermasControls() {
    return (this.processForm.get('mermas') as FormArray).controls;
  }

  getMermaPesoControl(index: number): FormControl {
    return (this.processForm.get('mermas') as FormArray).at(index).get('peso') as FormControl;
  }

  calcularPesoNeto(): number {
    if (!this.lote()) return 0;
    
    const pesoIngreso = parseFloat(this.lote()!.pesoIngresoKg.toString());
    const totalMermas = this.processForm.value.mermas.reduce(
      (sum: number, merma: any) => sum + (parseFloat(merma.peso) || 0), 0
    );
    return pesoIngreso - totalMermas;
  }

  calcularRendimiento(): number {
    if (!this.lote()) return 0;
    
    const pesoIngreso = parseFloat(this.lote()!.pesoIngresoKg.toString());
    if (pesoIngreso === 0) return 0;
    
    const pesoNeto = this.calcularPesoNeto();
    return (pesoNeto / pesoIngreso) * 100;
  }

  onSubmit(): void {
    if (this.processForm.invalid || !this.lote()) return;

    const mermasDetalle: Record<string, number> = this.processForm.value.mermas.reduce(
    (acc: Record<string, number>, merma: { nombre: string; peso: string }) => {
    acc[merma.nombre] = parseFloat(merma.peso);
    return acc;
  },
  {}
  );
    const procesamientoData: CreateProcesamientoDto = {
      usuarioProcesoId: Number(this.lote()?.usuarioRegistro.id),
      mermasDetalle: mermasDetalle
    };

    console.log('Datos a enviar:', procesamientoData);
    
    this.loteService.procesarLote(Number(this.lote()?.id), procesamientoData)
    .subscribe({
      next: ()=>{
        alert('Proceso registrado con éxito!')
      },
      error: (error)=>{
        console.log(`Error: ${error.error}`)
      }
    })
  }
}
