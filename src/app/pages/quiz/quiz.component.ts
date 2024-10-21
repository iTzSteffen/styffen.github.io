import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})
export class QuizComponent {
  constructor() {
    this.firestoreService.getQuestions().subscribe((data: any) => {
      console.log('data', data);
      this.questions = data;
    });

    this.flip = 'inactive';

    this.i = this.getRandomUniqueNumber();
    this.counter.push(this.i);
  }

  started: boolean = false;
  answer: any;
  score: any = 0;
  firestoreService = inject(FirestoreService);
  questions!: any[];
  i!: number;
  counter: number[] = [];
  flip: string = 'inactive';

  restart() {
    this.counter = [];
    this.i = this.getRandomUniqueNumber();
    this.counter.push(this.i);
  }

  toggleFlip() {
    this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
  }

  getRandomUniqueNumber(): number {
    if (this.counter.length >= 30) {
      throw new Error('All numbers have been used.');
    }

    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 30) + 1;
    } while (this.counter.includes(randomNumber));

    return randomNumber;
  }

  start() {
    this.started = true;
  }

  next() {
    console.log('next', this.i);
    console.log('counter', this.counter);
    if (this.counter.length >= 30) {
      return; // Stop if the counter array already has 30 entries
    }

    let id;
    do {
      id = Math.floor(Math.random() * 30) + 1;
    } while (this.counter.includes(id));

    this.counter.push(id);
    this.i = id; // Update this.i to the new id
    if (this.flip === 'active') {
      this.toggleFlip();
    }
  }

  again(itemId: number) {
    console.log('again', itemId);
    this.counter.splice(this.counter.indexOf(itemId), 1);
    if (this.flip === 'inactive') {
      this.toggleFlip();
    }
    this.next();
  }
}
