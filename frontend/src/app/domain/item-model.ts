export class Item {
  constructor (
    public id: number,
    public prioridade: number,
    public categoria: string,
    public descricao: string,
    public nome: string,
    public status: string,
    public termino: any,
  ) {}
}
