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

namespace oat\__myExtensionId__\scripts\update;

use \common_ext_ExtensionUpdater;
use oat\__myExtensionId__\scripts\install\AddCssBlocksHook;


class Updater extends common_ext_ExtensionUpdater
{
    public function update($initialVersion)
    {
        if ($this->isVersion('0.1.0')) { // <- current version according to manifest.php

            $setPlatformTheme = new AddCssBlocksHook();
            $setPlatformTheme([]);

            $this->setVersion('0.2.0'); // <- new version, update this in manifest.php too
        }
    }
}