import React from 'react'
import Swal from 'sweetalert2'

const badRequest = (message) => {
    Swal.fire({
        title: "Bad Request !",
        text: message,
        icon: "question"
    });
}

export default badRequest