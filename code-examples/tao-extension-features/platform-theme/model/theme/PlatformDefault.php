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

namespace oat\__myExtensionId__\model\theme;

use oat\tao\helpers\Template;
use oat\tao\model\theme\DefaultTheme;
use oat\tao\model\theme\Theme;

class PlatformDefault extends DefaultTheme
{

    /**
     * Id of this extension
     */
    private $extensionId;


    /**
     * Theme label
     */
    private $themeLabel = 'My default theme';

    /**
     * @var string
     */
    private $themeDirectory = 'default';

    /**
     * Theme's id, by default label without spec chars
     */
    private $themeId;



    /**
     * PlatformDefault constructor.
     *
     * @param array $options
     */
    public function __construct($options = array())
    {
        strtok(__NAMESPACE__, '\\');
        $this->extensionId = strtok('\\');
        $this->themeId     = $this->extensionId . ucfirst($this->themeDirectory);
        parent::__construct($options);
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
        return __($this->themeLabel);
    }


    /**
     * @param string $id
     * @param string $context
     *
     * @return string
     */
    public function getTemplate($id, $context = Theme::CONTEXT_BACKOFFICE)
    {
        switch($id){

            case 'header-logo' :
                $template = Template::getTemplate(
                    $this->getResourceDir() . '/header-logo.tpl',
                    $this->extensionId
                );
                break;

            // other templates

            default:
                $template = parent::getTemplate($id);
        }

        return $template;
    }


    /**
     * @param string $context
     *
     * @return string
     */
    public function getStylesheet($context = Theme::CONTEXT_BACKOFFICE)
    {
        return Template::css(
            $this->getResourceDir() . '/theme.css',
            $this->extensionId
        );
    }

    protected function getResourceDir() {
        return implode(DIRECTORY_SEPARATOR, array('themes', 'platform', $this->themeDirectory));
    }
}
