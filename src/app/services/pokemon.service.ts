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
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  
  readonly pokemons = signal<Pokemon[]>([]);
  readonly totalCount = signal<number>(0);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadPokemons(limit: number = 28, offset: number = 0) {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<PokemonResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map(response => {
          const pokemons = response.results.map((pokemon, index) => {
            const id = offset + index + 1;
            return {
              id,
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            };
          });
          return { pokemons, count: response.count };
        }),
        tap(({ pokemons, count }) => {
          this.pokemons.set(pokemons);
          this.totalCount.set(count);
          this.loading.set(false);
        }),
        catchError(err => {
          this.error.set('Error loading Pokémon. Please try again.');
          this.loading.set(false);
          console.error('Error loading Pokémon:', err);
          return of({ pokemons: [], count: 0 });
        })
      );
  }

  searchPokemonByName(name: string) {
    if (!name.trim()) {
      return of(null);
    }

    this.loading.set(true);
    this.error.set(null);

    return this.http.get<any>(`${this.baseUrl}/pokemon/${name.toLowerCase()}`)
      .pipe(
        map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default
        })),
        tap(pokemon => {
          this.pokemons.set([pokemon]);
          this.totalCount.set(1);
          this.loading.set(false);
        }),
        catchError(err => {
          this.error.set('Pokémon not found. Please try another name.');
          this.loading.set(false);
          this.pokemons.set([]);
          this.totalCount.set(0);
          console.error('Error searching Pokémon:', err);
          return of(null);
        })
      );
  }
}
