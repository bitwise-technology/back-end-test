
> Status: Developing ⚠️

### It is a web application planned by me, where faço o CRUD do usuário, look for the dice dele no git..

## Some fields in main Model is:

+ name
+ surname
+ login
+ email
+ genre

## In addition to CRUD, I implement other features such as:

* Search Github for directory names and url.

## Technologies Used:

<table>
  <tr>
    <td>PHP</td>
    <td>Slim</td>
    <td>Composer</td>
    <td>MySql</td>
    <td>Docker-compose</td>
  </tr>
  <tr>
    <td>7.4</td>
    <td>3.*</td>
    <td>2.2.6</td>
    <td>5.7.27</td>
    <td>3.7</td>
  </tr>
</table>

## How to run the application:

1) run shell: composer install
2) create file .env (can copy from .env.example)
3) configure your database variables in .env
4) run shell: docker-compose up -d
5) criar a tabelas tb_users, tokens e tb_persons.
6) criar as procedures sp_users_save, sp_usersupdate_save e sp_users_delete.

