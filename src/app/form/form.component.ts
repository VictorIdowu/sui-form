//

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCountriesService } from '../get-countries.service';
import { SuccessService } from '../success.service';
import { FormsModule } from '@angular/forms';
import { NgxSemanticModule } from 'ngx-semantic';

export type data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | string;
  country: string;
  occupation: string;
  success: boolean;
};

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSemanticModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  countries = [{ text: 'Nigeria', value: 'Nigeria' }];

  inputData: data = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    occupation: 'Frontend Developer',
    success: true,
  };

  occupations = [
    { text: 'Frontend Developer', value: 'Frontend Developer' },
    { text: 'Backend Developer', value: 'Backend Developer' },
    { text: 'Designer', value: 'Designer' },
    { text: 'Devops Engineer', value: 'Devops Engineer' },
  ];

  inputsVerified = '';

  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  verifyInputs() {
    return this.inputData.firstName === ''
      ? 'Please enter First name'
      : this.inputData.lastName === ''
      ? 'Please enter Last name'
      : !this.emailRegex.test(this.inputData.email)
      ? 'Please enter valid email address'
      : this.inputData.phone === ''
      ? 'Please enter Phone number'
      : '';
  }

  constructor(
    private countryService: GetCountriesService,
    private success: SuccessService
  ) {}

  ngOnInit() {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        const sortedData = data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
        // console.log(sortedData);
        this.countries = sortedData.map((country) => {
          return { text: country.name.common, value: country.name.common };
        });
      },
      error: (err) => console.error('Subscription error:', err),
    });
  }

  handleSubmit() {
    const status = this.verifyInputs();

    if (status !== '') {
      this.inputsVerified = status;
      return;
    }

    // console.log(this.inputData);
    this.success.toastNdRout(this.inputData);
  }

  toggleRadio(val: boolean) {
    this.inputData['success'] = val;
  }
}
