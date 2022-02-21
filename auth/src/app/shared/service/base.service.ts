import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseService<T extends { id?: number }> {

  apiUrl: string = environment.apiUrl;

  entityName: string = '';

  private http!: HttpClient;

  constructor() {
    this.http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}`);
  }

}
