import { toast, cssTransition } from 'react-toastify';
import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});
export default function notificationMassage(type, alertText) {
  if (type === 'SUCCESS') {
    toast.success(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  } else if (type === 'PENDING') {
    toast.info(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  } else {
    toast.error(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  }
}
