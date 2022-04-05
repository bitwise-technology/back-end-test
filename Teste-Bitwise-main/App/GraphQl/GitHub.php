<?php

namespace App\GraphQl;

use Exception;

/**
 * GitHubController
 * 
 * Classe responsável por meiar as interações com o api do github.
 */
class GitHub{

    private const URL = "https://api.github.com/graphql";
    /**
     * configCurl
     * 
     * Método que configura a conexão com o servidor da api do github.
     * 
     * @param json data
     * return string
     */
    private function configCurl($data)
    {
        // CONFIGURA O HEADERS DO HTTP.
        $headers = array(
            'Content-type: application/json',
            'Authorization: bearer ' . getenv('TOKEN_GITHUB'),
            'User-Agent: ' . getenv('USER_GITHUB')
        );

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, self::URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }

        return curl_exec($ch);
    }

    /**
     * query
     * 
     * Método responsável por fazer requisições query.
     */
    public static function userDataByLogin($login):array
    {
        $query = "query {
            user(login: \"$login\") {
                id,
                name,
                email,
                avatarUrl,
                repositories(first: 10) {
                    totalCount,
                    nodes {
                        id
                        name
                        url
                    }
                }
            }
        }";
        
        $data = array ('query' => $query);
        $data = json_encode($data);

        $result = self::configCurl($data);

        $json =  json_decode($result);

        if(!is_null($json->errors)){
            throw new Exception("O Login fornecido não possui conta no Github", 1);            
        }

        if($json->message === "Bad credentials"){
            throw new Exception("O token fornecido não é válido", 1);            
        }
 
        $fullName = explode(' ', $json->data->user->name);

        $lastName = '';

        foreach ($fullName as $key => $value) {
            if ($key !== 0) {
                $lastName = $lastName .' '. $value;
                continue;
            }
        }

        $data = array(
            'idgit'        => $json->data->user->id,
            'name'         => $fullName[0],
            'lastName'     => $lastName,
            'login'        => $login,
            'email'        => $json->data->user->email,
            'avatarUrl'    => $json->data->user->avatarUrl,
            'totalCount'   => $json->data->user->repositories->totalCount,
            'repositories' => $json->data->user->repositories->nodes,
        );

        return $data;
    }
}