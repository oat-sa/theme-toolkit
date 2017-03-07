/*
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
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA;
 *
 */

/**
 *
 * @author dieter <dieter@taotesting.com>
 */

define([
    'jquery',
    'taoQtiItem/qtiCreator/helper/panel',
    '__customerExtension__/cssBlocks/cssConfig',
    'tpl!__customerExtension__/cssBlocks/tpl/css-blocks'
], function($, panelHelper, cssConfig, listingTpl){

    'use strict';
    
    var _config = cssConfig.getConfig();

    /**
     * Create listing if it doesn't exist and handle events
     *
     * @param widget
     * @param $itemStylePanel
     */
    function manageListing(widget, $itemStylePanel) {
        
        var $itemBody = widget.$container.find('.qti-itemBody');

        var $sidebarSection = $itemStylePanel.find('#item-editor-custom-css-blocks');

        if(!$sidebarSection.length) {
            $sidebarSection = $(listingTpl(_config));
            $itemStylePanel.prepend($sidebarSection);
            panelHelper.initSidebarAccordion($itemStylePanel);
            $sidebarSection.find('._accordion').trigger('click');
        }

        $sidebarSection.find('input').on('change', function() {
            $itemBody.toggleClass(this.name, this.checked);
            widget.element.toggleClass(this.name, this.checked);
        }).each(function(){
            this.checked = widget.element.hasClass(this.name);
        });

        $sidebarSection.show();
    }


    /**
     * Initialize module
     * 
     * @type {{init: Function}}
     */
    var cssBlockHook = {
        init : function(config){

            // Happens in dev when all code is installed but the theme is not compiled yet.
            // No big deal and no reason to let the code fail
            if(_config.defaultTheme) {
                require(['css!' + _config.defaultTheme]);
            }
            else {
                console.info('Theme CSS not yet available');
            }

            $(document).on('widgetloaded.qticreator', function(e, widget) {
                manageListing(widget, config.dom.getItemStylePanel());
            });
        }
    };

    return cssBlockHook;
});
