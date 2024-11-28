import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ClienteService } from 'app/cliente/cliente.service';
import { ClienteDTO } from 'app/cliente/cliente.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-cliente-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './cliente-edit.component.html'
})
export class ClienteEditComponent implements OnInit {

  clienteService = inject(ClienteService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentSharedKey?: string;

  editForm = new FormGroup({
    sharedKey: new FormControl({ value: null, disabled: true }),
    businessId: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    email: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    phone: new FormControl(null, [Validators.required, Validators.maxLength(255)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@cliente.update.success:Cliente was updated successfully.`,
      CLIENTE_EMAIL_UNIQUE: $localize`:@@Exists.cliente.email:This Email is already taken.`,
      CLIENTE_PHONE_UNIQUE: $localize`:@@Exists.cliente.phone:This Phone is already taken.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentSharedKey = this.route.snapshot.params['sharedKey'];
    this.clienteService.getCliente(this.currentSharedKey!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new ClienteDTO(this.editForm.value);
    this.clienteService.updateCliente(this.currentSharedKey!, data)
        .subscribe({
          next: () => this.router.navigate(['/clientes'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
