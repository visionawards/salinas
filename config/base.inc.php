<?php

define(CACHE_INC_PATH, CACHE_PATH . SITE_ID . DS . 'inc' . DS);
define(CACHE_INC_FILE_EXT, 'inc');
define(MODU, BASE_URL . '?u=');
define(JQMODU, BASE_URL . '?u=jq|');
define(IMAGE, 'images' . '/');
define(DKP, '6511140');
define(LAYOUT_ROOT, 'layout');
define(MODULE_ROOT, 'modules');
define(MODULE_VIEW_ROOT, 'view');
define(MODULE_SKIN_PATH, MODULE_VIEW_ROOT . DS . 'skin' . DS);
define(CONTROLLER_ROOT, 'controller');
define(MODEL_ROOT, 'model');
define(MODEL_PREFIX,"M"); 
        
//define(LAYOUT_PATH, LAYOUT_ROOT . DS . SITE_SKIN . DS);
define(JS_PATH, 'js');
define(CSS_PATH, 'css');
define(DATA_PATH, 'data' . DS);
define(FONT_PATH, 'font' . DS);
define(TEMP_PATH, DATA_PATH . 'temp' . DS);
define(USER_DATA_PATH, 'data');
define(PROF_PATH, 'profile');
define(USER_DATA, USER_DATA_PATH . DS . PROF_PATH . DS);
define(DB_ON, '1');

define(IMAGE_JS, 'images/');
//define(LAYOUT_PATH_JS, LAYOUT_ROOT . '/' . SITE_SKIN);
define(DATA_PATH_JS, 'data');
define(TEMP_PATH_JS, DATA_PATH_JS . '/temp/');
define(FONT_PATH_JS, 'font');
define(PROF_DATA_JS, USER_DATA_PATH . '/' . PROF_PATH . '/');
define(NODE_ID,'21435');
//define(SOCKET_HOST,'http://teambased.net');//Socket Server
//define(SOCKET_HOST,'http://davidkim.info');//Socket Server
define(SOCKET_HOST,'http://localhost');//Socket Server
//define(SOCKET_PORT, '6511');
define(SOCKET_PORT, '6302');
define(SOCKET_CLICKER_PORT, '6512');
define(ONLOAD, "");

require_once( iD_ROOT . "system/mea/iDModuleTemplate.php");
require_once(iD_ROOT . "system/mea/iDModuleBuilder.php");
require_once(iD_ROOT . "system/mea/iDEventTemplate.php");
require_once(iD_ROOT . "system/mea/iDEventBuilder.php");
require_once(iD_ROOT . "system/mea/iDActionTemplate.php");
require_once(iD_ROOT . "system/mea/iDActionBuilder.php");
require_once(iD_ROOT . "system/mea/iDMEACoRMediator.php");
require_once("system/iDModuleLocal.php");
require_once("system/iDEventLocal.php");
require_once("system/iDActionLocal.php");
require_once(iD_ROOT . "system/mea/iDModule.php");
require_once(iD_ROOT . "system/mea/iDEvent.php");
require_once(iD_ROOT . "system/mea/iDAction.php");
require_once(iD_ROOT . "system/mea/iDMEAObject.php");
require_once("system/iDMEAObjectAdapter.php");
require_once(iD_ROOT . "system/mea/iDMEAFacade.php");

require_once(iD_ROOT . "system/iDuckling.php");

/*
require_once(iD_ROOT . "system/mvc/controller/AiDControllerTemplate.php");
require_once(iD_ROOT . "system/mvc/controller/iDControllerBuilder.php");
require_once("system/iDControllerLocal.php");
*/

require_once(iD_ROOT . "system/database/IiDDatabase.php");
require_once(iD_ROOT . "system/database/iDDatabaseFactory.php");
require_once(iD_ROOT . "system/database/iDMySQL.php");
require_once(iD_ROOT . "system/database/iDSqlite.php");

require_once(iD_ROOT . "system/mvc/IiDControllerModelSubject.php");
require_once(iD_ROOT . "system/mvc/IiDControllerModelObserver.php");
require_once(iD_ROOT . "system/mvc/iDControllerModelSubject.php");
require_once(iD_ROOT . "system/mvc/iDControllerModelObserver.php");
require_once(iD_ROOT . "system/mvc/controller/iDControllerHelper.php");
require_once(iD_ROOT . "system/mvc/controller/iDController.php");

require_once("system/iDModelLocal.php");
require_once(iD_ROOT . "system/mvc/model/iDModelHelper.php");
require_once(iD_ROOT . "system/mvc/model/iDModel.php");

require_once(iD_ROOT . "system/layout/AiDSiteLayoutTemplate.php");
require_once(iD_ROOT . "system/layout/iDSiteLayoutBuilder.php");
require_once("system/iDSiteLayoutLocal.php");

require_once(iD_ROOT . "system/mvc/view/iDViewHelper.php");
require_once(iD_ROOT . "system/mvc/view/iDView.php");

require_once("lib/iDLib.php");
require_once("system/iDucklingLocal.php");

//require_once(iD_ROOT . "system/mvc/controller/iDControllerHelper.php");
//require_once(iD_ROOT . "system/mvc/controller/iDController.php");

/*
require_once(iD_ROOT . "system/layout/AiDSiteLayoutBuilder.php");
require_once(iD_ROOT . "system/layout/AiDSiteLayoutDirector.php");
require_once(iD_ROOT . "system/layout/iDSiteLayoutBuilder.php");
require_once(iD_ROOT . "system/layout/iDSiteLayoutDirector.php");
//require_once("system/iDSiteLayoutLocalDirector.php");
require_once(iD_ROOT . "system/layout/iDSiteLayout.php");
*/

$root = $_SERVER['DOCUMENT_ROOT'];

?>
