import { Component, Inject } from '@angular/core';
import { User, UserService } from '../user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isEditing: boolean = false;
  profileForInput!: User;
  errorExists = false;
  errorText = "";
  errorNameText = "";
  errorPasswordText = "";
  errorPasswordValid = "";
  errorPhoneNumText = "";
  errorAddressText = "";
  errorAcceptanceText = "";

//konstruktor koji se poziva prilikom otvarannja profil prozora
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }

  ngOnInit(): void {
    this.profileForInput = {
      id: this.data.user.id,
      name: this.data.user.name,
      email: this.data.user.email,
      password: this.data.user.password,
      phoneNum: this.data.user.phoneNum,
      date: this.data.date,
      address: this.data.user.address
    }

    if(this.profileForInput.address == undefined){
      this.profileForInput.address ="";
    }
  }

  enableEdit() { 
    this.isEditing = !this.isEditing;
  }

  finishEditing(form: NgForm){
    this.errorExists = false;
    var namePattern = /^[A-Z][a-z]{2,15}\s[A-Z][a-z]{2,15}$/;
    var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,127}$/;
    var phoneNumPattern = /^([0-9]{3}\s?[0-9]{6,7}){1}$/;
    var addressPattern = /^[A-z,a-z,\s,0-9]{2,40}$/;

    if(form.value.oldPassword != this.data.user.password){
      this.errorExists = true;
      this.errorPasswordValid = "Wrong password";
    }
    if(!namePattern.test(this.profileForInput.name)){
      this.errorExists = true;
      this.errorNameText = "Invalid name format!";
    }else{
      this.errorNameText = "";
    }
    if(!passwordPattern.test(this.profileForInput.password)){
      this.errorExists = true;
      this.errorPasswordText = "Password must have atleast 1 number, upper case and lowwer case letter!";
    }else{
      this.errorPasswordText = "";
    }
    if(!phoneNumPattern.test(this.profileForInput.phoneNum)){
      this.errorExists = true;
      this.errorPhoneNumText = "Invalid phone number format!";
    }else{
      this.errorPhoneNumText = "";
    }
    if(this.profileForInput.address == ""){

    }
    else if(!addressPattern.test(this.profileForInput.address!)){
      this.errorExists = true;
      this.errorAddressText = "Invalid address format!";
    }else{
      this.errorAddressText = "";
    }
    if(this.errorExists){
      return;
    }

    this.data.user.name = this.profileForInput.name;
    this.data.user.password = form.value.newPassword;
    this.data.user.phoneNum = this.profileForInput.phoneNum;
    this.data.user.address = this.profileForInput.address;

    console.log(this.data.user);
    console.log(UserService.userList);
    this.isEditing = false;

  }
}
