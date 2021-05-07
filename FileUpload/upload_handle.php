<?php
    $file = $_FILES['files'];
    $filename = $file['name'];
    $tmpname = $file['tmp_name'];
    $location = "./uploads/";
    $target = $location.basename($filename);
    if(move_uploaded_file($tmpname, $target)){
        echo "Success";
    }else{
        echo "UnSuccess";
    }
?>