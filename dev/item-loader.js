define([
    'jquery',
    'lodash',
    'taoQtiItem/runner/qtiItemRunner',
    'ui/themes',
    'json!../../items/i1458826617776011/qti.json',
    'json!../../items/i1458826746593113/qti.json',
    'json!../../items/i1458826840362515/qti.json'
], function($, _, qtiItemRunner, themes, item1, item2, item3){
    'use strict';

    var runner,
        $container = $('.item-runner'),

        availableItems = {
            item1: { id: 'item1', data: item1, name:'interactions 1', folder: '../../items/i1458826617776011' },
            item2: { id: 'item2', data: item2, name:'interactions 2', folder: '../../items/i1458826746593113' },
            item3: { id: 'item3', data: item3, name:'interactions 3', folder: '../../items/i1458826840362515' }
        },
        currentItemId = 'item1',
        currentThemeId;


    // =====================================
    // Assets resolving

    var strategies = [{
        name : 'portableElementLocation',
        handle : function handlePortableElementLocation(url){
            if(/assets/.test(url.toString())){
                return availableItems[currentItemId].folder + '/' + url.toString();
            }
        }
    }, {
        name : 'default',
        handle : function defaultStrategy(url){
            return url.toString();
        }
    }];


    // =====================================
    // Themes handling

    var $themeChanger = $('.theme-changer');
    var themeDefault = themes.get('items').default;

    // fill menu
    themes.getAvailable('items').forEach(function(theme) {
        var optionConfig = {
            text: theme.name,
            value: theme.id,
            selected: (theme.id === themeDefault)
        };
        var $option = $('<option/>', optionConfig);
        $themeChanger.append($option);
    });

    // reload css on menu change
    function changeTheme(themeId) {
        $('.qti-item').trigger('themechange', themeId);
    }

    $themeChanger.on('change', function triggerThemeChange(e) {
        changeTheme(e.target.value);
    });


    // =====================================
    // Items handling

    var $itemChanger = $('.item-changer');
    var itemDefault = 'item1';

    // fill menu
    Object.keys(availableItems).forEach(function(itemId) {
        var item = availableItems[itemId];
        var optionConfig = {
            text: item.name,
            value: item.id,
            selected: (item.id === itemDefault)
        };
        var $option = $('<option/>', optionConfig);
        $itemChanger.append($option);
    });

    // reload item on menu change
    $itemChanger.on('change', function triggerChangeItem(e) {
        currentThemeId = $themeChanger.val();
        if (runner) {
            runner.clear();
        }
        currentItemId = e.target.value;
        var newItemData = availableItems[currentItemId].data;
        renderItem(newItemData);
    });

    function renderItem(itemData) {
        runner = qtiItemRunner('qti', itemData)
            .on('render', function() {
                if (currentThemeId) {
                    changeTheme(currentThemeId);
                }
            })
            .assets(strategies)
            .init()
            .render($container);
    }

    renderItem(item1);


    // =====================================
    // CSS Reloader

    var $cssReloader = $('.css-reloader'),
        KEYCODE_F2 = 113;

    document.addEventListener('keydown', function reloadCss(e) {
        if (e.keyCode === KEYCODE_F2) {
            $cssReloader.addClass('btn-toggle');
            currentThemeId = $themeChanger.val();
            var queryString = '?reload=' + new Date().getTime();

            $('link[data-type="custom-theme-theme"]').each(function reload() {
                var $css = $(this);
                var href = $css.attr('href').split("?")[0] + queryString;
                $css.attr('href', href);
            });
            changeTheme(currentThemeId);
        }
    });

    document.addEventListener('keyup', function reloadCssOff(e) {
        if (e.keyCode === KEYCODE_F2) {
            $cssReloader.removeClass('btn-toggle');
        }
    })

});



