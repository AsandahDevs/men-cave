import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, Account, ID } from 'appwrite';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  client!: Client;
  passwordRegistrationField!:HTMLInputElement;
  confirmPasswordField!:HTMLInputElement;
  formStatus:boolean = false;

  constructor(private router: Router){}

  ngOnInit() {
    this.client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('651180d4489413e63a66');               // Your project ID
    }

    registrationForm = new FormGroup({
      fullNames: new FormControl('',[Validators.required,Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required])
    })

    loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    });

    get loginEmail() {
      return this.loginForm.get('email');
    }

    get loginPassword() {
      return this.loginForm.get('password')
    }

    get fullNames() {
      return this.registrationForm.get('fullNames');
    }

    get email() {
      return this.registrationForm.get('email');
    }

    get password() {
      return this.registrationForm.get('password')
    }

    get confirmPassword() {
      return this.registrationForm.get('confirmPassword')
    }

    // Register User
    createNewAccount(e:Event){
      e.preventDefault()
      const createAccountButton = document.getElementById('createAccount') as HTMLButtonElement
      const serverFeedback = document.getElementById('registrationFeedback') as HTMLElement
      let passwordState = document.getElementById("feedback") as HTMLDivElement
      const emailAddress = this.email?.value?.toString() as string
      const password = this.password?.value?.toString() as string
      const fullNames = this.fullNames?.value?.toString() as string
      createAccountButton.disabled = true
      createAccountButton.innerHTML = `<p>creating new account ...<p>`

      const account = new Account(this.client); 
      account.create(
          ID.unique(),
          emailAddress,
          password,
          fullNames
      ).then(response => {
        if(response.status){
          passwordState.style.display = 'none';
          createAccountButton.innerHTML = "create a new account";
          serverFeedback.innerHTML = `<p class='text-white'>successfully registered !</p>`;
        }
      }, error => {
        passwordState.style.display = 'none';
        createAccountButton.innerHTML = "create a new account";
        serverFeedback.innerHTML = `<p class='text-white'>${error.message}</p>`;
      });
    }

    login(e:Event) {
      e.preventDefault();
      const loginButton = document.getElementById("login") as HTMLButtonElement
      const message = document.getElementById("loginFeedback") as HTMLElement
      const account = new Account(this.client);
      const userEmail = this.loginEmail?.value?.toString() as string;
      const userPassword = this.loginPassword?.value?.toString() as string;
      const userSession = account.createEmailSession(userEmail, userPassword);
      loginButton.disabled = true;
      loginButton.innerHTML = `<span>Logging in as ${userEmail}...</span>`;
      userSession.then((response) => {
        this.router.navigateByUrl('/home');
        window.location.reload();
      }, (error) => {
          loginButton.innerHTML = "login"
          message.innerHTML = `<p class='text-white'>${error.message} !</p>`;
      });
    }


    verifyPasswords(){
      this.passwordRegistrationField = document.getElementById("registerPassword") as HTMLInputElement
      this.confirmPasswordField = document.getElementById("confirmPasswordRegistration") as HTMLInputElement
      let createAccountButton = document.getElementById('createAccount') as HTMLButtonElement
      let passwordState = document.getElementById("feedback") as HTMLDivElement
      if(this.passwordRegistrationField.value === this.confirmPasswordField.value){
        createAccountButton.disabled = false
        this.formStatus = this.registrationForm.valid
        passwordState.innerHTML = `<p>*successful match !</p>`;
      }else{
        createAccountButton.disabled = true
        this.formStatus = !this.registrationForm.valid
        passwordState.innerHTML = `<p>*Passwords do not match !</p>`
      }
    }
}
