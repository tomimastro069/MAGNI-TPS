package com.example.TP1_MAGNI.Dto;

public class LoginResponse {
    private String respuesta;
    private String mje;

    public LoginResponse(String respuesta, String mje) {
        this.respuesta = respuesta;
        this.mje = mje;
    }
    
    public String getRespuesta(){
        return this.respuesta;
    }
	public String getMje() {
        return this.mje;
    }
}
