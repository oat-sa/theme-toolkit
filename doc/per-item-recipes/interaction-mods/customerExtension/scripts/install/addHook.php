<?php
/**  
 * Copyright (c) 2015 (original work) Open Assessment Technologies;
 */

use oat\taoQtiItem\model\HookRegistry;

HookRegistry::getRegistry()->set('__customerExtension__Creator', 'oat\__customerExtension__\model\CreatorHook');
