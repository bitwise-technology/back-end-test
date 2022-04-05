<?php

namespace App\DB\mysql;

use App\Model\User;
use Exception;

/**
 * TokenDAO
 * 
 * Classe que intermedia o a relação dos objetos User com o Banco.
 */
class UserDAO extends Conect {

    /**
     * Faz a conexão com o banco.
     */
    public function __construct()
    {
        parent::__construct();        
    }

    /**
     * registerUSer
     * 
     * Método que salva o um novo usuário no banco
     * @param User $user
     * @return User $user
     */
    public function save(User $user):?User
    {
        try{
            $result = parent::select('CALL sp_users_save(
                :name,
                :lastName,
                :login,
                :password,
                :email,
                :gender,
                :admin)',
                [
                    ':name'         => $user->getName(),
                    ':lastName'     => $user->getLastName(),
                    ':login'        => $user->getLogin(),
                    ':password'     => password_hash($user->getPassword(), PASSWORD_BCRYPT, ["cost" => 10]),
                    ':email'     => $user->getEmail(),
                    ':gender'       => $user->getGender(),
                    ':admin'        => (int)$user->getAdmin()
                ]
            );
        } catch (Exception $e) {

            $this->verifyError($e, $user);

            return null;
        }
        
        $user->setValues($result[0]);

        return $user;
    }

    /**
     * verifyError
     * 
     * Trata o erro devolvido pelo banco, e trata para que fique mais legível.
     * @param Exception $e
     * @param User $user
     */
    private function verifyError(Exception $e, User $user)
    {
        // SE VERIFICA O ERRO DO SQL E SALVA NA SESSION.
        if ($e->errorInfo[0] === "23000" && $e->errorInfo[1] === 1062) {
            $array = explode(" ", $e->errorInfo[2]);

            $key = $array[count($array) - 1];

            if ($key === "'email'") {

               throw new Exception('Este email já está sendo utilizado.');
            
            } else if ($key === "'login'") {

            
                throw new Exception('Este login já está sendo utilizado.');
            
            }else {
                throw new Exception($e->errorInfo[2]);
            }
        }
    }

    /**
     * registerUSer
     * 
     * Método que atualiza os dados do usuário no banco
     * @param User $user
     * @return User $user
     */
    public function update(User $user):User
    {
        try{
            $result = parent::select('CALL sp_usersupdate_save(
                :iduser,
                :name,
                :lastName,
                :login,
                :password,
                :email,
                :gender,
                :admin)',
                [
                    ':iduser'   => $user->getIduser(),
                    ':name'     => $user->getName(),
                    ':lastName' => $user->getLastName(),
                    ':login'    => $user->getLogin(),
                    ':password' => $user->getPassword(),
                    ':email'    => $user->getEmail(),
                    ':gender'   => $user->getGender(),
                    ':admin'    => (int)$user->getAdmin()
                ]
            );
        } catch (Exception $e) {

            $this->verifyError($e, $user);
        }
        
        try {
            
            $user->setValues($result[0]);

        } catch (Exception $e) {
            throw $e;
        }

        return $user;
    }

    /**
     * getUserFromLogin
     * 
     * Método que busca um usuário no banco com login fornecido.
     * @login string $login
     * @return array result
     */
    public function getUserFromLogin(string $login):?array
    {
        try {
            $result = parent::select('SELECT 
                b.idperson, b.name, b.lastName, b.email, b.gender, 
                a.iduser, a.idperson, a.login, a.password, a.admin, a.dtregister
            FROM tb_users a INNER JOIN tb_persons b
            WHERE
                a.idperson = b.idperson AND
                a.login = :login
            ', [
                ':login' => $login
            ]);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        if (count($result) == 0)
        {
            throw new Exception("Usuário ou senha inválida.");
        }

        return $result[0];

    }

    /**
     * getUserFromLogin
     * 
     * Método que busca um usuário no banco com email fornecido.
     * @login string $login
     * @return User result
     */
    public function getUserFromEmail(string $email):User
    {
        try {
            $result = parent::select('SELECT 
                b.idperson, b.name, b.lastName, b.email, b.gender, 
                a.iduser, a.idperson, a.login, a.password, a.admin, a.dtregister
            FROM tb_users a INNER JOIN tb_persons b
            WHERE
                a.idperson = b.idperson AND
                b.email = :email
            ', [
                ':email' => $email
            ]);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        if (count($result) == 0)
        {
            throw new Exception("Usuário ou senha inválida.");
        }

        $user = new User;

        try {
            
            $user->setValues($result[0]);

        } catch (Exception $e) {
            throw $e;
        }

        return $user;

    }

    public function delete(User $user):void
    {
        parent::query('CALL sp_users_delete(
            :iduser
        )',[
            ':iduser' => $user->getIduser()
        ]);
    }
}