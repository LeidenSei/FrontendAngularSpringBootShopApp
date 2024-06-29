import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // Alert
  showAlert(text: any, icon: any) {
    Swal.fire({
      title: 'SweetAlert!',
      text: text,
      icon: icon,
      confirmButtonText: 'Cool'
    });
  }

  // Confirm Alert
  confirmAlert() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  // Alert Aside
  showAlerAside(text: any, icon: any) {
    Swal.fire({
      position: "top-end",
      icon: icon,
      title: text,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
