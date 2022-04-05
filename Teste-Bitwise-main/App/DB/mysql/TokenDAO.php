<?php

namespace App\DB\mysql;

use App\Model\Token;
use Exception;

/**
 * TokenDAO
 * 
 * Classe que intermedia o a relação do token com o Banco.
 */
class TokenDAO extends Conect {

    /**
     * Faz a conexão com o banco
     */
    public function __construct()
    {
        parent::__construct();        
    }

    /**
     * save
     * 
     * Método responsável por salvar o token no banco.
     */
    public function save(Token $token):void
    {
        parent::query('INSERT INTO tokens (
            usuarios_id,
            token,
            refresh_token,
            expired_at,
            active)
        Values (
            :usuarios_id,
            :token,
            :refresh_token,
            :expired_at,
            :active)',[
                ':usuarios_id'   => $token->getUsuarios_id(),
                ':token'         => $token->getToken(),
                ':refresh_token' => $token->getRefresh_token(),
                ':expired_at'    => $token->getExpired_at(),
                ':active'        => $token->getActive()
            ]);
    }

    /**
     * delete
     * 
     * Método que exclui os tokens relacionado a esse id user.
     * @param int $iduser
     * @return void
     */
    public function delete(int $iduser):void
    {
        try {
            parent::query("DELETE FROM tokens WHERE usuarios_id = :iduser",[
                ":iduser" => $iduser
            ]);
        } catch (Exception $e) {
            throw $e;
        }

    }
    

    /**
     * verifyToken
     * 
     * Verifica se tem o token cadastrado no banco.
     * @param string $token
     * @retun bool  
     */
    public function verifyToken(string $token):bool
    {
        $result = parent::select('SELECT id FROM tokens WHERE token = :token',[
            ':token' => $token
        ]);

        if(count($result) > 0)
        {
            return true;
        }else {
            return false;
        }

    }

    /**
     * verifyToken
     * 
     * Verifica se tem o token cadastrado no banco.
     * @param string $token
     * @retun bool  
     */
    public function verifyRefreshToken(string $refresh_token):bool
    {
        try {
            parent::query('UPDATE tokens SET
                active = 0
            WHERE refresh_token = :refresh_token and active = 1',[
                ':refresh_token' => $refresh_token
            ]);
        } catch (Exception $e) {
            return false;
        }

        return true;
    }
}