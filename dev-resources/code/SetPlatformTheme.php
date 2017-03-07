<?php

// replace __MY_EXTENSION_ID__
namespace oat\__MY_EXTENSION_ID__\scripts\install;

use oat\oatbox\extension\InstallAction;
use oat\__MY_EXTENSION_ID__\model\theme\PlatformDefault;
use oat\oatbox\service\ServiceManager;
use oat\tao\model\theme\ThemeService;

/**
 * You can check the result of this script by opening:
 * tao/config/tao/theming.conf.php
 */
class SetPlatformTheme extends InstallAction
{
    public function __invoke($params=array())
    {
        $serviceManager = ServiceManager::getServiceManager();
        $themeService = $serviceManager->get(ThemeService::SERVICE_ID);
        
        $themeService->setTheme(new PlatformDefault());
        $serviceManager->register(ThemeService::SERVICE_ID, $themeService);

        return new \common_report_Report(\common_report_Report::TYPE_SUCCESS, 'Platform theme registered');
    }
}

