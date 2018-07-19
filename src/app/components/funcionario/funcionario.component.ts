import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/funcionario';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  id: string;
  private sub: any;
  funcionario: Funcionario;

  constructor(private route: ActivatedRoute, private fService: FuncionariosService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

      this.fService.getFuncionarioById(this.id).subscribe(funcionario => {
        this.funcionario = funcionario;
      });
    });
  }

}
