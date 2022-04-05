<?php

namespace App\Model;

use Exception;

/**
 * Person
 * 
 * Classe abstrata.
 */
abstract class Person{
    
    const Indefinido = 0;
    const Masculino = 1;
    const Feminino = 2;
    
    /**
     * @var Int
     */
    protected $idperson;
    /**
     * @var String
     */
    protected $name;
    /**
     * @var String
     */
    protected $lastName;
    /**
     * @var String
     */
    protected $email;
    /**
     * @var int
     */
    protected $gender;
    

    public function getgenderValue():string
    {
        switch($this->gender)
        {
            case self::Indefinido:
                return 'Indefinido';
            case self::Masculino:
                return 'Masculino';
            case self::Feminino:
                return 'Feminino';
            default:
                throw new Exception('Valor não é válido.');
        }
    }

    /**
     * @param Int
     */
    public function setIdperson(int $idperson)
    {
        $this->idperson = $idperson;
    }
    /**
     * @return Int
     */
    public function getIdperson():int
    {
        return $this->idperson;
    }
    /**
     * @param String $name
     */
    public function setName(string $name)
    {
        if ( strlen($name) < 3 || strlen($name) > 30 ) {
            throw new Exception('Digite um nome com mais de 3 letras e menos que 30.');
        }

        if( !preg_match('|^[\pL\s]+$|u', $name) ) {
            throw new Exception('O nome só pode conter letras.');
        }

        $this->name = $name;
    }
    /**
     * @return String $this->name
     */
    public function getName():string
    {
        return $this->name;
    }

    /**
     * @param String $lastName
     */
    public function setLastName(string $lastName)
    {
        if ( strlen($lastName) < 3 || strlen($lastName) > 30 ) {
            throw new Exception('Digite um sobrenome com mais de 3 letras e menos que 30.');
        }
        if( !preg_match('|^[\pL\s]+$|u', $lastName) ) {
            throw new Exception('O sobrenome só pode conter letras.');
        }
        $this->lastName = $lastName;
    }
    /**
     * @return String $this->lastName
     */
    public function getLastName():string
    {
        return $this->lastName;
    }

    /**
     * @param String $email
     */
    public function setEmail(string $email)
    {
        if( !filter_var($email, FILTER_VALIDATE_EMAIL )) {

            throw new Exception('Insira um email válido.');
        
        }

        $this->email = $email;
    }
    /**
     * @return String $this->email
     */
    public function getEmail():string
    {
        return $this->email;
    }

    /**
     * @param int $gender
     */
    public function setGender(int $gender)
    {
        $this->gender = $gender;
    }
    /**
     * @return int $this->gender
     */
    public function getGender():int
    {
        return $this->gender;
    }
}