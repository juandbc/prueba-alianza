package com.bermudez.juan.prueba_alianza.rest;

import com.bermudez.juan.prueba_alianza.model.ClienteDTO;
import com.bermudez.juan.prueba_alianza.service.ClienteService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/clientes", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClienteResource {

    private final ClienteService clienteService;

    public ClienteResource(final ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteDTO>> getAllClientes() {
        return ResponseEntity.ok(clienteService.findAll());
    }

    @GetMapping("/{sharedKey}")
    public ResponseEntity<ClienteDTO> getCliente(
            @PathVariable(name = "sharedKey") final String sharedKey) {
        return ResponseEntity.ok(clienteService.get(sharedKey));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createCliente(@RequestBody @Valid final ClienteDTO clienteDTO) {
        final String createdSharedKey = clienteService.create(clienteDTO);
        return new ResponseEntity<>('"' + createdSharedKey + '"', HttpStatus.CREATED);
    }

    @PutMapping("/{sharedKey}")
    public ResponseEntity<String> updateCliente(
            @PathVariable(name = "sharedKey") final String sharedKey,
            @RequestBody @Valid final ClienteDTO clienteDTO) {
        clienteService.update(sharedKey, clienteDTO);
        return ResponseEntity.ok('"' + sharedKey + '"');
    }

    @DeleteMapping("/{sharedKey}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCliente(
            @PathVariable(name = "sharedKey") final String sharedKey) {
        clienteService.delete(sharedKey);
        return ResponseEntity.noContent().build();
    }

}
