import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  }
  ,
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'main/:uid',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
  {
    path: 'program-detail/:id',
    loadComponent: () => import('./program-detail/program-detail.page').then( m => m.ProgramDetailPage)
  },
  {
    path: 'profile/:uid',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
];
