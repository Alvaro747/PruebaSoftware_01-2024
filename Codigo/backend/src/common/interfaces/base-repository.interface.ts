export default interface IBaseRepository<C, U, R> {
  create(entity: C): Promise<C | null>;
  update(id: string, entity: Partial<U>): Promise<U | null>;
  delete(id: string): Promise<U | null>;
  findAll(): Promise<R[]>;
  findById(id: string): Promise<R | null>;
}
