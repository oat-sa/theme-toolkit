<?php
/**
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA;
 */


return array(
    'requires' => array(
        'taoThemingPlatform' => '*'
    ),
    'install' => array(
        'php' => array(
            __DIR__ . '/scripts/install/setThemeConfig.php'
        )
    ),
    'update' => 'oat\\__ID_OF_THIS_EXTENSION__\\scripts\\update\\Updater',
);
