**WARNING: for now, those are development notes and not a proper readme**

# Item themes toolkit
 
The purpose of this tool is to ease the development of items themes. It allows:

- to fast-switch between items themes
- to fast-switch between a set of pre-defined items containing most TAO interactions
- in a light-weight environment, meaning without the need to setup a full TAO instance

## Overall Process

Here is a high level view of the item themes toolkit setup process. Most of it is automated and it require very little manual intervention.

- **Step 1:** create a stripped-down TAO instance to launch the item runner with the most recent TAO code;
- **Step 2:** compile your boilerplate item themes;
- **Step 3:** load your themes in the item themes toolkit;
- **Step 4:** develop your themes!

## Detailed procedure

### Step 1: create a "light" TAO instance
 
Make sure you have NodeJs and Git installed. Run the following commands from the theme toolkit's root folder:

```
npm install
grunt items-init
```

This will git clone the TAO extensions required to create an item runner instance and configure a few files.
This takes a bit of time but shouldn't take *that* long. If it does, press `CTRL+Z` to abort and retry.
 
You can check that TAO has been initialized properly by running

```
grunt items-run
```

and then pointing your browser to http://localhost:9001. You should be able to browse through available items with default TAO styling.

Now, you need to add your own themes.

### Step 2: compile your themes

The item theme toolkit will look for css files into `/dev-items/css` directory. Therefore, this is where you need to compile your item themes.

If you haven't done so already, create a profile.json file using the provided `profiles.json.dist` example. 

The content of the source folder should be based on the CSS SDK as provided in the `/scss` directory. It is very important to keep the file structure as the script will look for specific folders names and such. You can use the scss folder of this repository, but most likely you will want to use a source folder from a specific project repository. 

To try it out, however, we will compile the default SDK. Add the following profile to your `profile.json`:

```
"default": {
    "src": "scss",
    "dest": "dev-items/css"
}
```

and then compile:

```
grunt compile:default
```

Look at the result in the destination repository (`/css`).

### Step 3: register item themes

Run:

```
grunt items-refresh
```

This command will register every item theme found in the css directory. For a given set of themes, this is a one-time setup. It is to be run each time you add/rename/remove a theme, but It **DOESN'T NEED** to be run each time you recompile existing themes. 

You can now refresh your browser: you should see a new entry in the theme dropdown menu named 'default'. This entry correspond to the file created in Step2: 
`dev-items/css/themes/items/default/theme.css`

This theme doesn't produce any visible change yet because we haven't touched at the source files.


### Step 4: curtomize your themes

For testing purpose, we will make a small modification in the `scss` folder, something that you most likely never want to do (your source files for a specific theme should reside in a client/project specific repository).   

Add the following code at the end of the file `scss/themes/items/default/themes.scss`:
```
html {
  body {
    div.qti-item {
      background: red;
    }
  }
}
```

Compile the source file, as you need to do for each modification:

```
grunt compile:default
```

Refresh your browser: item background should now be red. Of course, you may can automate the refresh step with a watch task:

```
grunt dev:default
```

Note that you don't have to perform a full refresh of the page in the browser. Pressing `F2` key will only reload CSS.

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

## To update to the latest version of tao code

1. run the init task again to clone directories

## To switch client or project

1. clear CSS directory
2. define profile, compile themes
3. reload themes

manual setup procedure:
-----------------------
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
+ write somewhere in act extension that themes need to be compiled with theme-toolkit
+ create init script
+ main use case documentation
* refactor grunt script to remove parameter dependency 
+ refactor grunt script to implement documented targets 
+ namespace everything in gruntfile to "items" in case some "platform" targets are needed someday

- debug watch task
- all uses cases documentation & targets

- live reload on recompile
- improve item resolver to work with directly exported items, instead of looking for assets in a 'asset folder'
- write item update procedure
- add rubrick blocs markup to test items (test scope, item scope)
- add scrolling bar somewhere in test items
- add a video to documentation ? (see lionel build process for an example)

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

php /tao/package-parcc/taoTool.php --qti-to-json /tao/package-tao/data/taoItems/itemData/i14678948287836113/itemContent/en-US/qti.xml