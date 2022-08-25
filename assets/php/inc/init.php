<?php

    error_reporting(E_ALL);

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);

    define("SITE_HOST", "C:/LocalServer/XAMPP/htdocs/vlados/diplom");

    include SITE_HOST.'/assets/php/inc/inc.bd.php';

    if( !isset($_SERVER['REMOTE_ADDR']) ){
        $PHP_SELF = $_SERVER['REMOTE_ADDR'];
    }

    function cons ($str)
    {

      echo "<script>console.log('".$str."');</script>";
    }

    include SITE_HOST.'/assets/php/inc/autoloader.php';


    $DB = new MyDB();

    $UserSession = new UserSession();
    include SITE_HOST.'/assets/php/inc/page.php';


