import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/funcionario';
import { Atestado } from '../../models/Atestado';
import { Ferias } from '../../models/Ferias';
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
  atestados: Atestado[];
  feriasArray: Ferias[];
  feriasPremioArray: Ferias[];
  atestado: Atestado = {
    data:null,
    duracao:''
  };
  ferias: Ferias = {
    inicio:'',
    fim:''
  };
  feriasPremio: Ferias = {
    inicio:'',
    fim:''
  }
  edit: boolean = false;
  addAtestado: boolean = false;
  addFerias: boolean = false;
  addFeriasPremio: boolean = false;
  showAtestado: boolean = false;
  showFerias: boolean = false;
  showFeriasPremio: boolean = false;

  constructor(private route: ActivatedRoute, private fService: FuncionariosService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

      this.fService.getFuncionarioById(this.id).subscribe(funcionario => {
        this.funcionario = funcionario;
        if(funcionario) this.funcionario.id = this.id;
      });

      this.fService.getFuncionarioAtestados(this.id).subscribe(atestados => {
        this.atestados = atestados;
      });

      this.fService.getFuncionarioFerias(this.id).subscribe(ferias => {
        this.feriasArray = ferias;
      });

      this.fService.getFuncionarioFeriasPremio(this.id).subscribe(feriasPremio => {
        this.feriasPremioArray = feriasPremio;
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

  onAtestadoSubmit(){
    this.fService.addAtestado(this.id, this.atestado);
    this.resetForms();
    this.addAtestado = false;
    this.flashMessage.show('Atestado Adicionado!', {
      cssClass: 'green accent-3 center-align',
      timeout: 4000
    });
  }

  onFeriasSubmit(){
    this.fService.addFerias(this.id, this.ferias);
    this.resetForms();
    this.addFerias = false;
    this.flashMessage.show('Férias Adicionada!', {
      cssClass: 'green accent-3 center-align',
      timeout: 4000
    });
  }

  onFeriasPremioSubmit(){
    this.fService.addFeriasPremio(this.id, this.feriasPremio);
    this.resetForms();
    this.addFeriasPremio = false;
    this.flashMessage.show('Férias Premio Adicionada!', {
      cssClass: 'green accent-3 center-align',
      timeout: 4000
    });
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

  onDeleteAtestadoClick(atestadoId) {
    if(confirm('Tem certeza?')) {
      this.fService.deleteAtestado(this.id, atestadoId);
      this.flashMessage.show('Atestado deletado!', {
        cssClass: 'deep-orange accent-3 center-align',
        timeout: 4000
      });
    }
  }

  onDeleteFeriasClick(feriasId) {
    if(confirm('Tem certeza?')) {
      this.fService.deleteFerias(this.id, feriasId);
      this.flashMessage.show('Férias deletada!', {
        cssClass: 'deep-orange accent-3 center-align',
        timeout: 4000
      });
    }
  }

  onDeleteFeriasPremioClick(feriasPremioId) {
    if(confirm('Tem certeza?')) {
      this.fService.deleteFeriasPremio(this.id, feriasPremioId);
      this.flashMessage.show('Férias Prêmio deletada!', {
        cssClass: 'deep-orange accent-3 center-align',
        timeout: 4000
      });
    }
  }

  resetForms(){
    this.ferias = {
      inicio: '',
      fim: ''
    };
    this.feriasPremio = {
      inicio: '',
      fim: ''
    };
    this.atestado = {
      data: '',
      duracao: ''
    }
  }

}
