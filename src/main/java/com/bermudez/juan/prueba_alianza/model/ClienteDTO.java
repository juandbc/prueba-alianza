package com.bermudez.juan.prueba_alianza.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Getter
@Setter
public class ClienteDTO {

    @Size(max = 20)
    @ClienteSharedKeyValid
    private String sharedKey;

    @NotBlank
    @Size(max = 50)
    private String businessId;

    @Email
    @Size(max = 255)
    @ClienteEmailUnique
    private String email;

    @NotBlank
    @Size(max = 10)
    @ClientePhoneUnique
    private String phone;

    private OffsetDateTime dataAdded;
}
