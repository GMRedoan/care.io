import Swal from "sweetalert2";

export const showToast = (icon, title) => {
    return Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    });
};