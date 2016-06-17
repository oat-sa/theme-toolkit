<?php
/**
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA;
 */

namespace oat\__ID_OF_THIS_EXTENSION__\scripts\update;

// Item themes
use oat\tao\model\ThemeRegistry;
use Jig\Utils\StringUtils;

// Platform themes
use oat\taoMp\model\theme\__NameOfThePlatformTheme__;
use oat\oatbox\service\ServiceManager;
use oat\tao\model\theme\ThemeService;

class Updater extends common_ext_ExtensionUpdater
{
    
    /**
     * @param string $initialVersion
     * @return string $versionUpdatedTo
     */
    public function update($initialVersion)
    {
        $currentVersion = $initialVersion;

        if ($currentVersion === 'x.x.x') {

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
            $themeService   = $serviceManager->get(ThemeService::SERVICE_ID);

            $themeService->setTheme(new __PlatFormThemeClass__());
            $serviceManager->register(ThemeService::SERVICE_ID, $themeService);

            $currentVersion = 'x.x+.x';
        }
    }
}
