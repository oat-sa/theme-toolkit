**WARNING: for now, those are development notes and not a proper readme**


setup procedure:

- copy a clientConfig js file from a working tao install
- replace vhost with correct IP
- !!!! generate correct ui/themes data 
- copy a tao/views/locales/en-US/messages.json from a working tao install

todo:

- resolve items assets correctly
- add new items
- define overall process
- generate correct ui/themes data in config file 
- item switcher ?
- live reload on recompile
- write somewhere in act extension that themes need to be compiled with theme-toolkit
- remove profile parameter dependency in grunt cli



// todo: add task to automatically clone
// git clone https://github.com/oat-sa/tao-core.git tao
// git clone https://github.com/oat-sa/extension-tao-itemqti.git taoQtiItem
// git clone https://github.com/oat-sa/extension-tao-item.git taoItems

// to convert items
php /tao/package-parcc/taoTool.php --qti-to-json dev/items/i1458826617776011/qti.xml
php /tao/package-parcc/taoTool.php --qti-to-json dev/items/i1458826746593113/qti.xml
php /tao/package-parcc/taoTool.php --qti-to-json dev/items/i1458826840362515/qti.xml
