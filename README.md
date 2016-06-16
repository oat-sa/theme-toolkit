# Working with themes
The TAO CSS SDK helps you to change the look and feel of either your items or the platform itself.

## Common scenarios with items

1. You want that all items share your corporate design.
2. You need a number of very similar themes. They should apply to all items or maybe just a certain type.
3. You need custom items. The designs you have in mind are very different from item to item.

You can create the CSS for all these scenarios with the CSS SDK. In all cases the steps are almost the same, only the the deployment process is different for the latter.



## SCSS/themes directory
* `_common` - code shared by item- and platform	themes
* `items` - everything for item themes
	* `_common` code shared by all item themes
		* `inc` include files
			* `interactions` interaction specific code
	* `theme-template` boilerplate code	
* `platform` - everything for platform themes
	* `_common` code shared by all platform themes
		* `inc` include files
	* `theme-template` boilerplate code	


## Development

### Setup and install

Ensure you've node.js installed.

From the project root, run 

```
npm install
```

Create a copy of profiles.json.dist and rename it profiles.json
Customise the content according to your local environment. Each profile is defined as a source path (for *.scss files) and an destination path (for *.css files) 

### Tasks

#### Compiles

```sh
grunt compile -p=profile
```

#### Development mode 

```sh
grunt dev -p=profile
```

#### Options for the tasks
- `-p` profile to use, as defined in profiles.json

### Grunt built-in options
[See options in the Grunt documentation](http://gruntjs.com/using-the-cli)

