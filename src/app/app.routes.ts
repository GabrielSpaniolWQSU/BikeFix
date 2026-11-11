import { Routes } from '@angular/router';
import { ManutencaoBikes } from './features/manutencao-bikes/manutencao-bikes';

export const routes: Routes = [
  { path: '', component: ManutencaoBikes },
  { path: 'manutencao-bikes', component: ManutencaoBikes },
  { path: 'manutencao-bikes/:id', component: ManutencaoBikes },
];
