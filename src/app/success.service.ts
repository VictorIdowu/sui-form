import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { data } from './form/form.component';
import 'ngx-toastr/toastr';

@Injectable({
  providedIn: 'root',
})
export class SuccessService {
  constructor(private toastr: ToastrService, private router: Router) {}

  toastNdRout(user: data) {
    if (user.success) {
      this.toastr.success('Form submitted successfully!', 'Success');
      this.router.navigate(['/success']);
    } else {
      this.toastr.error('Form submission failed!', 'Error', { timeOut: 5000 });
      setTimeout(() => {
        this.router.navigate(['/form']);
      }, 5000);
    }
  }
}
