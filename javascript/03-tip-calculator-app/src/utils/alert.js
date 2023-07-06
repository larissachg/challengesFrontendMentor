import Toastify from 'toastify-js'


export const generateAlert = (text) => {
    Toastify({
        text,
        position: 'center',
        duration: 3000,
        gravity: 'bottom',
        style: {
            background:  "#00494d",
            fontSize: "2rem",
          },
        }).showToast();
}