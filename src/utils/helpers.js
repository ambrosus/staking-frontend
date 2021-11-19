import { cssTransition, toast } from 'react-toastify';

import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

export const notificationMassage = (type, alertText) => {
  const bounce = cssTransition({
    enter: 'animate__animated animate__bounceIn',
    exit: 'animate__animated animate__bounceOut',
  });

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
};

export const collapsedReducer = (state, { type, index }) => {
  const stateCopy = [false];
  switch (type) {
    case 'toggle':
      stateCopy[index] = !stateCopy[index];
      return [...stateCopy];
    case 'hide':
      stateCopy[index] = false;
      return [...stateCopy];
    case 'show':
      stateCopy[index] = true;
      return [...stateCopy];
    default:
      throw new Error();
  }
};

export const formatThousand = (num) => {
  // eslint-disable-next-line no-param-reassign
  num = Number(num);
  if (Math.abs(num) >= 1e9) {
    return `${Math.abs(num / 1e9).toFixed(2)}B`;
  }
  if (Math.abs(num) >= 1e6) {
    return `${Math.abs(num / 1e6).toFixed(2)}M`;
  }
  if (Math.abs(num) > 1e3) {
    return `${Math.abs(num / 1e3).toFixed(2)}K`;
  }
  return num.toFixed(2);
};
