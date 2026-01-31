import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDTO {
  name: string;
  url: string;
}

export interface PaginatedResponse {
  total: number;
  limit: number;
  offset: number;
  data: PokemonDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private allPokemonsCache = signal<Pokemon[]>([]);
  readonly pokemons = signal<Pokemon[]>([]);
  readonly totalCount = signal<number>(0);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  private extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\/?$/);
    return matches ? parseInt(matches[1], 10) : 0;
  }

  loadAllPokemons() {
    // Only load once
    if (this.allPokemonsCache().length > 0) {
      return of(this.allPokemonsCache());
    }

    this.loading.set(true);
    this.error.set(null);

    // Load all Pokémon in batches of 100 (backend limit)
    const batchSize = 100;
    const totalToLoad = 1000; // Load first 1000 Pokémon
    const requests = [];

    for (let offset = 0; offset < totalToLoad; offset += batchSize) {
      requests.push(
        this.http.get<PaginatedResponse>(`${this.baseUrl}?limit=${batchSize}&offset=${offset}`),
      );
    }

    // Execute all requests in parallel using forkJoin
    return forkJoin(requests).pipe(
      map((responses) => {
        const allPokemons: Pokemon[] = [];
        responses.forEach((response) => {
          response.data.forEach((pokemon) => {
            const id = this.extractIdFromUrl(pokemon.url);
            allPokemons.push({
              id,
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            });
          });
        });
        return allPokemons;
      }),
      tap((pokemons) => {
        this.allPokemonsCache.set(pokemons);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.error.set(
          'Cannot connect to backend. Please ensure the .NET server is running on port 5041.',
        );
        this.loading.set(false);
        console.error('Error loading Pokémon:', err);
        return of([]);
      }),
    );
  }

  loadPokemons(limit: number = 28, offset: number = 0) {
    const allPokemons = this.allPokemonsCache();
    const paginatedPokemons = allPokemons.slice(offset, offset + limit);
    this.pokemons.set(paginatedPokemons);
    this.totalCount.set(allPokemons.length);
  }

  filterPokemonsByName(name: string) {
    const allPokemons = this.allPokemonsCache();

    if (!name.trim()) {
      return allPokemons;
    }

    const searchTerm = name.toLowerCase().trim();
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm),
    );

    return filtered;
  }

  searchAndDisplay(name: string, limit: number = 28, offset: number = 0) {
    const filtered = this.filterPokemonsByName(name);
    const paginated = filtered.slice(offset, offset + limit);

    this.pokemons.set(paginated);
    this.totalCount.set(filtered.length);

    if (filtered.length === 0 && name.trim()) {
      this.error.set('No Pokémon found matching your search.');
    } else {
      this.error.set(null);
    }
  }

  refreshData() {
    this.allPokemonsCache.set([]);
    this.error.set(null);
    return this.loadAllPokemons();
  }
}
