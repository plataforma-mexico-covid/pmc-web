import Swal from 'sweetalert2';
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
