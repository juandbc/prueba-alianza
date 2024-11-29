export class ClienteDTO {

  constructor(data:Partial<ClienteDTO>) {
    Object.assign(this, data);
  }

  sharedKey?: string|null;
  businessId?: string|null;
  email?: string|null;
  phone?: string|null;
  dataAdded?: string|null;

}
