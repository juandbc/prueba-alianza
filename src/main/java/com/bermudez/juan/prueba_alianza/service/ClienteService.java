package com.bermudez.juan.prueba_alianza.service;

import com.bermudez.juan.prueba_alianza.domain.Cliente;
import com.bermudez.juan.prueba_alianza.model.ClienteDTO;
import com.bermudez.juan.prueba_alianza.repos.ClienteRepository;
import com.bermudez.juan.prueba_alianza.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(final ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<ClienteDTO> findAll() {
        final List<Cliente> clientes = clienteRepository.findAll(Sort.by("sharedKey"));
        return clientes.stream()
                .map(cliente -> mapToDTO(cliente, new ClienteDTO()))
                .toList();
    }

    public ClienteDTO get(final String sharedKey) {
        return clienteRepository.findById(sharedKey)
                .map(cliente -> mapToDTO(cliente, new ClienteDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final ClienteDTO clienteDTO) {
        final Cliente cliente = new Cliente();
        mapToEntity(clienteDTO, cliente);
        cliente.setSharedKey(clienteDTO.getSharedKey());
        return clienteRepository.save(cliente).getSharedKey();
    }

    public void update(final String sharedKey, final ClienteDTO clienteDTO) {
        final Cliente cliente = clienteRepository.findById(sharedKey)
                .orElseThrow(NotFoundException::new);
        mapToEntity(clienteDTO, cliente);
        clienteRepository.save(cliente);
    }

    public void delete(final String sharedKey) {
        clienteRepository.deleteById(sharedKey);
    }

    private ClienteDTO mapToDTO(final Cliente cliente, final ClienteDTO clienteDTO) {
        clienteDTO.setSharedKey(cliente.getSharedKey());
        clienteDTO.setBusinessId(cliente.getBusinessId());
        clienteDTO.setEmail(cliente.getEmail());
        clienteDTO.setPhone(cliente.getPhone());
        return clienteDTO;
    }

    private Cliente mapToEntity(final ClienteDTO clienteDTO, final Cliente cliente) {
        cliente.setBusinessId(clienteDTO.getBusinessId());
        cliente.setEmail(clienteDTO.getEmail());
        cliente.setPhone(clienteDTO.getPhone());
        return cliente;
    }

    public boolean sharedKeyExists(final String sharedKey) {
        return clienteRepository.existsBySharedKeyIgnoreCase(sharedKey);
    }

    public boolean emailExists(final String email) {
        return clienteRepository.existsByEmailIgnoreCase(email);
    }

    public boolean phoneExists(final String phone) {
        return clienteRepository.existsByPhoneIgnoreCase(phone);
    }

}
