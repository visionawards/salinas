<?php
date_default_timezone_set('US/Central');
define(DS, DIRECTORY_SEPARATOR);
define(EXT, '.php');
define(VEXT, '.html');
define(ROOT, $_SERVER['DOCUMENT_ROOT']);
define(iD_ROOT , '../../' . 'iDuckling05' . '/');
define(iD_ROOT_R , '../../iDuckling05/');

require_once(iD_ROOT . 'config' . DS . 'iDConfig.php');;

define(CACHE_PATH , iD_ROOT . CACHE_DIR);
define(CACHE_FILE_EXT, 'idt');

define(DKS, '12431250');
define(SITE_ID,'roser');
define(SITE_TITLE, 'Roser');
define(SITE_SKIN, 'default');
//define(SITE_USER_SKIN, '153_user');
define(SITE_USER_SKIN, 'default');

define(HOST_URL,'http://localhost/amazon/');//HOST url
define(BASE_URL, HOST_URL . 'roser/');//Root directory of your TBT
define(ADMIN_EMAIL, 'david.qwk@gmail.com');//ADMIN Email

require_once('base.inc.php');

?>
