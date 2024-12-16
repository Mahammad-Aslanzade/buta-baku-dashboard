import Swal from 'sweetalert2';

const areYouSureToDelete = (confirmedFunc=()=>{}) => {
  
    Swal.fire({
      icon: "question",
      title: "Silməkdə əminsiniz ?",
      showCancelButton: true,
    }).then((result) => {
      
      if (result.isConfirmed) {
        confirmedFunc();
      }
    });
}

export default areYouSureToDelete