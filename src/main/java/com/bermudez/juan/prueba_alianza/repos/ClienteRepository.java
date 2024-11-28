package com.bermudez.juan.prueba_alianza.repos;

import com.bermudez.juan.prueba_alianza.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClienteRepository extends JpaRepository<Cliente, String> {

    boolean existsBySharedKeyIgnoreCase(String sharedKey);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhoneIgnoreCase(String phone);

}
