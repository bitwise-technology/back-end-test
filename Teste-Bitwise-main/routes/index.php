<?php

namespace routes;

use App\Controllers\UserControllers;
use App\Controllers\AuthControllers;
use App\Middlewares\DateTimeExpired;
use App\Middlewares\VerifyLogin;
use App\Model\User;
use Slim\App;

use function src\config\JwtAuth;
use function src\config\SlimConfiguration;

session_cache_limiter(false);
session_start();

$app = new App(SlimConfiguration());

//===============================================


$app->post('/login', AuthControllers::class .':login');
$app->get('/refresh-token', AuthControllers::class .':refreshToken')
->add(JwtAuth());

$app->get('/git', UserControllers::class . ':getUserGit');

$app->post('/register', UserControllers::class .':register');

//===============================================

$app->group('/user', function(App $app){

    $app->get('/profile', UserControllers::class .':profile');

    $app->put('/update', UserControllers::class .':update');

    $app->delete('/delete', UserControllers::class .':delete');

    $app->get('/logout', UserControllers::class . ':logout');

})->add(new DateTimeExpired())
->add(new VerifyLogin())
->add(JwtAuth());

//===============================================

$app->run();