import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ClienteService } from 'app/cliente/cliente.service';
import { ClienteDTO } from 'app/cliente/cliente.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-cliente-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './cliente-add.component.html'
})
export class ClienteAddComponent {

  clienteService = inject(ClienteService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    sharedKey: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    businessId: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(255)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}"), Validators.maxLength(10)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@cliente.create.success:Cliente was created successfully.`,
      CLIENTE_SHARED_KEY_VALID: $localize`:@@Exists.cliente.sharedKey:This Shared Key is already taken.`,
      CLIENTE_EMAIL_UNIQUE: $localize`:@@Exists.cliente.email:This Email is already taken.`,
      CLIENTE_PHONE_UNIQUE: $localize`:@@Exists.cliente.phone:This Phone is already taken.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ClienteDTO(this.addForm.value);
    this.clienteService.createCliente(data)
        .subscribe({
          next: () => this.router.navigate(['/clientes'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
