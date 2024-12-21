import axios from 'axios';
import Swal from 'sweetalert2';

let isPostRequestInProgress = false;

const axiosInstance = axios.create();

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  if (isPostRequestInProgress && config.method === 'post') {
    Swal.fire({
      icon: 'warning',
      title: 'Zəhmət olmasa gözləyin!',
      text: 'Hazırda bitməmiş proses var',
    });
    return Promise.reject(); // Prevent further processing of the blocked request.
  }

  if (config.method === 'post') {
    isPostRequestInProgress = true;
  }

  return config;
}, (error) => Promise.reject(error));

// Response Interceptor
axiosInstance.interceptors.response.use((response) => {
  if (response.config.method === 'post') {
    isPostRequestInProgress = false;
  }
  return response;
}, (error) => {
  if (error.config && error.config.method === 'post') {
    isPostRequestInProgress = false;
  }

  // Handle specific HTTP error codes
  if (error.response) {
    Swal.fire({
      icon: 'error',
      // title: 'Validation Error',
      text: error.response.data.error,
    });
    const status = error.response.status;

    // if (status === 400) {
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Xəta baş verdi',
    //     // text: 'Something went wrong!!!',
    //   });
    // }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Şəbəkə xətası!',
      text: 'Zəhmət olmasa şəbəkənizi yoxlayın!',
    });
  }

  return Promise.reject(error); // Propagate the error if needed.
});

export default axiosInstance;