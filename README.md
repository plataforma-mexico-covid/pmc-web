# Plataforma Mexico Covid19

## Build

### Linux
`./gradlew clean build`

### Windows
`gradlew.bat clean build`

## Run Local

### Linux
`./gradlew bootRun`

### Windows
`gradlew.bat bootRun`

### Mailing

Si deseas desactivar el envio de email, en el archivo src/main/resources/application.yml, cambia la siguiente confiuracion (linea 9):

##### mailing ON
`spring.profiles.include: security, mailon`

Asegurate colocar la configuracion de tu servicio de mail (linea 50):

`mail: 
  host: smtp.gmail.com
  port: 587
  username: correo@gmail.com
  password: sadasd`
  
Si usasr google asegurate permitir acceso a applicaciones no seguras:

https://myaccount.google.com/lesssecureapps?pli=1

##### mailing OFF
`spring.profiles.include: security, mailoff`


### Swagger
http://localhost:8090/swagger-ui.html

## Pending
Para salir a prod
1. Instalar BD productiva 
2. Logging in gCloud
3. Modificar emails de notificacion
4. Agregar validaciones
    1. Palabras altisonantes (done!)
    2. Validaciones para evitar registrar ayuda muchas veces
5. Agregar test

2do Alcance
6. Feedback
