package com.example.TP1_MAGNI.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.TP1_MAGNI.Dto.LoginResponse;
import com.example.TP1_MAGNI.repository.UsuarioRepository;
import com.example.TP1_MAGNI.entity.Usuario;

@Service
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;

    
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    
    public LoginResponse login(String usuario, String clave) {
        Optional<Usuario> result = usuarioRepository.findByUsuarioAndClave(usuario, clave);
        if (result.isPresent()) {
            return new LoginResponse("OK", "Ingreso valido " + usuario); 
        } else {
            return new LoginResponse("ERROR", "Ingreso invalido "+ usuario);
        }
    }
    
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
    
    public List<Usuario> buscarPorUsuario(String usuario) {
        return usuarioRepository.findByUsuarioContaining(usuario);
    }
    
    public LoginResponse bloquearDesbloquear(Long id, char estado){
        Optional<Usuario> result = usuarioRepository.findById(id);
        if(result.isPresent()){
            Usuario user = result.get();
            user.setBloqueado(estado);
            usuarioRepository.save(user);
            return new LoginResponse("OK", "BLOQUEADO ");
        } else {    
            return new LoginResponse("ERROR", "USUARIO NO ENCONTRADO ");
        }
    }

    public LoginResponse crearUsuario(Usuario usuario) {
    try {
        usuarioRepository.save(usuario);
        return new LoginResponse("OK", "Usuario creado exitosamente");
    } catch (Exception e) {
        return new LoginResponse("ERROR", e.getMessage());
    }
}
}
