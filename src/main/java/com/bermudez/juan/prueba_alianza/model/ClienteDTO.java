package com.bermudez.juan.prueba_alianza.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClienteDTO {

    @Size(max = 255)
    @ClienteSharedKeyValid
    private String sharedKey;

    @NotNull
    @Size(max = 255)
    private String businessId;

    @NotNull
    @Size(max = 255)
    @ClienteEmailUnique
    private String email;

    @NotNull
    @Size(max = 255)
    @ClientePhoneUnique
    private String phone;

}
