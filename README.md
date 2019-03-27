# Laravel Files Manager
> Gerenciador de arquivos com Laravel 5.8 + Vue.js 2
![Laravel](https://img.shields.io/badge/Laravel-5.6.*-orange.svg) ![Vue.js](https://img.shields.io/badge/Vue.js-2.*-green.svg) ![Laravel](https://img.shields.io/badge/Laravel-5.6.*-orange.svg) ![PHP](https://img.shields.io/badge/php->=7.0.*-blue.svg)

![](./header-demo.png)

Utilizado como base o repositório [alexusmai/laravel-file-manager](https://github.com/alexusmai/laravel-file-manager), somente foi feito pequenas alterações no Front End (Vuejs) para uso pessoal. Essa implentação é de uso direto do gerenciador de arquivos, para implementar a parte em seu sistema utilize o repositório do alexusmai para integrar ao seu sistema.

## Instalação

```sh
# Dependencias do laravel
composer install 

# Linux
cp .env.example .env
# Windows
copy .env.example .env

# Dependencias do Vue.js
npm install

# Testes
php artisan serve 
```

## Formas de uso
Em `resources/js/app.js` na linha 26 se alterar o caminho para pegar da pasta `node_modules` será utilizado o Front End original do repositório.

```js
// linha 26
import FileManager from './laravel-file-manager' 
// alterar para 
import FileManager from 'laravel-file-manager' 
```