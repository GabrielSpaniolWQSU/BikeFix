import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import type { Bikes } from '../../core/models/bikes.model';
import { BikesService } from '../../core/service/bikes.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-manutencao-bikes',
  styleUrl: './manutencao-bikes.css',
  templateUrl: './manutencao-bikes.html',
})
export class ManutencaoBikes {
  private fb = inject(FormBuilder);
  private bikesService = inject(BikesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  sucessMessage = '';
  errorMessage = '';

  form = this.fb.nonNullable.group({
    bicicleta: ['', Validators.required],
    cliente: ['', Validators.required],
    problemaRelatado: ['', Validators.required],
    servicoRealizado: [''],
    valor: [0, [Validators.required, Validators.min(0)]],
    situacao: this.fb.nonNullable.control<Bikes['situacao']>('Pendente', Validators.required),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editingId = id;
      this.loadBike(id);
    }
  }

  loadBike(id: string): void {
    this.loadingData = true;

    this.bikesService.getById(id).subscribe({
      next: (bike) => {
        if (bike) {
          this.form.patchValue({
            bicicleta: bike.bicicleta,
            cliente: bike.cliente,
            problemaRelatado: bike.problemaRelatado,
            servicoRealizado: bike.servicoRealizado,
            valor: bike.valor,
            situacao: bike.situacao,
          });
        }
        this.loadingData = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar o conteúdo.' + error.message;
        this.loadingData = false;
      },
    });
  }

  submit(): void {
    this.sucessMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.form.getRawValue();
    const bikeData = {
      bicicleta: formValue.bicicleta,
      cliente: formValue.cliente,
      problemaRelatado: formValue.problemaRelatado,
      servicoRealizado: formValue.servicoRealizado,
      valor: formValue.valor,
      situacao: formValue.situacao,
    };

    if (this.editingId !== null) {
    }
  }
}
