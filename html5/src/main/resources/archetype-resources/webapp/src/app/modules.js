'use strict';

/**
 * DECLARATION OF THE MODULES AND THEIR DEPENDENCIES
 */

angular.module('data', ['mfcore']);
angular.module('actions', ['data', 'mfcore']);
angular.module('init', ['data', 'mfcore']);

angular.module('view_config', ['mfui', 'data']);
angular.module('view_splashscreen', ['mfui', 'data']);

//@generated-start[module-declaration][X]
//@generated-end


angular.module('MFApplication', [
    'templates-fwk',
    'templates-app',

    'mfcore',
    'mfui',
    'data',
    'actions',
    'init',

  //@generated-start[module-imports][X]
  //@generated-end

    'view_splashscreen',
    'view_config'

]);