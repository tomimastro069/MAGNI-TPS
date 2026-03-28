package com.example.TP1_MAGNI.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.TP1_MAGNI.Dto.LoginResponse;
import com.example.TP1_MAGNI.entity.Usuario;
import com.example.TP1_MAGNI.service.UsuarioService;

@RestController
@RequestMapping("/tp1")
@CrossOrigin(origins = "*")

public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/login")
    public LoginResponse login(@RequestParam String usuario, @RequestParam String clave) {
        return usuarioService.login(usuario, clave);    
    }
    
    @GetMapping("/lista")
    public Object lista(
        @RequestParam String action,
        @RequestParam(required = false) String usuario,
        @RequestParam(required = false) Long idUser,
        @RequestParam(required = false) Character estado) {
        
        if (action.equals("BUSCAR")) {
            if (usuario != null) {
                return usuarioService.buscarPorUsuario(usuario);
            }
            return usuarioService.listarTodos();
        } else if (action.equals("BLOQUEAR")) {
            return usuarioService.bloquearDesbloquear(idUser, estado);
        }
        return new LoginResponse("ERROR", "Accion no reconocida");
    }

    @PostMapping("/usuarios")

    public LoginResponse CrearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.crearUsuario(usuario);
    }
}
