import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ClienteService } from 'app/cliente/cliente.service';
import { ClienteDTO } from 'app/cliente/cliente.model';


@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './cliente-list.component.html'})
export class ClienteListComponent implements OnInit, OnDestroy {

  clienteService = inject(ClienteService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  clientes?: ClienteDTO[];
  navigationSubscription?: Subscription;

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }

  loadData() {
    this.clienteService.getAllClientes()
        .subscribe({
          next: (data) => this.clientes = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }
}
