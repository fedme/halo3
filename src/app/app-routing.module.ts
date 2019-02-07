import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App routes
const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'videos', loadChildren: './videos/videos.module#VideosPageModule' },
  { path: 'initial-check', loadChildren: './initial-check/initial-check.module#InitialCheckPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'explanation', loadChildren: './explanation/explanation.module#ExplanationPageModule' },
  { path: 'final-check', loadChildren: './final-check/final-check.module#FinalCheckPageModule' },
  { path: 'second-test', loadChildren: './second-test/second-test.module#SecondTestPageModule' },
  { path: 'end', loadChildren: './end/end.module#EndPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
