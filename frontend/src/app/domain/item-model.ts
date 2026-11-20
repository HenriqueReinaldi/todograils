export class Item {
  constructor (
    public id: number,
    public prioridade: string,
    public categoria: string,
    public descricao: string,
    public nome: string,
    public status: string,
    public termino: any,
  ) {}
}
