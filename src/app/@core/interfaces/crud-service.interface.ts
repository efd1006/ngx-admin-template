
import { Observable } from 'rxjs';
import { FilterModel } from '../models/filter.model';

export interface CrudServiceInterface<T> {
  currentPage: number
  totalPageCount: number
  itemsPerPage: number

  $all: (filter?: FilterModel, page?: number, sort?: string, limit?: number) => Observable<T[]>
  create: (item: T) => Observable<T>
  get: (uuid: string, filter?: FilterModel) => Observable<T>
  update: (uuid: string, item: T) => Observable<T>
}