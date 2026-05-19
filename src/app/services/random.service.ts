import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRandomRequestDto, IRandomResponseDto } from '../models/random-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class Random {
  private readonly http = inject(HttpClient);
  private readonly RANDOM_URL = 'https://api.random.org/json-rpc/4/invoke';
  private readonly API_KEY = '86a61d06-773c-4c75-a122-7d4d80bf3192';

  public generateInteger(
    count: number = 10,
    min: number = 0,
    max: number = 10,
  ): Observable<IRandomResponseDto> {
    const body: IRandomRequestDto = {
      jsonrpc: '2.0',
      method: 'generateIntegers',
      id: new Date().getTime(),
      params: {
        apiKey: this.API_KEY,
        n: count,
        min: min,
        max: max,
        replacement: true,
      },
    };

    return this.http.post<IRandomResponseDto>(this.RANDOM_URL, body);
  }
}
