# Registro de Usuarios 

## Estructura de la colección

Se crea una **colección principal** llamada `UsuariosAuth` y dentro de cada documento de usuario se incluye una **subcolección** llamada `registros`.

### Documento de usuario (`UsuariosAuth/{firebaseUID}`)
Contiene la información básica del usuario:

```json
{
  "uid": "UID_FIREBASE",
  "nombre": "Lucas",
  "apellido": "Castro",
  "correo": "lucas.castro@gmail.com",
  "proveedor": "google",
  "imgPerf": "https://photo.url",
}

#Encriptación de Contraseñas 

## Descripción
Este módulo permite registrar usuarios autenticados (Firebase) en la base de datos MongoDB. Incluye lógica para evitar duplicados y encripta la contraseña antes de guardarla por seguridad.

## Flujo del proceso

1. Se recibe desde el frontend un objeto con:
   - `firebaseUID`
   - `nombre`
   - `apellido`
   - `email`
   - `imgPerf`
   - `proveedor`
   - `password` (solo si aplica)

2. Se valida que no falten campos obligatorios.

3. Se busca en la base de datos si ya existe un usuario con el mismo `firebaseUID`.

4. Si no existe:
    Se encripta la contraseña con **bcrypt** usando `genSalt` y `hash`.
    Se guarda el nuevo usuario con contraseña encriptada.

5. Si el usuario ya existe:
   Se devuelve directamente sin crear duplicado.

