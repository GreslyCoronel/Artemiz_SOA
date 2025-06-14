# Componente de Filtrado, Búsqueda y Ordenamiento de Usuarios

Este componente permite consultar, filtrar, buscar y ordenar usuarios registrados junto con sus registros de ingreso (almacenados en Firestore).

## Funcionalidades del Módulo de Filtros

### Buscar por nombre o correo electrónico
Se utiliza un campo de texto enlazado con `[(ngModel)]` que filtra la lista de usuarios en tiempo real verificando si el texto ingresado coincide parcial o totalmente con el **nombre** o el **correo** de cada usuario.

### Filtrar por fecha específica de ingreso
A través de un campo `type="date"`, el usuario puede seleccionar una fecha.  
El sistema recorre los registros de cada usuario y compara si alguna de sus **fechas de ingreso** coincide con la **fecha seleccionada** (ignorando hora y segundos).

### Ordenar por nombre, correo electrónico o fecha
Al hacer clic en los encabezados de la tabla, se activa una función que **ordena alfabéticamente** los usuarios según el campo elegido (`nombre` o `correo`).  
El ordenamiento es **alternado** (ascendente/descendente) en cada clic.