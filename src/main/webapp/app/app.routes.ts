import { Routes } from '@angular/router';
import { ClienteListComponent } from './cliente/cliente-list.component';
import { ClienteAddComponent } from './cliente/cliente-add.component';
import { ClienteEditComponent } from './cliente/cliente-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent,
    title: $localize`:@@home.index.headline:Prueba técnica Alianza`
  },
  {
    path: 'clientes',
    component: ClienteListComponent,
    title: $localize`:@@cliente.list.headline:Clientes`
  },
  {
    path: 'clientes/add',
    component: ClienteAddComponent,
    title: $localize`:@@cliente.add.headline:Add Cliente`
  },
  {
    path: 'clientes/edit/:sharedKey',
    component: ClienteEditComponent,
    title: $localize`:@@cliente.edit.headline:Edit Cliente`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
