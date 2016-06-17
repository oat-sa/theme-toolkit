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
    'lodash',
    'i18n',
    'ui/themes',
    'ui/themeLoader'
], function (_, __, themeHandler, themeLoader) {
    'use strict';

    /**
     * Configuration
     *
     * Each of these elements will be one checkbox in the style editor, edit this
     * part according to your own needs. Note that class names will automatically
     * be prefixed by '__custom__' to avoid conflicts. For the translation of the
     * labels it is essential to call __() as done in the example below. Don't be
     * tempted to do the translation in the loop below instead as this will prevent
     * the translation scanner from finding these text strings.
     *
     * Element format: {  className: 'the-class-name',  label: __('The Label')   }
     *
     * @type {*[]}
     */
    var blocks = [
    ];




    /**
     * Initialize the configuration object
     *
     * @type {{blocks, defaultTheme}}
     */
    var cssConfig = {
        blocks: (function() {
            var i = blocks.length;
            while(i--){
                blocks[i].className = '__custom__' + blocks[i].className;
            }
            return blocks;
        }()),
        defaultTheme: (function() {
            var themeObj = themeHandler.get('items') || {};
            var themeId = themeLoader(themeObj).getActiveTheme();
            var themePath = '';
            _(themeObj.available).forEach(function (data) {
                if(data.id === themeId) {
                    themePath = data.path;
                    return false;
                }
            });
            return themePath;
        }())
    };




    /**
     * @exports
     */
    return {
        getConfig: function() {
            return cssConfig;
        }
    };
});
