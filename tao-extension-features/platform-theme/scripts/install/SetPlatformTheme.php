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
 *
 *
 */
namespace oat\__customerExtension__\scripts\install;

use oat\__customerExtension__\model\theme\PlatformDefault;
use oat\oatbox\service\ServiceManager;
use oat\tao\model\theme\ThemeService;

class SetPlatformTheme extends \common_ext_action_InstallAction
{
    public function __invoke($params)
    {
        $serviceManager = ServiceManager::getServiceManager();
        $themeService = $serviceManager->get(ThemeService::SERVICE_ID);
        
        $themeService->setTheme(new PlatformDefault());
        $serviceManager->register(ThemeService::SERVICE_ID, $themeService);

        return new \common_report_Report(\common_report_Report::TYPE_SUCCESS, 'Plaform theme registered');
    }
}

