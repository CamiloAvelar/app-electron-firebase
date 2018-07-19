import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/Funcionario';

@Component({
  selector: 'app-search-funcionario',
  templateUrl: './search-funcionario.component.html',
  styleUrls: ['./search-funcionario.component.css']
})
export class SearchFuncionarioComponent implements OnInit {

  search: any;
  funcionario: Funcionario[];

  constructor(private fService: FuncionariosService) { }

  ngOnInit() {
  }

  searchFuncionario(){
    if(this.search.match(/^[0-9]+$/) === null){
    this.fService.getFuncionarioByName(this.search).subscribe(funcionario => {
      this.funcionario = funcionario;
    })
    }else{
      this.fService.getFuncionarioByMatricula(this.search).subscribe(funcionario => {
        this.funcionario = funcionario;
      })
    }
  }

}
