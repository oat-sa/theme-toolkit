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
                return 'dev/items/i1458826617776011/' + url.toString();
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
    themes.getAvailable('items').forEach(function(theme) {
        var optionConfig = {
            text: theme.name,
            value: theme.id,
            selected: (theme.id === themeDefault) ? true : false
        };
        var $option = $('<option/>', optionConfig);
        $themeChanger.append($option);
    });

    $themeChanger.on('change', function changeTheme(e) {
        $('.qti-item').trigger('themechange', [e.target.value]);
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

    $itemChanger.on('change', function changeTheme(e) {
        if (runner) {
            runner.clear();
        }
        var newItem = items[e.target.value].data;
        renderItem(newItem);
    });

    function renderItem(itemData) {
        runner = qtiItemRunner('qti', itemData)
            .on('render', function() {
                // console.log('rendered !!!!');
            })
            .assets(strategies)
            .init()
            .render($container);
    }

    renderItem(item1);

});



