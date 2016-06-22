/* */
define([
    'jquery',
    'lodash',
    'taoQtiItem/runner/qtiItemRunner',
    'json!../../items/i1458826617776011/qti.json'
], function($, _, qtiItemRunner, data){
    'use strict';

    var runner;

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

    var $container = $('#item-runner');

    qtiItemRunner('qti', data)
        .on('render', function() {
            console.log('rendered !!!!');
        })
        // .on('statechange', function(state){
        //     document.getElementById('response-display').textContent = JSON.stringify(state);
        // })
        .assets(strategies)
        .init()
        .render($container);

});
    /* */

