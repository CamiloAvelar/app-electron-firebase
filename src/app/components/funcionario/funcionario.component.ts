import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/funcionario';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  id: string;
  private sub: any;
  funcionario: Funcionario;
  edit: boolean = false;

  constructor(private route: ActivatedRoute, private fService: FuncionariosService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

      this.fService.getFuncionarioById(this.id).subscribe(funcionario => {
        this.funcionario = funcionario;
        if(funcionario) this.funcionario.id = this.id;
      });
    });
  }

  onSubmit(){
    this.fService.updateFuncionario(this.funcionario);
    this.flashMessage.show('Funcionário atualizado com sucesso!', {
      cssClass: 'green darken-2 center-align',
      timeout: 4000
    });
    this.edit = false;
  }

  onDeleteClick() {
    if(confirm('Tem certeza?')) {
      this.fService.deleteFuncionario(this.funcionario);
      this.flashMessage.show('Funcionário deletado!', {
        cssClass: 'deep-orange accent-3 center-align',
        timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
