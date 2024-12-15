import Swal from "sweetalert2";

const showChangesSaved =()=>{
    Swal.fire({
        icon: "success",
        text: "Changes are saved !!!",
      })
}

export default showChangesSaved;