<?php

namespace src\config;

use Tuupola\Middleware\JwtAuthentication;

/**
 * JwtAuth
 * 
 * Função que verifiva o token fornecido é válido.
 */
function JwtAuth():JwtAuthentication
{
    return new JwtAuthentication([
        "secure" => true,
        "relaxed" => ["localhost", "www.bitwise-teste.com"],
        "attribute" => "jwt",
        "secret" => getenv("JWT_SECRET")           
    ]);
}