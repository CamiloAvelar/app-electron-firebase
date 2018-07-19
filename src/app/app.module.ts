import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';

import { FuncionariosService } from './services/funcionarios.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddFuncionarioComponent } from './components/add-funcionario/add-funcionario.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { SearchFuncionarioComponent } from './components/search-funcionario/search-funcionario.component';

const appRoutes: Routes = [
  {path:'', redirectTo: '/procurafuncionario', pathMatch: 'full'},
  {path:'funcionarios', component: FuncionariosComponent},
  {path:'procurafuncionario', component: SearchFuncionarioComponent},
  {path:'cadastro', component: AddFuncionarioComponent},
  {path:'funcionario/:id', component: FuncionarioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosComponent,
    NavbarComponent,
    AddFuncionarioComponent,
    FuncionarioComponent,
    SearchFuncionarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FuncionariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
