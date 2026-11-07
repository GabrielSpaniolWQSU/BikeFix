import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
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
  private route = inject(Router);
  private router = inject(Router); 

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  sucessMessage = '';
  errorMessage = '';
  form = this.fb.nonNullable.group({
    categoria: ['', [Validators.required, Validators.minLength(3)]],
    titulo: ['', [Validators.required, Validators.minLength(15)]],
    icone: ['', [Validators.required,]],
    cor: ['', [Validators.required,]],
    resumo: [''],
    descricao: ['', [Validators.required,]],
    autor: ['', [Validators.required,]],
    formato: ['', [Validators.required,]],
    acesso: ['', [Validators.required,]],
    preco: ['', [Validators.required,]],
  });
}