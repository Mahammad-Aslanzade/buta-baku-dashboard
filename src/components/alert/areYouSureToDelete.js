import Swal from 'sweetalert2';

const areYouSureToDelete = (confirmedFunc=()=>{}) => {
  
    Swal.fire({
      title: "Are you sure ?",
      showCancelButton: true,
    }).then((result) => {
      
      if (result.isConfirmed) {
        confirmedFunc();
      }
    });
}

export default areYouSureToDelete