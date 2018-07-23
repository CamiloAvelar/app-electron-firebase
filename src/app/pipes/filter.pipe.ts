import { Pipe, PipeTransform } from '@angular/core';
import { Funcionario } from '../models/funcionario';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Funcionario[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    if(searchText.match(/^[0-9]+$/) === null){
        const filtro = items.filter( item => {
            return item.nome.toLowerCase().includes(searchText.toLocaleLowerCase());
        });
        return filtro;
    } else {
        const filtro = items.filter( item => {
            return item.matricula.includes(searchText);
        });
        return filtro;
    }
   }
}