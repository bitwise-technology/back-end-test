<?php

namespace App\Middlewares;

use App\DB\mysql\TokenDAO;
use DateTime;
use Slim\Http\Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * DAteTimeExpired
 * 
 * Classe responsável por altenticar o acesso a uma rota.
 */
class VerifyLogin{
    
    /**
     * Método responsável por verificar se o token fornecido está salvo no banco.
     */
    public function __invoke(Request $request, Response $response, $next)
    {
        $authorization = $request->getHeaders()["HTTP_AUTHORIZATION"][0];

        $arrayAuthorization = explode(" ", $authorization, 2);

        $token = $arrayAuthorization[1];

        $tokenDao = new TokenDAO();

        if (!$tokenDao->verifyToken($token)) {
            return $response->withJson([
                'error' => "Acesso negado."
            ], 404);
        }

        $response = $next($request, $response);

        return $response;
    }
}