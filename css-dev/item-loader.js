console.log('AND FINALLY HERE !!!');
/* * /
define([
    'jquery',
    'lodash',
    'taoQtiItem/runner/qtiItemRunner',
    'core/mouseEvent',
    'ui/interactUtils',
    'json!dev-resources/example-items/css_sdk_examples/i1458826617776011/qti.json'
], function($, _, qtiItemRunner, triggerMouseEvent, interactUtils, gapMatchData){
    'use strict';

    var runner;
    var outsideContainerId = 'outside-container';

    //override asset loading in order to resolve it from the runtime location
    var strategies = [{
        name : 'portableElementLocation',
        handle : function handlePortableElementLocation(url){
            if(/assets/.test(url.toString())){
                return '../../taoQtiItem/views/js/test/qtiCommonRenderer/interactions/graphicGapMatch/' + url.toString();
            }
        }
    }, {
        name : 'default',
        handle : function defaultStrategy(url){
            return url.toString();
        }
    }];

    module('Graphic GapMatch Interaction', {
        teardown : function(){
            if(runner){
                runner.clear();
            }
        }
    });

    QUnit.asyncTest('Display and play', function(assert){
        QUnit.expect(1);

        var $container = $('#' + outsideContainerId);
        assert.equal($container.length, 1, 'the item container exists');

        qtiItemRunner('qti', gapMatchData)
            .on('render', function() {
                QUnit.start();
            })
            .on('statechange', function(state){
                document.getElementById('response-display').textContent = JSON.stringify(state);
            })
            .assets(strategies)
            .init()
            .render($container);
    });
});
    /* */

