import { Component } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, PokemonListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
