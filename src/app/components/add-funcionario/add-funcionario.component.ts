import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/Funcionario';

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
      cidade:'',
      estado:'',
      pais:''
    },
    matricula:'',
    nascimento:'',
    nome:'',
    telefone:''
  };

  constructor(private fService: FuncionariosService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.funcionario);
    if(this.funcionario.nome != ''){
      this.fService.addFuncionario(this.funcionario);
    }
  }

}
