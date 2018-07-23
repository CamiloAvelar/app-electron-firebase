import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/Funcionario';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.css']
})
export class AddFuncionarioComponent implements OnInit {
  funcionario: Funcionario = {
    admissao:'',
    cargo:'',
    cpf:'',
    email:'',
    endereco:{
      logradouro:'',
      numero:'',
      apto:'',
      bairro:'',
      cidade:'Ponte Nova',
      estado:'Minas Gerais',
      pais:'Brasil'
    },
    matricula:'',
    nascimento:'',
    nome:'',
    telefone:''
  };

  constructor(private fService: FuncionariosService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.funcionario.nome != ''){
      this.fService.addFuncionario(this.funcionario);
      this.flashMessage.show('Funcionário cadastrado!', {
        cssClass: 'teal accent-3 center-align',
        timeout: 4000
      });
      this.limpaForm();
    }
  }

  limpaForm(){
    this.funcionario = {
      admissao:'',
      cargo:'',
      cpf:'',
      email:'',
      endereco:{
        logradouro:'',
        numero:'',
        apto:'',
        bairro:'',
        cidade:'Ponte Nova',
        estado:'Minas Gerais',
        pais:'Brasil'
      },
      matricula:'',
      nascimento:'',
      nome:'',
      telefone:''
    };
  }

}
