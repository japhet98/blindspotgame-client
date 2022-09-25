
import { toast, } from 'react-toastify';
const closeTime = 3000;
export const SuccessToast=(message:string)=>{
    return toast.success(message, {
        position: "top-right",
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}

export const WarningToast=(message:string)=>{
    return toast.warning(message, {
        position: "top-right",
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
        progress: undefined,
        });
}