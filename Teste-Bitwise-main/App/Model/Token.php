<?php

namespace App\Model;

use App\DB\mysql\TokenDAO;
use DateTime;
use Firebase\JWT\JWT;

class Token{

    /**
     * @var Int
     */
    private $id;
    /**
     * @var Int
     */
    private $usuarios_id;
    /**
     * @var String
     */
    private $token;
    /**
     * @var String
     */
    private $refresh_token;
    /**
     * @var String
     */
    private $expired_at;
    /**
     * @var Bool
     */
    private $active;


    /**
     * setValues
     * 
     * Seta os valores no objeto instanciado.
     * @param array $values
     * @return void
     */
    public function setValues(array $values):void
    {
        foreach ($values as $key => $value) {
                     
            $key = ucfirst($key);

            $this->{"set$key"}($value);
        }
    }

    /**
     * createToken
     * 
     * Método que cria um token.
     * @param User $user
     * @result Token
     */
    public function CreateToken(User $user):Token
    {
        $hoje = new DateTime();

        $expired_at = $hoje->modify('+1 day')->format('Y-m-d H:i:s');

        $payLoad = [
            'sub' => $user->getIduser(),
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'expired_at' => $expired_at
        ];

        $token = JWT::encode($payLoad, getenv('JWT_SECRET'));

        $payLoad = [
            'email' => $user->getEmail(),
            // Garante que o refresh_token não gere sempre o mesmo token.
            'ramdom' => uniqid()
        ];

       $tokenRefresh = JWT::encode($payLoad, getenv('JWT_SECRET'));

        $this->setValues([
            'usuarios_id'   => $user->getIduser(),
            'token'         => $token,
            'refresh_token' => $tokenRefresh,
            'expired_at'    => $expired_at,
            'active'        => true
        ]);

        $tokenDAO = new TokenDAO;

        $tokenDAO->save($this);

        return $this;
    }



    
    /**
     * @return Int
     */
    public function getId():int
    {
        return $this->id;
    }
    /**
     * @param Int
     */
    public function setId(int $id)
    {
        $this->id =  $id;
    }

    /**
     * @return Int
     */
    public function getUsuarios_Id():int
    {
        return $this->usuarios_id;
    }
    /**
     * @param Int
     */
    public function setUsuarios_Id(int $usuarios_id)
    {
        $this->usuarios_id =  $usuarios_id;
    }

    /**
     * @return String
     */
    public function getToken():string
    {
        return $this->token;
    }
    /**
     * @param String
     */
    public function setToken(string $token)
    {
        $this->token =  $token;
    }

    /**
     * @return String
     */
    public function getRefresh_token():string
    {
        return $this->refresh_token;
    }
    /**
     * @param String
     */
    public function setRefresh_token(string $refresh_token)
    {
        $this->refresh_token =  $refresh_token;
    }

    /**
     * @return String
     */
    public function getExpired_at():string
    {
        return $this->expired_at;
    }
    /**
     * @param String
     */
    public function setExpired_at(string $expired_at)
    {
        $this->expired_at =  $expired_at;
    }

    /**
     * @return Bool
     */
    public function getActive():bool
    {
        return $this->active;
    }
    /**
     * @param Bool
     */
    public function setActive(bool $active)
    {
        $this->active =  $active;
    }
}