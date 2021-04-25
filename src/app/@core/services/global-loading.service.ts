import { Observable, of } from "rxjs"
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class GlobalLoadingService {

  private status: boolean = false

  show() {
    this.status = true
  }

  hide() {
    this.status = false
  }

  subscribeStatus(): Observable<boolean> {
    return of(this.status)
  }
}
