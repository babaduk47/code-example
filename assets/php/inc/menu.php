<nav class="nav">
    <a href="#" class="nav__link profil" id="show__settings">Таблицы</a>

    <div class="top__menu" id="top__menu">
           <?php foreach($pages as $url=>$title):?>
       <a <?php if($url === $activePage) echo 'class="top__menu__link active"'; else echo 'class="top__menu__link"';?> href="<?php echo "./".$url;?>">
         <?php echo $title;?>
      </a>

<?php endforeach;?>
        <div class="top__menu__sep"></div>
        <a href="#" id="logout" class="top__menu__link">Выйти</a>
    </div>
</nav>
<script>
    let hamburger = document.querySelector('#show__settings');
    let menu = document.querySelector('#top__menu');
        const toggleMenu = () => {
        menu.classList.toggle('active');
            hamburger.classList.toggle('active');
    }

    hamburger.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        toggleMenu();
    });

    document.addEventListener('click', e => {
        let target = e.target;
        let its_menu = target == menu || menu.contains(target);
        let its_hamburger = target == hamburger;
        let menu_is_active = menu.classList.contains('active');

        if (!its_menu && !its_hamburger && menu_is_active) {
            toggleMenu();
        }
    });
</script>
