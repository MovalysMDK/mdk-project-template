# The `src/assets/styles` Directory
============================


This folder is actually fairly self-explanatory: it contains your SASS/CSS files to be compiled during the build.
The only important thing to note is that *only* `main.scss` will be processed during the build, meaning that all
other stylesheets must be *imported* into that one.


## Overview
-------------------------

The style of the application is defined there:

````
|- webapp
|  |- assets
|  |  |- styles
|  |  |  |- main.scss
|  |  |  |- variables.scss
````

The default style is defined in MFUI framework, whose main SCSS file is there:

````
|- webapp
|  |- build
|  |  |- vendor
|  |  |  |- mdk-html5-ui
|  |  |  |  |- assets
|  |  |  |  |  |- styles
|  |  |  |  |  |  |- framework.scss
````

The other SCSS files (referenced by `framework.scss`) are in these directories :

````
|- webapp
|  |- build
|  |  |- vendor
|  |  |  |- mdk-html5-ui
|  |  |  |  |- assets
|  |  |  |  |  |- styles
|  |  |  |  |- lib
|  |  |  |  |  |- directives
|  |  |  |- bootstrap-sass-official
|  |  |  |  |- vendor
|  |  |  |  |  |- assets
|  |  |  |  |  |  |- stylesheets
````

To summarize, here is the tree of dependencies:

````
main.scss
  |-> variables.scss (of the project)
  |-> framework.scss
  |    |-> variables.scss (of MFUI)
  |    |-> bootstrap.scss
  |    |   |-> variables.scss (of Bootstrap)
  |    |-> MFUI SCSS files
  |-> project SCSSS files
````

## Framework styling `webapp/build/vendor/mdk-html5-ui/assets/styles`
-----------------------------------------------------

This styling is in readonly.

- `framework.scss` : references all the SCSS files of MFUI and Bootstrap styling
- `base.scss` : style of containers: body, app,...


## Project styling `webapp/src/assets/styles`
---------------------------------------------

- `main.scss` - specific project styles should be defined here. This SCSS is the "entry point" for the compilation of the SCSS files into one single CSS file
- `variables.scss` - specific project overwrites of SASS variables used by the MDK framework or by Bootstrap.

## How to: customize the style of your app
------------------------------------------

### Where to write your CSS / SCSS
----------------------------------

The change have to be done in the file "main.scss". You can write classic CSS or SASS syntax in this file.
You can start a project style from scratch (without botstrap etc..) by deleting the import of "framework.scss" in the
"main.css" file.

### The scope of your change
----------------------------

Each MFUI component use is identified by a specific "id" and "class", to easily customize the app without editing the generated HTML.

You can change the style at different scope:

- whole app: you can change the style of the whole app by overload top dom element like "body".

- whole component of one type: all component have a specific class. If you want to edit, per example, all Textfield with
blue background, you just have to write it:
` .MfTextfield{background-color:blue;}`

- several specific component: you can overload several component at once. You have to specify the same
mf-css-class-container to all the component you want to apply the specific style. Every component with the
mf-css-class-container you specify will have the change. Example: you have added `mf-css-class-container="MyClass"` to
a Textfield, a Datepicker and a Doublefield. You can now set the font "Helvetica" to all this component by writing:
`.MyClass{font-family: Helvetica, Geneva, Arial, sans-serif;}`

- one specific component: all component added to your app are identified by a specific "id". The name of the id
follow this syntax: #[mf-form]-[mf-field]. For example:
` #noteNewForm-noteDate{} `

### Access to the element you want to edit
------------------------------------------

You can access to all the "id" and "class" with your usual developer tool (Firebug, Chrome or IE developper tools..).
Important: you cannot refer to the lines specified in your tools because it refer to "boilerplate.css" who is a compiled
file from all the css of the app. Just use your tools to find the "id" or "class" you need and add the class in the
main.scss.

### Add or change the pictures
------------------------------

All the pictures you want to add to the project have to be put on this folder:
````
webapp
  |- src
  |  |- assets
  |  |  |- pictures
````

 By default, you have Movalys app icon and screen set. You can overload this file by putting yours in the "icon" and
 "screen" folder.