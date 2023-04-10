export interface IAlertProps {
    message: string;
    alertType: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';
}

export interface IAlert extends IAlertProps {
    visible: boolean;
}
