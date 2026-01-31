# Pokémon Frontend

Aplicación Angular para consumir la API de Pokémon desde un backend .NET.

## 🚀 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Backend .NET corriendo (PokemonBackend)

## 📝 Configuración del Puerto del Backend

El frontend está configurado para conectarse al backend en `http://localhost:5041` por defecto.

**Si tu backend corre en un puerto diferente**, edita el archivo:

`src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:TU_PUERTO_AQUI/api/pokemon',
};
```

## 🔧 Instalación

```bash
npm install
```

## ▶️ Ejecutar el Proyecto

1. **Asegúrate de que el backend .NET esté corriendo primero:**

   ```bash
   cd ruta/al/PokemonBackend
   dotnet run
   ```

   Verifica el puerto que muestra en la consola (ejemplo: `http://localhost:5041`)

2. **Inicia el frontend Angular:**

   ```bash
   npm start
   ```

3. Abre tu navegador en `http://localhost:4200`

## 🎯 Características

- ✅ Búsqueda de Pokémon en tiempo real
- ✅ Paginación (28 items por página - 4x7 grid)
- ✅ Filtrado por coincidencia parcial de nombre
- ✅ Diseño responsive
- ✅ Botón de reintento en caso de error de conexión

## 🐛 Solución de Problemas

### Error "Cannot connect to backend"

- Verifica que el backend .NET esté corriendo
- Verifica el puerto en la consola del backend
- Actualiza la URL en `src/environments/environment.ts` si el puerto es diferente
- Asegúrate de que no haya firewall bloqueando la conexión

### Puerto del backend diferente

Si al ejecutar `dotnet run` ves un puerto diferente al 5041:

```
Now listening on: http://localhost:XXXX
```

Actualiza el archivo `src/environments/environment.ts` con el puerto correcto.

---

## Development server (Angular CLI)

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
