<?php

namespace App\Middlewares;

use DateTime;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * DAteTimeExpired
 * 
 * Classe responsável por altenticar o acesso a uma rota.
 */
class DateTimeExpired{
    
    /**
     * Método responsável por verificar se o token fornecido ainda não expirou
     */
    public function __invoke(Request $request, Response $response, $next)
    {
        $playroad = $request->getAttribute('jwt');

        $expired = $playroad["expired_at"];

        $now = (new DateTime())->format('Y-m-d H:i:s');

        if ( strtotime($now) > strtotime($expired)) {
            return $response->withStatus(401);
        }

        $response = $next($request, $response);

        return $response;
    }
}