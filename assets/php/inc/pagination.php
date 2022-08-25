 <?php
    function getStart($page,$limit){
        return $limit * ($page - 1);
    }

    function maxPage($cuser,$limit){
        $count_u = $cuser;
        $count_p = ceil($count_u / $limit);
        return $count_p;
    }

    function lastPage($page,$cuser,$limit){
        $limitPage=maxPage($cuser,$limit);
        if($page>=$limitPage){
            return $limitPage;
        }
        else return $page;
    }

    function pagination($page,$limit,$count_user,$url){
        $count_u = $count_user;

        $count_p = ceil($count_u / $limit);

        if( $page > $count_p ) $page = $count_p;
        $prev = $page - 1;
        $next = $page + 1;
        if( $prev < 1 ) $prev = 1;
        if( $next > $count_p ) $next = $count_p;
        $pagination = "";
        if($count_p > 1){
            if ($page == 1) {
                //$pagination .= "<span>Прервая </span>";
                //$pagination .= "<span>Предыдущая </span>";
            }
            else {
                $pagination .= "<a class='n__link' data-page='1' href='$url'><<</a>";
                    $pagination .= "<a class='n__link' data-page='$prev' href='?page=".$prev."'><</a>";
            }
            for ($i = 1; $i <= $count_p; $i++) {
                if ($i == $page) $pagination .= "<span class='n__link active' data-page='$i'> ".$i." </span>";
                elseif ($i == 1) $pagination .= "<a class='n__link' data-page='$i' href='$url'> ".$i." </a>";
                else $pagination .= "<a class='n__link' data-page='$i' href='$url?page=".$i."'> ".$i." </a>";
            }
            if ($page == $count_p) {
            }
            else {
                $pagination .= "<a class='n__link' data-page='$next' href='$url?page=".$next."'>></a>";
                $pagination .= "<a class='n__link' data-page='$count_p' href='$url?page=".$count_p."'>>></a>";
            }

        }
        return $pagination;
    }
