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
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA (under the project TAO-PRODUCT);
 *
 */
namespace oat\__ID_OF_THIS_EXTENSION__\model\theme;

use oat\tao\helpers\Template;
use oat\tao\model\theme\DefaultTheme;
use oat\tao\model\theme\Theme;
use Jig\Utils\StringUtils;

/**
 * Class __PlatFormThemeClass__
 *
 * @package oat\__ID_OF_THIS_EXTENSION__\model\theme
 */
class __PlatFormThemeClass__ extends DefaultTheme
{

    /**
     * something like taoCustomerName
     */
    const EXTENSION_ID = '__ID_OF_THIS_EXTENSION__';

    /**
     * 
     */
    const THEME_LABEL = '__Label of this theme__';

    /**
     * @var id, by default label without spec chars
     */
    private $themeId = '';

    /**
     * Constructor.
     */
    public function __construct()
    {
        if (!$this->themeId) {
            $this->themeId = StringUtils::removeSpecChars(self::THEME_LABEL);
        }
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->themeId;
    }

    /**
     * @return string
     */
    public function getLabel()
    {
        return __(self::THEME_LABEL);
    }

    /**
     * @param string $id
     * @param string $context
     * @return string
     */
    public function getTemplate($id, $context = Theme::CONTEXT_BACKOFFICE)
    {
        switch ($id) {
            case 'header' :
                $template = Template::getTemplate(
                    'themes/platform/' . $this->themeId . '/header.tpl',
                    self::EXTENSION_ID);
                break;

            case 'header-logo' :
                $template = Template::getTemplate(
                    'themes/platform/' . $this->themeId . '/header-logo.tpl',
                    self::EXTENSION_ID
                );
                break;

            case 'footer' :
                $template = Template::getTemplate(
                    'themes/platform/' . $this->themeId . '/footer.tpl',
                    self::EXTENSION_ID);
                break;

            case 'login-message' :
                $template = Template::getTemplate(
                    'themes/platform/' . $this->themeId . '/login-message.tpl',
                    self::EXTENSION_ID);
                break;
                
            default:
                $template = parent::getTemplate($id);
        }
        return $template;
    }

    /**
     * @param string $context
     * @return string
     */
    public function getStylesheet($context = Theme::CONTEXT_BACKOFFICE)
    {
        return Template::css('themes/platform/' . $this->themeId . '/theme.css', self::EXTENSION_ID);
    }
}
