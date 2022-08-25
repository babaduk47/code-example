<?php
    function load_cls_code($className){
        include "C:/LocalServer/XAMPP/htdocs/vlados/diplom/assets/php/classes/".$className.".php";
    }

    spl_autoload_register("load_cls_code");
