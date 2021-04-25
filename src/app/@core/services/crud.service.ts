import { BaseService } from './base.service'
import { HttpClient } from '@angular/common/http'
import { SessionService } from './session.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CrudServiceInterface } from '../interfaces/crud-service.interface'
import { FilterModel } from '../models/filter.model'

export class CrudService<T> extends BaseService implements CrudServiceInterface<T>{

  currentPage: number = 0
  totalPageCount: number = 0
  itemsPerPage: number = 15
  constructor(
    private urlEndpoint: string,
    httpClient: HttpClient,
    session: SessionService
  ) {
    super(httpClient, session)
  }

  $all(filter: FilterModel = null, page = null, sort = null, limit = this.itemsPerPage): Observable<T[]> {

    let endpoint = this.urlEndpoint + '?'

    if (filter != null) {
      if (filter.relationship.length > 0) {
        endpoint += `join=${filter.relationship.toString()}&`
      }

      if (filter.filters.length > 0) {
        filter.filters.forEach(field => {
          endpoint += `filter=${field.name}||${field.condition}||${field.value}&`
        })
      }
    }

    if(sort != null) {
      endpoint += `sort=${sort}&`
    }

    if (page != null && typeof (page) === 'number') {
      endpoint += `page=${page}&limit=${limit}`
    }
    
    return this.$get(endpoint).pipe(
      map(res => {
        if (res.hasOwnProperty('data')) {
          this.currentPage = res['page']
          this.totalPageCount = res['pageCount']
          return res['data'] as T[]
        }
        return res as T[]
      })
    )
  }

  create(item: T) {
    return this.$post(this.urlEndpoint, item).pipe(
      map(res => res as T)
    )
  }

  get(uuid: string, filter: FilterModel = null) {
    let endpoint = this.urlEndpoint + '?'
    if (filter != null) {
      if (filter.relationship.length > 0) {
        endpoint += `join=${filter.relationship.toString()}&`
      }

      if (filter.filters.length > 0) {
        filter.filters.forEach(field => {
          endpoint += `filter=${field.name}||${field.condition}||${field.value}&`
        })
      }
    }
    return this.$get(`${endpoint}/${uuid}`).pipe(
      map(res => res as T)
    )
  }

  update(uuid: string, item: T) {
    return this.$post(`${this.urlEndpoint}/update/${uuid}`, item).pipe(
      map(res => res as T)
    )

  }

  delete(uuid: string) {
    return this.$delete(`${this.urlEndpoint}/${uuid}`)
  }
}