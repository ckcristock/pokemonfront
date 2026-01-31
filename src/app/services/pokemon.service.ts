import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonResponse {
  count: number;
  results: Array<{ name: string; url: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  private allPokemonsCache = signal<Pokemon[]>([]);
  readonly pokemons = signal<Pokemon[]>([]);
  readonly totalCount = signal<number>(0);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadAllPokemons() {
    // Only load once
    if (this.allPokemonsCache().length > 0) {
      return of(this.allPokemonsCache());
    }

    this.loading.set(true);
    this.error.set(null);

    // Load first 1000 Pokémon
    return this.http.get<PokemonResponse>(`${this.baseUrl}/pokemon?limit=1000&offset=0`).pipe(
      map((response) => {
        const pokemons = response.results.map((pokemon, index) => {
          const id = index + 1;
          return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });
        return pokemons;
      }),
      tap((pokemons) => {
        this.allPokemonsCache.set(pokemons);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.error.set('Error loading Pokémon. Please try again.');
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
}
