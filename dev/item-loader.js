define([
    'jquery',
    'lodash',
    'taoQtiItem/runner/qtiItemRunner',
    'ui/themes',
    'json!../../items/i1458826617776011/qti.json'
], function($, _, qtiItemRunner, themes, data){
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
    var defaultTheme = themes.get('items').default;
    themes.getAvailable('items').forEach(function(theme) {
        var optionConfig = {
            text: theme.name,
            value: theme.id,
            selected: (theme.id === defaultTheme) ? true : false
        };
        var $option = $('<option/>', optionConfig);
        $themeChanger.append($option);
    });

    $themeChanger.on('change', function changeTheme(e) {
        $('.qti-item').trigger('themechange', [e.target.value]);
    });


    qtiItemRunner('qti', data)
        .on('render', function() {
            // console.log('rendered !!!!');
        })
        .assets(strategies)
        .init()
        .render($container);

});



