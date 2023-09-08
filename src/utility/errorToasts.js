import { toast } from "react-toastify";
 
export const ToastError = (message) => {
  return toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};
export const ToastSuccess = (message) => {
  return toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};
export const ToastWarning = (message) => {
  return toast.warn(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};
export const ToastInfo = (message) => {
  return toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};
