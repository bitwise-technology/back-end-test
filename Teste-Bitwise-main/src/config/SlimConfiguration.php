<?php

namespace src\config;

use Slim\Container;

/**
 * SlimConfiguration
 * 
 * As configurações adotadas para o Slim
 */
function SlimConfiguration():Container
{
    $configuration = [
        'settings' => [
            'displayErrorDetails' => getenv('DISPLAY_ERROR_DETAILS'),
        ],
    ];

    $c = new Container($configuration);

    return $c;
}