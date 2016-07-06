**WARNING: for now, those are development notes and not a proper readme**

# Item themes toolkit
 
The purpose of this tool is to ease the development of items themes. It allows:
- to fast-switch between items themes
- to fast-switch between a set of pre-defined items containing most TAO interactions
- without the need of a having to setup a full TAO instance

The way it accomplish this is by cloning only the necessary extensions of TAO to create an item runner instance.

# Overall Process


grunt init

can sometimes hang. If it runs for a abnormal amount of time, CTRL+Z

## To get up and running

1. init script (grunt or cross platform something): 
    + clone tao repositories: https://www.npmjs.com/package/grunt-git (async done ?)
    + copy config file: https://github.com/gruntjs/grunt-contrib-copy
    + replace vhost: https://www.npmjs.com/package/grunt-replace
    + replace ui/themes with default data
    + copy translation file
    + => this should create a working install with default themes
    + => and it does!
2. define profile, compile themes
3. load themes (= refresh themes config with compiled themes)
4. launch server
5. develop themes!

## To switch client or project

1. clear CSS directory
2. define profile, compile themes
3. reload themes

setup procedure:
----------------
- copy a clientConfig js file from a working tao install
- replace vhost with correct IP
- !!!! generate correct ui/themes data 
- copy a tao/views/locales/en-US/messages.json from a working tao install

todo:
-----
+ resolve items assets correctly
+ add new items
+ item switcher ?
+ remove profile parameter dependency in grunt cli
+ define overall process
+ check that we can do all the setup in grutn
+ generate correct ui/themes data in config file
 
* create init script
 
- live reload on recompile
- write somewhere in act extension that themes need to be compiled with theme-toolkit
- improve item resolver to work with directly exported items, instead of looking for assets in a 'asset folder'
- write item update procedure

- tool limit: no authoring, select2.png problem,  
- tool longterm road map: retrieve items from tao instance, compile to data directory


// todo: add task to automatically clone
// git clone https://github.com/oat-sa/tao-core.git tao
// git clone https://github.com/oat-sa/extension-tao-item.git taoItems
// git clone https://github.com/oat-sa/extension-tao-itemqti.git taoQtiItem

// to convert items
php /tao/package-parcc/taoTool.php --qti-to-json dev/items/i1458826617776011/qti.xml
php /tao/package-parcc/taoTool.php --qti-to-json dev/items/i1458826746593113/qti.xml
php /tao/package-parcc/taoTool.php --qti-to-json dev/items/i1458826840362515/qti.xml

