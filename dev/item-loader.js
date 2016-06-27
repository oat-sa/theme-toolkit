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
        $container = $('.item-runner');

    //override asset loading in order to resolve it from the runtime location
    var strategies = [{
        name : 'portableElementLocation',
        handle : function handlePortableElementLocation(url){
            if(/assets/.test(url.toString())){
                return '../../items/i1458826840362515/' + url.toString(); // todo: correct this !
            }
        }
    }, {
        name : 'default',
        handle : function defaultStrategy(url){
            return url.toString();
        }
    }];

    // fill available themes
    var $themeChanger = $('.theme-changer');
    var themeDefault = themes.get('items').default;
    var themeActive;
    themes.getAvailable('items').forEach(function(theme) {
        var optionConfig = {
            text: theme.name,
            value: theme.id,
            selected: (theme.id === themeDefault) ? true : false
        };
        var $option = $('<option/>', optionConfig);
        $themeChanger.append($option);
    });

    function changeTheme(themeId) {
        $('.qti-item').trigger('themechange', themeId);
    }

    $themeChanger.on('change', function triggerThemeChange(e) {
        changeTheme(e.target.value);
    });


    // fill available items
    var $itemChanger = $('.item-changer');
    var items = {
        item1: { id: 'item1', data: item1, name:'interactions 1' },
        item2: { id: 'item2', data: item2, name:'interactions 2' },
        item3: { id: 'item3', data: item3, name:'interactions 3' }
    };
    var itemDefault = 'item1';
    Object.keys(items).forEach(function(itemId) {
        var item = items[itemId];
        var optionConfig = {
            text: item.name,
            value: item.id,
            selected: (item.id === itemDefault) ? true : false
        };
        var $option = $('<option/>', optionConfig);
        $itemChanger.append($option);
    });

    $itemChanger.on('change', function triggerChangeItem(e) {
        themeActive = $themeChanger.val();
        if (runner) {
            runner.clear();
        }
        var newItem = items[e.target.value].data;
        renderItem(newItem);
    });

    function renderItem(itemData) {
        runner = qtiItemRunner('qti', itemData)
            .on('render', function() {
                if (themeActive) {
                    changeTheme(themeActive);
                }
            })
            .assets(strategies)
            .init()
            .render($container);
    }

    renderItem(item1);



    // CSS Reloader

    var $cssReloader = $('.css-reloader');

    document.addEventListener('keydown', function reloadCss(e) {
        if (e.keyCode === 113) { // F2
            $cssReloader.addClass('btn-toggle');
            themeActive = $themeChanger.val();
            var queryString = '?reload=' + new Date().getTime();

            $('link[data-type="custom-theme-theme"]').each(function reload() {
                var $css = $(this);
                var href = $css.attr('href').split("?")[0] + queryString;
                $css.attr('href', href);
            });
            changeTheme(themeActive);
        }
    });

    document.addEventListener('keyup', function reloadCssOff(e) {
        if (e.keyCode === 113) {
            $cssReloader.removeClass('btn-toggle');
        }
    })



});



