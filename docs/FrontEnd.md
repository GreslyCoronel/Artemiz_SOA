## Descripción

### **Angular**
![Angular Logo](https://angular.io/assets/images/logos/angular/angular.svg)

**¿Qué es Angular?**  
Angular es un framework de desarrollo web de código abierto, mantenido por Google, que permite construir aplicaciones web dinámicas de una sola página (SPA). Utiliza TypeScript como lenguaje principal y proporciona herramientas como módulos, componentes, servicios y directivas para facilitar la creación de aplicaciones escalables y mantenibles.

### **Bootstrap**
![Bootstrap Logo](https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png)

**¿Qué es Bootstrap?**  
Bootstrap es una biblioteca de código abierto para el diseño de interfaces web responsivas y estilizadas. Proporciona un conjunto de estilos CSS y componentes JavaScript predefinidos, como botones, formularios, alertas y navegación, lo que facilita el desarrollo rápido de sitios web y aplicaciones modernas sin necesidad de escribir mucho CSS manualmente.
# Configuración de Angular con Bootstrap en Visual Studio Code

## 1. Instalación de Angular CLI
Si no tienes Angular CLI instalado, instálalo con el siguiente comando:

```sh
npm install -g @angular/cli
```

## 2. Creación de un nuevo proyecto Angular
Ejecuta el siguiente comando para crear un nuevo proyecto:

```sh
ng new mi-proyecto
```

Ingresa al directorio del proyecto:

```sh
cd mi-proyecto
```

## 3. Instalación de Bootstrap
Para agregar Bootstrap a tu proyecto, usa el siguiente comando:

```sh
npm install bootstrap
```

También puedes instalar Popper.js, que es necesario para algunos componentes de Bootstrap:

```sh
npm install @popperjs/core
```

## 4. Configuración de Bootstrap en Angular
Edita el archivo `angular.json` y agrega la ruta de Bootstrap en la sección de estilos:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

## 5. Uso de Bootstrap en Angular
Abre `src/app/app.component.html` y agrega algunos componentes de Bootstrap:

```html
<div class="container mt-5">
  <h1 class="text-primary">¡Hola, Angular con Bootstrap!</h1>
  <button class="btn btn-success">Click aquí</button>
</div>
```

## 6. Ejecutar la aplicación
Inicia el servidor de desarrollo con:

```sh
ng serve
```

Abre tu navegador en `http://localhost:4200` y verifica que Bootstrap esté funcionando correctamente.




