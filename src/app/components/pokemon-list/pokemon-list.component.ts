import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService, Pokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
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

  readonly totalPages = computed(() => Math.ceil(this.totalCount() / this.itemsPerPage));

  readonly offset = computed(() => (this.currentPage() - 1) * this.itemsPerPage);

  constructor() {
    // Auto-search when typing - reset to page 1 when search changes
    effect(() => {
      const name = this.searchName();
      this.currentPage.set(1);
    });

    // Update display when page or search changes
    effect(() => {
      const page = this.currentPage();
      const search = this.searchName();
      const offset = (page - 1) * this.itemsPerPage;
      this.pokemonService.searchAndDisplay(search, this.itemsPerPage, offset);
    });
  }

  ngOnInit() {
    // Load all Pokémon first
    this.pokemonService.loadAllPokemons().subscribe();
  }

  clearSearch() {
    this.searchName.set('');
  }

  refresh() {
    this.pokemonService.refreshData().subscribe();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    // Use a placeholder Pokéball image when image fails to load
    img.src =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    img.style.transform = 'scale(1.5)';
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
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
