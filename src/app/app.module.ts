import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

import { FilterPipe } from './pipes/filter.pipe';

import { FuncionariosService } from './services/funcionarios.service';
import { AuthService } from './services/auth.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AddFuncionarioComponent } from './components/add-funcionario/add-funcionario.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { SearchFuncionarioComponent } from './components/search-funcionario/search-funcionario.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  {path:'', redirectTo: '/procurafuncionario', pathMatch: 'full', canActivate:[AuthGuard]},
  {path:'procurafuncionario', component: SearchFuncionarioComponent, canActivate:[AuthGuard]},
  {path:'cadastro', component: AddFuncionarioComponent, canActivate:[AuthGuard]},
  {path:'funcionario/:id', component: FuncionarioComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: SearchFuncionarioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddFuncionarioComponent,
    FuncionarioComponent,
    SearchFuncionarioComponent,
    FilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    FuncionariosService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
