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

        'ui/themes' : {"items":{"base":"http:\/\/localhost:9001\/taoQtiItem\/views\/css\/qti-runner.css","available":[{"id":"tao","name":"TAO","path":"http:\/\/localhost:9001\/taoQtiItem\/views\/css\/themes\/default.css"},{"id":"blackOnWhite","name":"Black on white","path":"http:\/\/localhost:9001\/css\/themes\/items\/blackOnWhite\/theme.css"},{"id":"blackOnCream","name":"Black on cream","path":"http:\/\/localhost:9001\/css\/themes\/items\/blackOnCream\/theme.css"},{"id":"blackOnLightBlue","name":"Black on light blue","path":"http:\/\/localhost:9001\/css\/themes\/items\/blackOnLightBlue\/theme.css"},{"id":"blackOnMagenta","name":"Black on magenta","path":"http:\/\/localhost:9001\/css\/themes\/items\/blackOnMagenta\/theme.css"},{"id":"whiteOnBlack","name":"White on black","path":"http:\/\/localhost:9001\/css\/themes\/items\/whiteOnBlack\/theme.css"},{"id":"lightYellowOnRoyalBlue","name":"Light yellow on royal blue","path":"http:\/\/localhost:9001\/css\/themes\/items\/lightYellowOnRoyalBlue\/theme.css"},{"id":"grayOnGreen","name":"Gray on green (low contrast option)","path":"http:\/\/localhost:9001\/css\/themes\/items\/grayOnGreen\/theme.css"}],"default":"blackOnWhite"}},
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
        'taoCss'        : 'http://localhost:9001/tao/views/css',
        'ace'        : 'http://localhost:9001/xmlEdit/views/js/lib/ace-1.2.0/',
        'xmlEdit'        : 'http://localhost:9001/xmlEdit/views/js',
        'xmlEditCss'        : 'http://localhost:9001/xmlEdit/views/css',
        'taoResultServer'        : 'http://localhost:9001/taoResultServer/views/js',
        'taoResultServerCss'        : 'http://localhost:9001/taoResultServer/views/css',
        'taoOutcomeRds'        : 'http://localhost:9001/taoOutcomeRds/views/js',
        'taoOutcomeRdsCss'        : 'http://localhost:9001/taoOutcomeRds/views/css',
        'taoDelivery'        : 'http://localhost:9001/taoDelivery/views/js',
        'taoDeliveryCss'        : 'http://localhost:9001/taoDelivery/views/css',
        'taoBackOffice'        : 'http://localhost:9001/taoBackOffice/views/js',
        'taoBackOfficeCss'        : 'http://localhost:9001/taoBackOffice/views/css',
        'taoDacSimple'        : 'http://localhost:9001/taoDacSimple/views/js',
        'taoDacSimpleCss'        : 'http://localhost:9001/taoDacSimple/views/css',
        'taoTestTaker'        : 'http://localhost:9001/taoTestTaker/views/js',
        'taoTestTakerCss'        : 'http://localhost:9001/taoTestTaker/views/css',
        'taoGroups'        : 'http://localhost:9001/taoGroups/views/js',
        'taoGroupsCss'        : 'http://localhost:9001/taoGroups/views/css',
        'taoItems'        : 'http://localhost:9001/taoItems/views/js',
        'taoItemsCss'        : 'http://localhost:9001/taoItems/views/css',
        'taoMediaManager'        : 'http://localhost:9001/taoMediaManager/views/js',
        'taoMediaManagerCss'        : 'http://localhost:9001/taoMediaManager/views/css',
        'taoTests'        : 'http://localhost:9001/taoTests/views/js',
        'taoTestsCss'        : 'http://localhost:9001/taoTests/views/css',
        'taoRevision'        : 'http://localhost:9001/taoRevision/views/js',
        'taoRevisionCss'        : 'http://localhost:9001/taoRevision/views/css',
        'taoWorkspace'        : 'http://localhost:9001/taoWorkspace/views/js',
        'taoWorkspaceCss'        : 'http://localhost:9001/taoWorkspace/views/css',
        'taoDeliveryRdf'        : 'http://localhost:9001/taoDeliveryRdf/views/js',
        'taoDeliveryRdfCss'        : 'http://localhost:9001/taoDeliveryRdf/views/css',
        'taoOutcomeUi'        : 'http://localhost:9001/taoOutcomeUi/views/js',
        'taoOutcomeUiCss'        : 'http://localhost:9001/taoOutcomeUi/views/css',
        'qtiCustomInteractionContext'        : 'http://localhost:9001/taoQtiItem/views/js/runtime/qtiCustomInteractionContext',
        'qtiInfoControlContext'        : 'http://localhost:9001/taoQtiItem/views/js/runtime/qtiInfoControlContext',
        'IMSGlobal/jquery_2_1_1'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/IMSGlobal/jquery_2_1_1',
        'OAT/lodash'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/lodash',
        'OAT/async'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/async',
        'OAT/raphael'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/raphael',
        'OAT/scale.raphael'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/scale.raphael',
        'OAT/util/xml'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/util/xml',
        'OAT/util/math'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/util/math',
        'OAT/util/html'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/util/html',
        'OAT/util/EventMgr'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/util/EventMgr',
        'OAT/util/event'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/util/event',
        'OAT/util/asset'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/util/asset',
        'OAT/util/tpl'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/util/tpl',
        'OAT/sts/common'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/sts/common',
        'OAT/interact'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/interact',
        'OAT/interact-rotate'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/interact-rotate',
        'OAT/sts/transform-helper'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/sts/transform-helper',
        'OAT/handlebars'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/handlebars',
        'OAT/sts/stsEventManager'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/sts/stsEventManager',
        'OAT/waitForMedia'        : 'http://localhost:9001/taoQtiItem/views/js/portableSharedLibraries/OAT/waitForMedia',
        'taoQtiItem'        : 'http://localhost:9001/taoQtiItem/views/js',
        'taoQtiItemCss'        : 'http://localhost:9001/taoQtiItem/views/css',
        'taoClientDiagnostic'        : 'http://localhost:9001/taoClientDiagnostic/views/js',
        'taoClientDiagnosticCss'        : 'http://localhost:9001/taoClientDiagnostic/views/css',
        'taoQtiTest'        : 'http://localhost:9001/taoQtiTest/views/js',
        'taoQtiTestCss'        : 'http://localhost:9001/taoQtiTest/views/css',
        'taoProctoring'        : 'http://localhost:9001/taoProctoring/views/js',
        'taoProctoringCss'        : 'http://localhost:9001/taoProctoring/views/css',
        'qtiItemPci'        : 'http://localhost:9001/qtiItemPci/views/js',
        'qtiItemPciCss'        : 'http://localhost:9001/qtiItemPci/views/css',
        'funcAcl'        : 'http://localhost:9001/funcAcl/views/js',
        'funcAclCss'        : 'http://localhost:9001/funcAcl/views/css',
        'taoCe'        : 'http://localhost:9001/taoCe/views/js',
        'taoCeCss'        : 'http://localhost:9001/taoCe/views/css',
        'xmlEditQtiDebugger'        : 'http://localhost:9001/xmlEditQtiDebugger/views/js',
        'xmlEditQtiDebuggerCss'        : 'http://localhost:9001/xmlEditQtiDebugger/views/css',
        'taoDevTools'        : 'http://localhost:9001/taoDevTools/views/js',
        'taoDevToolsCss'        : 'http://localhost:9001/taoDevTools/views/css',
        'taoAct'        : 'http://localhost:9001/taoAct/views/js',
        'taoActCss'        : 'http://localhost:9001/taoAct/views/css',
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
