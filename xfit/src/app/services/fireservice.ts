import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Fireservice {
  constructor(private auth: Auth, private firestore: Firestore) {}

  loginWithEmail(data: LoginRequest) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password);
  }

  signup(data: LoginRequest) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password);
  }  

 async saveDetails(data: any): Promise<void> {
  if (!data?.uid) {
    throw new Error('Missing UID in user data');
  }

  try {
    const ref = doc(this.firestore, `users/${data.uid}`);

    // Merge mode → keeps old data and updates new fields safely
    await setDoc(ref, data, { merge: true });

    console.log(' User details saved successfully:', data.uid);
  } catch (error) {
    console.error('Error saving user details:', error);
    throw error; // rethrow to handle it in the component
  }
}


  getDetails(uid: string) {
    const ref = doc(this.firestore, `users/${uid}`);
    return getDoc(ref);
  }

async getUserData(uid: string): Promise<any | null> {
  try {
    const ref = doc(this.firestore, `users/${uid}`);
    const docSnap = await getDoc(ref);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

}
