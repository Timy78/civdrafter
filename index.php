<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Драфтер</title>
    <link rel="icon" type="image/png" sizes="32x32" href="assets/logo.png">
    <link href="styles/main.css" rel="stylesheet" type="text/css">
</head>
<body>
<?php
require_once 'vendor/autoload.php';
require_once '';
$loader = new \Twig\Loader\FilesystemLoader('components');
$twig = new \Twig\Environment($loader);

?>
<div id="wrapper">
    <?php
        echo $twig->render('header.twig',
            [
                'name' => 'Fabien'
            ]);
    ?>

</div>
<script type="text/javascript" src="script/draft.js"></script>
</body>
</html>
