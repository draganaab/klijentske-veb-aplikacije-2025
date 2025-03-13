import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
// promenjive za greske (da li greska postoji)  
  errorExists = false;
  errorText = "";
  errorNameText = "";
  errorEmailText = "";
  errorPasswordText = "";
  errorPhoneNumText = "";
  errorAddressText = "";
  errorAcceptanceText = "";

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.resetErrors();

    const { name, email, password, phoneNum, address, acceptance } = form.value;

    // Regex patterns
    const namePattern = /^[A-Z][a-z]{2,15}\s[A-Z][a-z]{2,15}$/;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,127}$/;
    const phoneNumPattern = /^([0-9]{3}\s?[0-9]{6,7}){1}$/;
    const addressPattern = /^[A-z,a-z,\s,0-9]{2,40}$/;

    if (!namePattern.test(name)) {
      this.setError("errorNameText", "Invalid name format! (First Last)");
    }
    if (!emailPattern.test(email)) {
      this.setError("errorEmailText", "Invalid email format!");
    }
    if (!passwordPattern.test(password)) {
      this.setError("errorPasswordText", "Password must contain at least 1 number, 1 uppercase, and 1 lowercase letter!");
    }
    if (!phoneNumPattern.test(phoneNum)) {
      this.setError("errorPhoneNumText", "Invalid phone number format!");
    }
    if (!addressPattern.test(address)) {
      this.setError("errorAddressText", "Invalid address format!");
    }
    if (!acceptance) {
      this.setError("errorAcceptanceText", "You must accept the terms and conditions.");
    }

    if (this.errorExists) return;

    if (this.userService.getUser(email)) {
      this.setError("errorText", "User with this email already exists.");
      return;
    }

    this.userService.registerUser(name, email, password, phoneNum, address);
    console.log("New user registered:", { name, email });

    this.router.navigate(['/login']);
  }

  private resetErrors() {
    this.errorExists = false;
    this.errorText = "";
    this.errorNameText = "";
    this.errorEmailText = "";
    this.errorPasswordText = "";
    this.errorPhoneNumText = "";
    this.errorAddressText = "";
    this.errorAcceptanceText = "";
  }

  private setError(field: keyof SignupComponent, message: string) {
    this.errorExists = true;
    window.alert(message);
  }
}
