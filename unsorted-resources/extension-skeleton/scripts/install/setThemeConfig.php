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
 * Copyright (c) 2014 (original work) Open Assessment Technologies SA;
 *
 *
 */


// Item themes
use oat\tao\model\ThemeRegistry;
use Jig\Utils\StringUtils;

// Platform themes
use oat\taoMp\model\theme\__NameOfThePlatformTheme__;
use oat\oatbox\service\ServiceManager;
use oat\tao\model\theme\ThemeService;


// Item themes
// 'Name of the theme' => Default theme
$itemThemes = array(
    '__Theme Name__' => true,
    '__Another Theme Name__' => false
);

$defaultTheme = 'tao';

foreach($itemThemes as $themeName => $isDefault){
    $pathFragment = StringUtils::removeSpecChars($themeName);
    $themeId = StringUtils::camelize($pathFragment);
    if($isDefault) {
        $defaultTheme = $themeId;
    }
    ThemeRegistry::getRegistry()->registerTheme(
        $themeId,
        $themeName,
        implode(DIRECTORY_SEPARATOR, array('__ID_OF_THIS_EXTENSION__', 'views', 'css', 'themes', 'items', $pathFragment, 'theme.css'), array('items')
    );
}

ThemeRegistry::getRegistry()->setDefaultTheme('items', $defaultTheme);

// TAO theme would usually be removed from the stack if custom themes are used
// Make sure another theme has been set to default in this case.
if($defaultTheme !== 'tao') {    
    ThemeRegistry::getRegistry()->unregisterTheme('tao');
}


// Platform themes
$serviceManager = ServiceManager::getServiceManager();
$themeService = $serviceManager->get(ThemeService::SERVICE_ID);

$themeService->setTheme(new __NameOfThePlatformTheme__());
$serviceManager->register(ThemeService::SERVICE_ID, $themeService);
