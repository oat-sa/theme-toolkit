<?php
/**  
 * Copyright (c) 2015 (original work) Open Assessment Technologies;
 */

namespace oat\__myExtensionId__\model;

use oat\taoQtiItem\model\Hook;
use oat\taoQtiItem\model\Config;

/**
 * The hook used in the item creator
 */
class CreatorHook implements Hook
{
    /**
     * Affect the config
     * 
     * @param \oat\taoQtiItem\model\Config $config
     */
    public function init(Config $config)
    {
        $config->addHook('__myExtensionId__/cssBlocks/hook');
    }
}
