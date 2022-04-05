<?php

namespace App\DB\mysql;

use PDO;

abstract class Conect
{
    /**
     * @var PDO
     */
    protected $pdo;
    /**
     * @var Statement
     */
    private $stmt;

    protected function __construct()
    {
        $conf = "mysql:" .
                "host=" . getenv('HOST') . 
                ";post=" . getenv('PORT') .
                ";dbname=".getenv('DBNAME');
        

        $this->pdo = new PDO($conf, getenv('USER'), getenv('PASS'));

        // Retorna os erros
        $this->pdo->setAttribute(
            \PDO::ATTR_ERRMODE,
            \PDO::ERRMODE_EXCEPTION
        );
    }
    
    /**
     * <b>query:</b>
     * Método que envia comando sem retorno para o banco de dados.
     * 
     *  @param string $reawQuery = a query que será preparada para enviar para o banco.
     *  @param array $params = os parâmetros da query.
     */
    protected function query($rawQuery, $params = array())
    {
        $this->stmt = $this->pdo->prepare($rawQuery);

        foreach ($params as $key => $value) 
        {
            $this->stmt->bindValue($key, $value);
        }

        $this->stmt->execute();
    }

    /**
     * <b>query:</b>
     * Método que envia comando com retorno para o banco de dados.
     * 
     *  @param string $reawQuery = a query que será preparada para enviar para o banco.
     *  @param array $params = os parâmetros da query.
     *  @return array retorna a resposta do banco.
     */
    protected function select($rawQuery, $params = array()):array
    {
        $this->query($rawQuery, $params);

        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}