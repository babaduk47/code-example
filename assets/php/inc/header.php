<header class="header">
    <div class="container menu">
       <div class="logo">
            <a href="./" class="cms">STOP-AR</a>
        </div>
        <?php if( $UserSession->isLogged() )
            include 'menu.php';
        ?>
    </div>
</header>

