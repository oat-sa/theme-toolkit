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

// replace __MY_EXTENSION_ID__
namespace oat\__MY_EXTENSION_ID__\scripts\install;

use oat\taoQtiItem\model\themes\ItemThemeInstaller;
use oat\oatbox\extension\InstallAction;

/**
 * You can check the result of this script by opening:
 * tao/config/tao/themes.conf.php
 */
class SetItemThemes extends InstallAction
{

    public function __invoke($params)
    {

        $themes = [
            'default' => 'The default theme', // equivalent to 'taoFooDefault' => 'The default theme'
            'other'   => 'The other one'
        ];

        $itemThemeInstaller = new ItemThemeInstaller('taoFoo'); // 'taoFoo' is the id of your extension
        $itemThemeInstaller->add($themes);
        $itemThemeInstaller->setDefault('default');
    }
}
