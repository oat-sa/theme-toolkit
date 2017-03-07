<?php
/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA;
 */

// replace __myExtensionId__
namespace oat\__myExtensionId__\scripts\install;

use oat\oatbox\extension\InstallAction;
use oat\__myExtensionId__\model\theme\PlatformDefault;// provided your theme class has that name
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
