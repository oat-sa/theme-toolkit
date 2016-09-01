require.config({

    baseUrl : 'http://localhost:9001/tao/views/js',
    catchError: true,
    waitSeconds: 30,

    config : {
        'context': {
            root_url                : 'http://localhost:9001/',
            base_url                : 'http://localhost:9001/tao/',
            taobase_www             : 'http://localhost:9001/tao/views/',
            base_www                : 'http://localhost:9001/tao/views/',
            base_lang               : 'en',
            locale                  : 'en-US',
            extension               : '',
            module                  : '',
            action                  : '',
            shownExtension          : '',
            shownStructure          : '',
            extensionsLocales       : null,
            timeout                 : 30,
        },
        text: {
            useXhr: function(){
                return true;
            }
        },

        'ui/themes' : {"items":{"base":"http://localhost:9001/taoQtiItem/views/css/qti-runner.css","available":[{"id":"tao","name":"TAO","path":"http://localhost:9001/taoQtiItem/views/css/themes/default.css"},{"id":"blackOnCream","name":"blackOnCream","path":"http://localhost:9001/css/themes/items/blackOnCream/theme.css"},{"id":"blackOnLightBlue","name":"blackOnLightBlue","path":"http://localhost:9001/css/themes/items/blackOnLightBlue/theme.css"},{"id":"blackOnMagenta","name":"blackOnMagenta","path":"http://localhost:9001/css/themes/items/blackOnMagenta/theme.css"},{"id":"blackOnWhite","name":"blackOnWhite","path":"http://localhost:9001/css/themes/items/blackOnWhite/theme.css"},{"id":"lightYellowOnRoyalBlue","name":"lightYellowOnRoyalBlue","path":"http://localhost:9001/css/themes/items/lightYellowOnRoyalBlue/theme.css"},{"id":"grayOnGreen","name":"grayOnGreen","path":"http://localhost:9001/css/themes/items/grayOnGreen/theme.css"},{"id":"whiteOnBlack","name":"whiteOnBlack","path":"http://localhost:9001/css/themes/items/whiteOnBlack/theme.css"},{"id":"default","name":"default","path":"http://localhost:9001/css/themes/platform/default/theme.css"}],"default":"blackOnCream"},"default":"tao"},
//dynamic lib config
        'util/locale'        : {"decimalSeparator":".","thousandsSeparator":""},
        'taoQtiItem/qtiRunner/core/QtiRunner'        : {"inlineModalFeedback":false},
        'taoQtiItem/qtiCommonRenderer/renderers/config'        : {"associateDragAndDrop":true,"gapMatchDragAndDrop":true,"graphicGapMatchDragAndDrop":true,"orderDragAndDrop":true},
        'taoQtiItem/controller/creator/index'        : {"plugins":[{"name":"back","module":"taoQtiItem\/qtiCreator\/plugins\/navigation\/back","category":"navigation","position":null}]},
        'taoQtiTest/controller/runtime/testRunner'        : {"qtiTools":{"markForReview":{"hook":"taoQtiTest\/testRunner\/actionBar\/markForReview","order":"last"},"collapseReview":{"hook":"taoQtiTest\/testRunner\/actionBar\/collapseReview","order":"first"},"comment":{"hook":"taoQtiTest\/testRunner\/actionBar\/comment"},"actHelp":{"hook":"taoAct\/actionBar\/help","order":1},"actFormula":{"hook":"taoAct\/actionBar\/formula","order":2}}},
        'taoQtiItem/controller/creator/main'        : {"hooks":["xmlEditQtiDebugger\/hooks\/qtiCreatorDebugger\/hook"]},
        'taoQtiItem/controller/apip-creator/main'        : {"hooks":["xmlEditQtiDebugger\/hooks\/apipCreatorDebugger\/hook"]},
        'taoQtiTest/controller/runner/runner'        : {"plugins":[{"module":"taoAct\/runner\/plugins\/probes\/latency","category":"probes","position":null},{"module":"taoAct\/runner\/plugins\/navigation\/exit","category":"navigation","position":null},{"module":"taoAct\/runner\/plugins\/tools\/formula","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/tools\/help","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/heartbeat\/heartbeat","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/tools\/scratchpad\/scratchpad","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/controls\/autoPause","category":"controls","position":null},{"module":"taoAct\/runner\/plugins\/controls\/preventCopy","category":"controls","position":null},{"module":"taoAct\/runner\/plugins\/tools\/itemThemeSwitcher","category":"tools","position":null}]},
        'taoQtiTest/qtiTestRunner.min'        : {"plugins":[{"module":"taoAct\/runner\/plugins\/probes\/latency","category":"probes","position":null},{"module":"taoAct\/runner\/plugins\/navigation\/exit","category":"navigation","position":null},{"module":"taoAct\/runner\/plugins\/tools\/formula","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/tools\/help","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/heartbeat\/heartbeat","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/tools\/scratchpad\/scratchpad","category":"tools","position":null},{"module":"taoAct\/runner\/plugins\/controls\/autoPause","category":"controls","position":null},{"module":"taoAct\/runner\/plugins\/controls\/preventCopy","category":"controls","position":null},{"module":"taoAct\/runner\/plugins\/tools\/itemThemeSwitcher","category":"tools","position":null}]},
        'taoQtiItem/runtime/qtiBootstrap'        : {"userModules":["taoAct\/userScripts\/toggleHideable","taoAct\/userScripts\/adaptStimulusHeight"]},
        'taoQtiItem/runtime/qtiBootstrap.min'        : {"userModules":["taoAct\/userScripts\/toggleHideable","taoAct\/userScripts\/adaptStimulusHeight"]},
    },

    paths : {

//require-js plugins
        'text'              : 'lib/text/text',
        'json'              : 'lib/text/json',
        'css'               : 'lib/require-css/css',
        'tpl'               : 'tpl',

//jquery and plugins
        'jquery'            : 'lib/jquery-1.8.0.min',
        'jqueryui'          : 'lib/jquery-ui-1.8.23.custom.min',
        'select2'           : 'lib/select2/select2.min',
        'jquery.autocomplete'  : 'lib/jquery.autocomplete/jquery.autocomplete',
        'jwysiwyg'          : 'lib/jwysiwyg/jquery.wysiwyg',
        'jquery.tree'       : 'lib/jsTree/jquery.tree',
        'jquery.timePicker' : 'lib/jquery.timePicker',
        'jquery.cookie'     : 'lib/jquery.cookie',
        'nouislider'        : 'lib/sliders/jquery.nouislider',
        'jquery.trunc'		: 'lib/jquery.badonkatrunc',
        'jquery.fileDownload'  : 'lib/jquery.fileDownload',
        'qtip'              : 'lib/jquery.qtip/jquery.qtip',

//polyfills
        'polyfill'          : 'lib/polyfill',

//libs
        'lodash'            : 'lib/lodash.min',
        'async'             : 'lib/async',
        'moment'            : 'lib/moment-with-locales.min',
        'handlebars'        : 'lib/handlebars',

        'class'             : 'lib/class',
        'raphael'           : 'lib/raphael/raphael',
        'scale.raphael'     : 'lib/raphael/scale.raphael',
        'spin'              : 'lib/spin.min',
        'history'           : 'lib/history/history',
        'mathJax'           : [
            '../../../taoQtiItem/views/js/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full',
            '../../../taoQtiItem/views/js/MathJaxFallback'
        ],
        'ckeditor'          : 'lib/ckeditor/ckeditor',
        'interact'          : 'lib/interact',

//locale loader
        'i18ntr'            : '../locales/en-US',

//extension aliases, and controller loading in prod mode
        'tao'        : 'http://localhost:9001/tao/views/js',
        'taoItems'        : 'http://localhost:9001/taoItems/views/js',
        'taoQtiItem'        : 'http://localhost:9001/taoQtiItem/views/js',
    },

    shim : {
        'wfEngine/wfApi/wfApi.min' : ['jquery'],
        'moment'                : { exports : 'moment' },
        'ckeditor'              : { exports : 'CKEDITOR' },
        'ckeditor-jquery'       : ['ckeditor'],
        'class'                 : { exports : 'Class'},

        'mathJax' : {
            exports : "MathJax",
            init : function(){
                if(window.MathJax){
                    MathJax.Hub.Config({showMathMenu:false, showMathMenuMSIE:false});//add mathJax config here
                    MathJax.Hub.Startup.onload();
                    return MathJax;
                }
            }
        }
    }
});
