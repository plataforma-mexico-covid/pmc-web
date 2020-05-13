import Swal from 'sweetalert2';
import { Validators, AbstractControl } from '@angular/forms';

export class NotificationMessage {
    code: string;
    message: string;
    timestamp: string;
    level: string;
}

export const showNotification = (error: any): any => {
    const notification: NotificationMessage = new NotificationMessage();
    const err = error.error;
    if ( err.notifications ) {
        notification.code = err.notifications[0].code;
        notification.message = err.notifications[0].message;
        notification.timestamp = err.notifications[0].timestamp;
        notification.level = err.notifications[0].level;
    } else {
        notification.code = 'DESCONOCIDO';
        notification.message = 'Error desconocido';
        notification.timestamp = new Date().toISOString();
        notification.level = 'error';
    }

    Swal.fire({
        title: notification.code,
        html: '<b>' + notification.timestamp + '</b>' + ' <br/> ' + notification.message,
        icon: 'error',
        confirmButtonText: 'Entendido'
    });

    return notification;
};

export const ValidarUsername = (control: AbstractControl): any => {
    const emailErrors = Validators.email(control)
    if (!emailErrors){
      return emailErrors;
    }
    const contrasena = control.value;
    let error = null;
    const regex = new RegExp(/^\d{10}$/);
    if (!regex.test(contrasena)) {
      error = 'El username debe ser email y/o numero de telefono';
    }
    console.log(error);
    return error;
  };

export const ValidarContrasena = (control: AbstractControl): any => {
    const contrasena = control.value;
    let error = null;
    const regex = new RegExp(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#\$%^&*](?=\S+$).{7,15}$/);
    if (!regex.test(contrasena)) {
        error = 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico';
    }
    console.log(error);
    return error;
};