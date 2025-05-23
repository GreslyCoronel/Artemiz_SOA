# Cambiar contraseña

En el html se crean formularios reactivos, incluyendo campos de entrada para que el usuario ingrese el correo electrónico y un boton, que al hacer click, eecuta la función resetPass(), el formulario esta vinculado a un FormGroup llamado cambiarPasswordForm, lo que permite una gestión estructurada y validación de los datos ingresados. 

En el componente .ts gestiona el formulario para restablecer la contraseña mediante correo electrónico. Utilizando un formulario reactivo (FormGroup) con un campo de correo electrónico validado. Al enviar el formulario, se ejecuta el método resetPass(), que verifica la validez del formulario, obtiene el correo electrónico y llama al servicio AuthService para enviar un correo de recuperación. Dependiendo del resultado, muestra un mensaje de éxito o error al usuario. Si el formulario no es válido, se muestra un mensaje solicitando un correo electrónico válido.
