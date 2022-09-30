
import { toast, } from 'react-toastify';
const closeTime = 2000;
export const SuccessToast=(message:string)=>{
    return toast.success(message, {
        position: "top-right",
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent:100
      
        });
}

export const WarningToast=(message:string)=>{
    return toast.warn(message, {
        position: "top-right",
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent:100
        });
}

export const ErrorToast=(message:string)=>{
    return toast.error(message, {
        position: "top-right",
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent:100
        });
}