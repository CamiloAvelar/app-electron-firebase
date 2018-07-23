import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/Funcionario';

@Component({
  selector: 'app-search-funcionario',
  templateUrl: './search-funcionario.component.html',
  styleUrls: ['./search-funcionario.component.css']
})
export class SearchFuncionarioComponent implements OnInit {

  searchText: any;
  funcionario: Funcionario[];

  constructor(private fService: FuncionariosService) { }

  ngOnInit() {
    this.fService.getFuncionarios().subscribe(funcionario => {
      this.funcionario = funcionario;
    })
  }

}
