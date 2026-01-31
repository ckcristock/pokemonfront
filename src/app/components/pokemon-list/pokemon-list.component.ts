import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService, Pokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);
  
  readonly pokemons = this.pokemonService.pokemons;
  readonly totalCount = this.pokemonService.totalCount;
  readonly loading = this.pokemonService.loading;
  readonly error = this.pokemonService.error;
  
  readonly searchName = signal('');
  readonly currentPage = signal(1);
  readonly itemsPerPage = 28; // 4 columns x 7 rows
  
  readonly totalPages = computed(() => 
    Math.ceil(this.totalCount() / this.itemsPerPage)
  );
  
  readonly offset = computed(() => 
    (this.currentPage() - 1) * this.itemsPerPage
  );

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.loadPokemons(this.itemsPerPage, this.offset()).subscribe();
  }

  onSearch() {
    const name = this.searchName().trim();
    
    if (!name) {
      this.currentPage.set(1);
      this.loadPokemons();
      return;
    }

    this.pokemonService.searchPokemonByName(name).subscribe();
  }

  clearFilters() {
    this.searchName.set('');
    this.currentPage.set(1);
    this.loadPokemons();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadPokemons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // ellipsis
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // ellipsis
        pages.push(total);
      }
    }
    
    return pages;
  }
}
