# Fonts

The font recipes can be used on either the items or the platform. The web fonts are usually generated at [Font Squirrel](http://www.fontsquirrel.com). The directory *assets* contains the original fonts along with the license and the generator settings used on Font Squirrel.

The font families are combined so you require only one CSS declaration 

    @import './inc/font-face';

    html {
        body {  
            div.qti-item {
                font-family: "My Font Family", sans-serif;
            }
        }
    }

## Available fonts

### Open Dyslexic
> OpenDyslexic is a new open source font created to increase readability for readers with dyslexia. The typeface includes regular, bold, italic, and bold-italic styles. It is being updated continually and improved based on input from dyslexic users.

<cite>[Open Dyslexic Website](http://opendyslexic.org/)</cite>

### Open Dyslexic Alta
Same as above but with a rounded *a*

### Roboto
> Roboto is a neo-grotesque sans-serif typeface family developed by Google as the system font for its mobile operating system Android.

<cite>[Wikipedia](https://en.wikipedia.org/wiki/Roboto)</cite>

### Istok
> Istok Web is an original typeface, in development since 2008. At first some basic letters were based on specially modified METAFONT sources from the CM Bright font family from the TeX community. [...] But in fact Istok fonts are now very far from this origin. 

<cite>[Google Fonts](https://www.google.com/fonts/specimen/Istok+Web)</cite>


## Using the font recipes

- merge `.scss` files with you project files
- copy `fonts` at the root of your css directory
- adapt the paths in `_font-face.scss` if needed
