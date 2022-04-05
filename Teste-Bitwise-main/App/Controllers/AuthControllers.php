<?php

namespace App\Controllers;

use App\DB\mysql\TokenDAO;
use App\DB\mysql\UserDAO;
use App\Model\User;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response;
use Exception;
use App\Model\Token;


class AuthControllers{

    /**
     * login
     * 
     * Método recebe por via POST os dados fornecido pelo no login, e verifica se tem algum cadastro,
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response $response
     */
    public function login(Request $request, Response $response, array $args):Response
    {
        $dataPOST = $request->getParsedBody();

        $userDAO = new UserDAO;

        $user = new User;

        try {
            
            // Verifica no banco se tem algum cadastro com o login fornecido.
            $data = $userDAO->getUserFromLogin($dataPOST['login']);
            
        } catch (Exception $e) {

            return $response->withJson([
                "error" => $e->getMessage()
            ], 404); 
        
        }

        if(!password_verify($dataPOST['password'], $data['password']))
        {
            return $response->withJson([
                "error" => "Usuário ou senha inválida."
            ], 404); 
        }

        try {
            
            $user->setValues($data);
        
        } catch (Exception $e) {
            return $response->withJson([
                'error' => $e->getMessage()
            ], 500);
        }

        $token = new Token;

        $token = $token->createToken($user);

        return $response->withJson([
            'token'         => $token->getToken(),
            'refresh_token' => $token->getRefresh_token()
        ], 200);      
    }

    /**
     * refreshToken
     * 
     * Recebe um refresh token, verifica se tem o mesmo no banco e se está ativo. Se tiver desativa e 
     * cria um novo token e retorna.
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response $response
     * 
     */
    public function refreshToken(Request $request, Response $response, array $args):Response
    {
        $authorization = $request->getHeaders()["HTTP_AUTHORIZATION"][0];

        $arrayAuthorization = explode(" ", $authorization, 2);

        $refreshToken = $arrayAuthorization[1];

        $tokenDAO = new TokenDAO;

        if(!$tokenDAO->verifyRefreshToken($refreshToken))
        {
            return $response->withStatus(401);
        }

        $email = $request->getAttribute('jwt')['email'];

        $userDAO = new UserDAO;

        $user = $userDAO->getUserFromEmail($email);

        $tokenModel = new Token;

        $tokenModel->CreateToken($user);

        return $response->withJson([
            "token" => $tokenModel->getToken(),
            "refresh_token" => $tokenModel->getRefresh_token()
        ], 200);
    }


}

?>