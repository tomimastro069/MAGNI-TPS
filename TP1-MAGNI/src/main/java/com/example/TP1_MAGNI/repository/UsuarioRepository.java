package com.example.TP1_MAGNI.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.example.TP1_MAGNI.entity.Usuario;
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario> findByUsuarioContaining(String usuario);
    Optional<Usuario> findByUsuarioAndClave(String usuario, String clave);
}