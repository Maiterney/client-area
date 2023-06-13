import Swal from 'sweetalert2';

type Alert = {
    title?: string,
    text?: string,
    icon?: 'error' | 'success'
}

export const AlertMessage = ({title, text, icon}:Alert) => {
    Swal.fire({
        title: title,
        html: text,
        icon: icon
    });
}