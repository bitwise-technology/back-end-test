<?php

namespace App\Model;

use Exception;

class User extends Person
{

    const SESSION = 'User';
    const LOGIN_ERROR = 'User_error';
    const REGISTER_ERROR = 'User_error';

    /**
     * @var Int
     */
    private $iduser;
    /**
     * @var String
     */
    private $login;
    /**
     * @var String
     */
    private $password;
    /**
     * @var int
     */
    private $admin;
    /**
     * @var String
     */
    private $dtregister;

    /**
     * setValues
     * 
     * Seta os valores no objeto instanciado.
     * @param array $data
     * @return void
     */
    public function setValues(array $data):void
    {
        foreach ($data as $key => $value) {
            $key = ucfirst($key);

            // Invoca as funções de forma dinâmica
            $this->{"set$key"}($value);

        }
    }

    /**
     * getValues
     * 
     * Retorna um array com os valores do objeto.
     * @return array
     */
    public function getValues():array
    {
        return [
            'iduser'    => $this->iduser,
            'idperson'  => $this->idperson,
            'name'      => $this->name,
            'lastName'  => $this->lastName,
            'login'     => $this->login,
            'email'     => $this->email
        ];
    }

    /*===================================================================================
                                ERRORS
    =====================================================================================*/

    /**
     * setMsgError
     * Seta uma mensagem de erro relacionado ao LOGIN.
     *
     * @param  mixed $msgError
     * @return void
     */
    public static function setLoginError($loginError)
    {
        $_SESSION[User::LOGIN_ERROR] = $loginError;
    }
    
    /**
     * getMsgError
     * Verifica se teve algum erro vinculado ao LOGIN e o retorna.
     *
     * @return string
     */
    public static function getLoginError():string
    {
        $msg = isset($_SESSION[User::LOGIN_ERROR]) ? $_SESSION[User::LOGIN_ERROR] : '';

        User::clearloginError();

        return $msg;
    }
    
    /**
     * clearMsgError
     * Exclui a mensagem de erro vinculado ao LOGIN.
     *
     * @return void
     */
    public static function clearLoginError():void
    {
        $_SESSION[User::LOGIN_ERROR] = NULL;
    }

    /**
     * setMsgError
     * Seta uma mensagem de erro relacionado ao REGISTER.
     *
     * @param  mixed $msgError
     * @return void
     */
    public static function setRegisterError($registerError)
    {
        $_SESSION[User::REGISTER_ERROR] = $registerError;
    }
    
    /**
     * getMsgError
     * Verifica se teve algum erro vinculado ao REGISTER e o retorna.
     *
     * @return string
     */
    public static function getRegisterError():string
    {
        $msg = isset($_SESSION[User::REGISTER_ERROR]) ? $_SESSION[User::REGISTER_ERROR] : '';

        User::clearRegisterError();

        return $msg;
    }
    
    /**
     * clearMsgError
     * Exclui a mensagem de erro vinculado ao REGISTER.
     *
     * @return void
     */
    public static function clearRegisterError():void
    {
        $_SESSION[User::REGISTER_ERROR] = NULL;
    }

    /*===================================================================================
                                GETS and SETS
    =====================================================================================*/

    /**
     * @param Int
     */
    public function setIduser(int $iduser)
    {
        $this->iduser = $iduser;
    }
    /**
     * @return Int
     */
    public function getIduser():int
    {
        return $this->iduser;
    }

    /**
     * @param String login
     */
    public function setLogin(string $login)
    {
        if ( strlen($login) < 5 || strlen($login) > 30 ) {
            throw new Exception('Digite um login com mais de 5 letras e menos que 30.');
        }
        if ( !ctype_alnum($login)) {
            throw new Exception('O login deve ser alfanumérico.');
        }
        $this->login = $login;
    }
    /**
     * @return String $this->login
     */
    public function getLogin():string
    {
        return $this->login;
    }
    /**
     * @param String password
     */
    public function setPassword(string $password)
    {
        $this->password = $password;
    }
    /**
     * @return String $this->password
     */
    public function getPassword():string
    {
        return $this->password;
    }

    /**
     * @param bool admin
     */
    public function setAdmin(bool $admin)
    {
        $this->admin = $admin;
    }
    /**
     * @return bool $this->admin
     */
    public function getAdmin():bool
    {
        return $this->admin;
    }

    /**
     * @param String
     */
    public function setDtregister(string $dtregister)
    {
        $this->dtregister = $dtregister;
    }
    /**
     * @return String
     */
    public function getDtregister():string
    {
        return $this->dtregister;
    }
}