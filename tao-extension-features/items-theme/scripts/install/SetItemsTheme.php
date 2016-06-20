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
namespace oat\__customerExtension__\scripts\install;

use oat\tao\model\ThemeRegistry;
use oat\tao\model\ThemeNotFoundException;

/**
 * You can check the result of this script by opening:
 * tao/config/tao/themes.conf.php
 */

class SetItemsTheme extends \common_ext_action_InstallAction
{
    public function __invoke($params)
    {
        // this should match the /views/css/theme/items/ subfolder containing the theme we are registering
        $itemsTheme = 'default';

        // this helps when running the script multiple times during debugging
        try {
            ThemeRegistry::getRegistry()->unregisterTheme($itemsTheme);
        } catch (ThemeNotFoundException $e) {
            \common_Logger::d('theme ' . $itemsTheme . ' is not registered, cannot unregister');
        }

        // registering theme
        ThemeRegistry::getRegistry()->registerTheme(
            $itemsTheme,
            'Default custom theme',
            implode(DIRECTORY_SEPARATOR, array('__customerExtension__', 'views', 'css', 'themes', 'items', $itemsTheme, 'theme.css')),
            array('items')
        );
        ThemeRegistry::getRegistry()->setDefaultTheme('items', $itemsTheme);

        // TAO theme would usually be removed from the stack if custom themes are used
        // Make sure another theme has been set to default in this case.
        try {
            ThemeRegistry::getRegistry()->unregisterTheme('tao');
        } catch (ThemeNotFoundException $e) {
            \common_Logger::d('tao theme is not registered, cannot unregister');
        }

        return new \common_report_Report(\common_report_Report::TYPE_SUCCESS, 'item theme registered');
    }
}
