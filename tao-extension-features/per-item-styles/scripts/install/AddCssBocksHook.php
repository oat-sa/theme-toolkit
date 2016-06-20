<?php
/**
 * Copyright (c) 2015 (original work) Open Assessment Technologies;
 */
namespace oat\__customerExtension__\scripts\install;

use oat\taoQtiItem\model\HookRegistry;

class AddCssBlocksHook extends \common_ext_action_InstallAction
{
    public function __invoke($params)
    {
        HookRegistry::getRegistry()->set('__customerExtension__Creator', 'oat\__customerExtension__\model\CreatorHook');

        return new \common_report_Report(\common_report_Report::TYPE_SUCCESS, 'Css blocks hook successfully registered');
    }
}

