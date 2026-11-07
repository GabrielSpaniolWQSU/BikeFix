export interface Bikes {
  id: string;
  bicicleta: string;
  cliente: string;
  problemaRelatado: string;
  servicoRealizado: string;
  valor: number;
  situacao: 'Pendente' | 'Em andamento' | 'Concluído';
}
