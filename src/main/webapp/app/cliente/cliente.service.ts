import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ClienteDTO } from 'app/cliente/cliente.model';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/clientes';

  getAllClientes() {
    return this.http.get<ClienteDTO[]>(this.resourcePath);
  }

  getCliente(sharedKey: string) {
    return this.http.get<ClienteDTO>(this.resourcePath + '/' + sharedKey);
  }

  createCliente(clienteDTO: ClienteDTO) {
    return this.http.post<string>(this.resourcePath, clienteDTO);
  }

  updateCliente(sharedKey: string, clienteDTO: ClienteDTO) {
    return this.http.put<string>(this.resourcePath + '/' + sharedKey, clienteDTO);
  }

  deleteCliente(sharedKey: string) {
    return this.http.delete(this.resourcePath + '/' + sharedKey);
  }

}
