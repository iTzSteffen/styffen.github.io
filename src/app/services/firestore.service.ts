import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);

  constructor() {}

  getQuestions() {
    return collectionData(collection(this.firestore, 'questions'));
  }
}
