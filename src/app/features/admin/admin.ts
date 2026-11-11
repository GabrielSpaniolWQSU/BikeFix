import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BikesService } from '../../core/service/bikes.service';
import type { Bikes } from '../../core/models/bikes.model';

@Component({
  imports: [RouterLink],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {
  private BikesService = inject(BikesService);
  private router = inject(Router);

  bikes = signal<Bikes[]>([]);
  loading = signal(true);
  errorMessage = "";
  sucessMessage = "";

  loadBikes(): void {
    this.loading.set(true);
    this.errorMessage = "";
    this.BikesService.getAll().subscribe({
      next: (response) => {
        this.bikes.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar os conteúdos.";
        this.loading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadBikes();
  }
}
