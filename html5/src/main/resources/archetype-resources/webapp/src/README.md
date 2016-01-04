# The `src` Directory

## Overview

The `src/` directory contains all code used in the application along with all
tests of such code.

```
src/
  |- app/
  |  |- actions/
  |  |- data/
  |  |- init/
  |  |- views/
  |  |- app.js
  |  |- modules.js
  |- assets/
  |  |- config/
  |  |- data/
  |  |- pictures/
  |  |- styles/
  |- index.html
  |- test
     |- e2e
     |- unit
```

- `src/app/` - application-specific code
- `src/assets/` - static files like fonts and images. 
  [Read more &raquo;](assets/README.md)
- `src/assets/styles/` - SASS CSS files. [Read more &raquo;](assets/styles/README.md)
- `src/index.html` - this is the HTML document of the single-page application.
  See below.
- `test` - unit and e2e tests


See each directory for a detailed explanation.

## `index.html`

The `index.html` file is the HTML document of the single-page application (SPA)
that should contain all markup that applies to everything in the app, such as
the header and footer. It declares with `ngApp` that this is `ngBoilerplate`,
specifies the main `AppCtrl` controller, and contains the `ngView` directive
into which route templates are placed.

