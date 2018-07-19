import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  funcionarios: any;

  constructor(private fService: FuncionariosService) { }

  ngOnInit() {
    this.fService.getFuncionarios().subscribe(funcs => {
      this.funcionarios = funcs;
    });
  }

}
