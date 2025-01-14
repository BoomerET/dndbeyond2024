<?php
    $charID = $_GET['charID'];

    //$xmlData = @file_get_contents('https://www.dndbeyond.com/character/' . $charID . '/json');
    $xmlData = @file_get_contents('https://character-service.dndbeyond.com/character/v5/character/' . $charID);
    if($xmlData === FALSE) {
        print '{"errorCode":404,"errorMessage":"Resource Not Found"}';
    } else {
        print  $xmlData;
    }

?>

