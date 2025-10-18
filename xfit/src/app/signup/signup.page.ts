import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonText, 
  IonImg ,
IonActionSheet, IonIcon } from '@ionic/angular/standalone';
import { Fireservice } from '../services/fireservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonIcon, IonImg, 
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonText, 
    IonActionSheet
  ],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  showActionSheet = false;

  constructor(private fb: FormBuilder, private fireService: Fireservice,private route:Router) {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      age: ['', Validators.required],
      image: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  /** Utility to check control validity */
  isInvalidOrTouchedAndDirty(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.fireService.signup(this.signupForm.value)
        .then((req) => {
          if (req.user?.uid) {
            const data = {
              ...this.signupForm.value,
               uid: req.user.uid,
            };
            
            this.fireService.saveDetails(data)
              .then(() => {
                alert(' Account created successfully!');
                this.route.navigateByUrl('/login');
              })
              .catch((err) => {
                  if (err.code === 'auth/email-already-in-use') {
                    console.error('Email is already registered.');
                    alert(' This email is already registered. Please use a different email.');
                  } else {
                    console.error('Error saving user details:', err);
                    alert(' Failed to save user details.');
                  }
              });
          }
        })
        .catch((error) => {
          console.error('Signup error:', error);
          alert(' Failed to sign up: ' + error.message);
        });
    } else {
      this.signupForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
    }
  }


 
  //  open the ActionSheet
  openActionSheet() {
    this.showActionSheet = true;
  }

  buttons = [
    { text: '📷 Take Photo', handler: () => this.pickImage(CameraSource.Camera) },
    { text: '🖼️ Choose from Gallery', handler: () => this.pickImage(CameraSource.Photos) },
    { text: 'Cancel', role: 'cancel' }
  ]



  //  take or choose photo
  async pickImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source,
    });

    this.signupForm.patchValue({ image: image.dataUrl });
    this.showActionSheet = false; 
  }
  

  /** Clear the selected image from the form */
clearImage() {
  this.signupForm.patchValue({ image: '' });
}


  // Getters 
  get fullnameControl() { return this.signupForm.get('fullname'); }
  get ageControl() { return this.signupForm.get('age'); }
  get emailControl() { return this.signupForm.get('email'); }
  get passwordControl() { return this.signupForm.get('password'); }
  get imageControl() { return this.signupForm.get('image'); }
}
