import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000';

  getQuestions() {
    return this.httpClient.get(`${this.baseUrl}/fragen`);
  }
}
