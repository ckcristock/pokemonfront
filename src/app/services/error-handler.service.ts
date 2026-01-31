import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  readonly error = signal<string | null>(null);
  readonly loading = signal<boolean>(false);

  handleError(message: string): void {
    this.error.set(message);
    this.loading.set(false);
    console.error('Global Error:', message);
  }

  clearError(): void {
    this.error.set(null);
  }

  setLoading(isLoading: boolean): void {
    this.loading.set(isLoading);
  }
}
