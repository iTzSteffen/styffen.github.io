import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', redirectTo: 'quiz', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  // { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
