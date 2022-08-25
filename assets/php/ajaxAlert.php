<?php

        $tempInfo;
        $color = "";
        $header = "";
        $msg = '';
        if(isset($_SESSION['POST'])) {
            $tempInfo = json_decode($_SESSION['POST']);

            unset($_SESSION['POST']);

            $msg = $tempInfo->msg[0];

            //Установка заголовка
            if($tempInfo->viewMode=="delete") {
                $header = "Удаление";
            }
            else if($tempInfo->viewMode=="add") {
                $header = "Добавление";
            }
            else {
                if($msg!='') $header = "Уведомление";
                $color = "msg";
            }

            //Проверка статуса
            if($tempInfo->status=="ok") $color =  "ok";
            else if ($tempInfo->status=="delete") $color = "error";



        };
?>      
        <div aria-live="polite" aria-atomic="true" style="position: fixed; bottom: 0px;right: 0;z-index: 1000;">
            <div id="toast-alert" class="toast fade hide" data-delay="4000">
                <!-- data-autohide="false"-->
<!--                    data-delay="4000"-->
                <div class="toast-header">
                <div class="toast-circle <?php echo $color?>"></div>
<!--                        <img src="..." class="rounded mr-2" alt="...">-->
                    <strong id="toast-alert-msg" class="mr-auto"><?php echo $header;?></strong>
<!--                        <small>11 mins ago</small>-->
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div  class="toast-body"><?php echo $msg;?></div>
            </div>
        </div>