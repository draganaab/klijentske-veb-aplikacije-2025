import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fix: Correct property name (was "styleUrl")
})
export class LoginComponent {
  errorExists: boolean = false;
  errorText: string = "";

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser = null!;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return; // Prevent submission if form is invalid

    const { email, password } = form.value;
    const user = this.userService.getUser(email);

    if (!user) {
      this.showError(`No user found with email: ${email}`);
      return;
    }

    if (!this.userService.isPasswordCorrect(email, password)) {
      this.showError("Incorrect password. Please try again.");
      return;
    }

    // Successful login
    this.errorExists = false;
    this.userService.currentUser = user;
    console.log("Logged in user:", this.userService.currentUser);
    this.router.navigate(['']); // Navigate to home page
  }

  private showError(message: string): void {
    this.errorExists = true;
    this.errorText = message;
  }
}

