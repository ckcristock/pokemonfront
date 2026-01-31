# Pokémon Frontend 🎮

Aplicación Angular moderna desarrollada con las últimas tecnologías para consumir la API de Pokémon desde un backend .NET.

## 📋 Descripción

Este proyecto es un frontend desarrollado en **Angular 21** que permite buscar, visualizar y explorar información de Pokémon mediante una interfaz interactiva y responsive. Se conecta a un backend .NET que a su vez consume la API pública de PokéAPI.

## 🛠️ Tecnologías Utilizadas

- **Angular 21.0** - Framework principal
- **TypeScript 5.9** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva
- **Vitest** - Framework de testing
- **Angular Standalone Components** - Arquitectura moderna sin módulos
- **Angular Signals** - Gestión de estado reactivo

## 🚀 Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** versión 18 o superior ([Descargar aquí](https://nodejs.org/))
- **npm** versión 9 o superior (viene incluido con Node.js)
- **Backend .NET** corriendo (proyecto PokemonBackend)

### Verificar versiones instaladas:

```bash
node --version
npm --version
```

## 📥 Instalación

### 1. Clonar el repositorio (si aplica):

```bash
git clone <url-del-repositorio>
cd pokemonfront
```

### 2. Instalar dependencias:

```bash
npm install
```

**Nota:** Este comando instalará todas las dependencias necesarias especificadas en el [package.json](package.json).

## ⚙️ Configuración del Backend

El frontend está configurado para conectarse al backend en `http://localhost:5041/api/pokemon` por defecto.

**Si tu backend corre en un puerto diferente:**

1. Abre el archivo [src/environments/environment.ts](src/environments/environment.ts)
2. Modifica la URL del `apiUrl`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:TU_PUERTO/api/pokemon',
};
```

## ▶️ Ejecutar el Proyecto

### Paso 1: Iniciar el Backend

**Primero, asegúrate de que el backend .NET esté corriendo:**

```bash
cd ruta/al/PokemonBackend
dotnet run
```

Deberías ver algo como:

```
Now listening on: http://localhost:5041
```

✅ **Toma nota del puerto que muestra** (puede ser diferente en tu sistema).

### Paso 2: Iniciar el Frontend

En una nueva terminal, ejecuta:

```bash
npm start
```

Este comando iniciará el servidor de desarrollo de Angular.

### Paso 3: Abrir en el Navegador

Una vez que el servidor esté listo, abre tu navegador en:

```
http://localhost:4200
```

🎉 **¡Listo! La aplicación debería estar funcionando.**

## 📦 Comandos Disponibles

| Comando         | Descripción                                                 |
| --------------- | ----------------------------------------------------------- |
| `npm start`     | Inicia el servidor de desarrollo en `http://localhost:4200` |
| `npm run build` | Compila el proyecto para producción en la carpeta `dist/`   |
| `npm test`      | Ejecuta los tests unitarios con Vitest                      |
| `npm run watch` | Compila en modo watch para desarrollo                       |

## 🎯 Características Principales

- ✅ **Búsqueda en tiempo real** - Filtra Pokémon mientras escribes
- ✅ **Paginación inteligente** - 28 items por página (grid 4x7)
- ✅ **Filtrado eficiente** - Coincidencia parcial de nombres
- ✅ **Diseño responsive** - Adaptable a móviles, tablets y desktop
- ✅ **Manejo de errores** - Botón de reintento y mensajes claros
- ✅ **Interceptores HTTP** - Manejo centralizado de errores
- ✅ **Arquitectura moderna** - Standalone components y signals
- ✅ **TypeScript estricto** - Type-safety completo

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── pokemon-list/      # Componente principal de listado
│   │   └── toolbar/            # Barra de navegación
│   ├── services/
│   │   ├── pokemon.service.ts  # Servicio HTTP para Pokémon
│   │   └── error-handler.service.ts
│   ├── interceptors/
│   │   └── error.interceptor.ts # Interceptor global de errores
│   ├── app.config.ts           # Configuración de providers
│   ├── app.routes.ts           # Definición de rutas
│   └── app.ts                  # Componente raíz
├── environments/
│   ├── environment.ts          # Variables de entorno desarrollo
│   └── environment.prod.ts     # Variables de entorno producción
└── main.ts                     # Punto de entrada de la aplicación
```

## 🐛 Solución de Problemas

### ❌ Error: "Cannot connect to backend"

**Posibles causas:**

1. El backend .NET no está corriendo
2. El puerto del backend es diferente al configurado
3. Firewall bloqueando la conexión

**Soluciones:**

```bash
# Verifica que el backend esté corriendo
cd ruta/al/PokemonBackend
dotnet run

# Verifica el puerto en la consola y actualiza environment.ts si es necesario
```

### ❌ Error: "ng: command not found"

Si el comando `npm start` falla, instala Angular CLI globalmente:

```bash
npm install -g @angular/cli
```

### ❌ Puerto 4200 ya está en uso

Si el puerto está ocupado, Angular te preguntará si quieres usar otro puerto. Acepta presionando `y`.

O especifica un puerto diferente:

```bash
ng serve --port 4300
```

### ❌ Errores de dependencias

Si hay problemas con las dependencias, limpia e reinstala:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🧪 Testing

Ejecutar los tests unitarios:

```bash
npm test
```

## 🏗️ Build para Producción

Para compilar el proyecto optimizado para producción:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

Para cambiar el endpoint del backend en producción, actualiza [src/environments/environment.prod.ts](src/environments/environment.prod.ts).

## 📝 Notas para el Evaluador

- Este proyecto usa **Angular 21** con standalone components (sin NgModules)
- Implementa **signals** para el manejo de estado reactivo
- Usa **Vitest** en lugar de Karma/Jasmine para testing
- Tiene **changeDetection: OnPush** para mejor rendimiento
- Implementa **interceptores HTTP** para manejo global de errores
- Sigue las mejores prácticas de **Angular y TypeScript**

## 🔗 Enlaces Útiles

- [Documentación de Angular](https://angular.dev/)
- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos y de evaluación.

---

**Desarrollado con Angular 21 💚**
ng generate --help

````

## Building

To build the project run:

```bash
ng build
````

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
