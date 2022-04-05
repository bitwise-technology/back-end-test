<?php

namespace App\Controllers;

use App\DB\mysql\TokenDAO;
use App\DB\mysql\UserDAO;
use App\GraphQl\GitHub;
use App\Model\Token;
use App\Model\User;
use Exception;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response;

/**
 * UserControllers
 * 
 * Classe responsável por intermediar as relações com os objetos user.
 */
final class UserControllers{

    /**
     * register
     * 
     * Método que recebe via POST os valores fornecidos pelo o usuário, para 
     * salvar no banco e gerar um token.
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response $response 
     */
    public function register(Request $request, Response $response, array $args):Response
    {
        $user = new User;

        $data = (array)$request->getParsedBody();        

        // como se trata de um cadastro de usuário
        $data['admin'] = false;
        
        try {
            $user->setValues( $data );
        } catch(Exception $e) {

            return $response->withJson([
                "error" => $e->getMessage()
            ], 404);
        }

        $userDAO = new UserDAO();

        try {
            $user = $userDAO->save($user);
        } catch (Exception $e) {
            return $response->withJson([
                "error" => $e->getMessage()
            ], 404);
        }

        return $response->withJson([
            'message' => "Usuário casdastrado com sucesso!"
        ], 200);

    }

    /**
     * profile
     * 
     * Método que retorna os dados do usuário logado.
     * 
     * @param Request $request
     * @param Response $response
     * @param array $args
     * 
     * @return Response
     */
    public function profile(Request $request, Response $response, array $args):Response
    {
        $jwt = $request->getAttribute('jwt');

        $userDAO = new UserDAO();

        try {

            $user = $userDAO->getUserFromEmail($jwt['email']);

        } catch(Exception $e) {
            return $response->withJson([
                "error" => $e->getMessage()
            ], 404);
        }

        $github = new GitHub;

        try {
            $dataGit = $github->userDataByLogin($user->getLogin());
        } catch (Exception $e) {
            return $response->withJson([
                'data_git' => null, 
                'data_place' => [
                    "id"                    => $user->getIduser(),
                    "name"                  => $user->getName(),
                    "Surname"               => $user->getLastName(),
                    "email"                 => $user->getEmail(),
                    "login"                 => $user->getLogin()
                ]
            ], 200);
        }

        return $response->withJson([
            'data_git' => [
                "git_id"                => $dataGit['idgit'],
                "url_avatar"            => $dataGit['avatarUrl'],                
                "repositories_count"    => $dataGit['totalCount'],
                "repositories"          => $dataGit['repositories']
            ], 
            'data_place' => [
                "id"                    => $user->getIduser(),
                "name"                  => $user->getName(),
                "Surname"               => $user->getLastName(),
                "email"                 => $user->getEmail(),
                "login"                 => $user->getLogin()
            ]
        ], 200);
    }

    /**
     * Update
     * 
     * Recebe os valores fornecidos pelo o usuário, manda para UserDAO para que seja feito 
     * a alteração no banco.
     * 
     * @param Request $request
     * @param Response $response
     * @param array $args 
     */
    public function update(Request $request, Response $response, array $args)
    {
        $data = $request->getParsedBody();

        if( isset($data['password']))
        {
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT, ["cost" => 10]);
        }

        $jwt = $request->getAttribute('jwt');

        $userDAO = new UserDAO;

        $user = $userDAO->getUserFromEmail($jwt['email']);

        $user->setValues($data);

        try {
            
            $user = $userDAO->update($user);

        } catch (Exception $e) {
            return $response->withJson([
                'error' => $e->getMessage()
            ], 404);
        }

        return $response->withJson([
            "name" => $user->getName(),
            "lastName" => $user->getLastName(),
            "email"     => $user->getEmail(),
            "login"     => $user->getLogin(),
            "gender"    => $user->getgenderValue()
        ],200);
    }

    /**
     * logout
     * 
     * Método responsável pelo logout, excluir o usuário na sessão e o token.
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response $response
     */
    public function logout(Request $request, Response $response, array $args):Response
    {
        $jwt = $request->getAttribute('jwt');

        $tokenDAO = new TokenDAO();

        try {
            $tokenDAO->delete($jwt['sub']);
        } catch (Exception $e) {
            return $response->withJson([
                "error" => $e->getMessage()
            ], 404);
        }

        return $response->withJson([
            "message" => "Logout efetuado com sucesso"
        ], 200);
    }

    /**
     * delete
     * 
     * Recebe um usuário para excluir o registro no banco.
     * 
     * @param Request $request
     * @param Response $response
     * @param array $args 
     */
    public function delete(Request $request, Response $response, array $args):Response
    {
        $jwt = $request->getAttribute('jwt');

        $userDAO = new UserDAO;

        $user = $userDAO->getUserFromEmail($jwt['email']);

        $userDAO->delete($user);

        return $response->withJson([
            "message" => "Usuário excluido com sucesso."
        ],  200);
    }

    /**
     * getUserGit
     * 
     * Recebe um username que verifica se tem conta no Github se tiver,
     * busca na api o id, nome, email, login, avatarUrl e 10 repositórios.
     * @param Request $request
     * @param Response $response
     * @param array $args 
     */
    public function getUserGit(Request $request, Response $response, array $args):Response
    {
        $username = $request->getParsedBody()["username"];

        try {
            $user = GitHub::userDataByLogin($username);
        } catch (Exception $e) {
            return $response->withJson([
                'error' => $e->getMessage()
            ], 404);
        }

        return $response->withJson([
            "git_id"                => $user['idgit'],
            "url_avatar"            => $user['avatarUrl'],                
            "repositories_count"    => $user['totalCount'],
            "repositories"          => $user['repositories']
        ]);
    }

}