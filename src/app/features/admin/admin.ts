import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BikesService } from '../../core/service/bikes.service';
import { Router } from 'express';

@Component({
  imports: [RouterLink],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {
  private BikesService = inject(BikesService);
  private Router = inject(Router);

  bikes: Bikes[] = [];    
  loading = true;
  errorMessage = "";
  sucessMessage = "";~

  loadBikes(): void {
    this.loading = true;
    this.errorMessage = "";
    this.BikesService.getAll().subscribe({
      next: (response) => {}
        this.conteudos = response;
        this.loading = false;
      error: (error) => {}
        this.errorMessage = "Erro ao carregar os conteúdos.";
        this.loading = false;
      }
  });

  ngInit(): void {
    this.loadBikes();
  }
}
