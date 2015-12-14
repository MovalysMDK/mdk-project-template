# The `views` Directory

## Overview

The `views/` directory contains all the panels of the generated app.

```
views/
  |- configScreen/
  |	 |- vm/
  |  |  |- ConfigVM.js  
  |  |  |- ConfigVMFactory.js
  |  |- config.html
  |  |- ConfigCtrl.js  
  |  |- ConfigDataLoader.js  
  |  |- SaveConfigAction.js
  |- splashscreen/
  |	 |- vm/
  |  |- splashscreen.html
  |  |- SplashScreenCtrl.js  
For each screen
  |- screen/
  |  |- screen.html
  |  |- ScreenCtrl.js  
And For each panel
  |- panel/
  |	 |- vm/
  |  |  |- PanelVM.js  
  |  |  |- PanelVMFactory.js
  |  |- panel.html
  |  |- PanelCtrl.js  
  |  |- PanelDataLoader.js  
  |  |- SavePanelAction.js (optionnal)
  |  |- DeletePanelAction.js (optionnal)
 


## `panel.html` (partials)

All the  `panel.html` files are the HTML document corresponding to the templates of each generated panels

They can contain any number of the framework component, such as : 

- mf-urlfield, for any url input
	Mandatory parameters :
  		# mf-field      : name of this field
	Optional parameters :
		# mf-id                 : to set the id of the input field instead of calculating it
		# mf-label              : label to set above this field
		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-onchange           : function to call in controller when change has occurred on input
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-placeholder        : the text inside the input
  		
- mf-phonefield, for phone number input
	Mandatory parameters :
 		# mf-field      : name of this field
	Optional parameters :
  		# mf-id                 : to set the id of the input field instead of calculating it
  		# mf-label              : label to set above this field
  		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-onchange           : function to call in controller when change has occurred on input
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-placeholder        : the text inside the input

- mf-date and mf-date-time, for date inputs (with or without the hours)
	Mandatory parameters :
  		# mf-field      : name of this field
	Optional parameters :
  		# mf-id                 : to set the id of the input field instead of calculating it
  		# mf-label              : label to set above this field
  		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-placeholder        : the text inside the input

- mf-doublefield, for double inputs
	Mandatory parameters :
  		# mf-field          : name of this field
	Optional parameters :
   		# mf-label              : label to set above this field
   		# mf-required           : true if the value of this field cannot be null
   		# mf-readonly           : true if this field is in read-only mode
   		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
   		# mf-placeholder        : the text inside the pristine input
   		# mf-min                : the min value
   		# mf-max                : the max value
   		# mf-integer-min-digits : the min digits for the integer part of the double value
   		# mf-integer-max-digits : the max digits for the integer part of the double value
   		# mf-decimal-min-digits : the min digits for the decimal part of the double value
   		# mf-decimal-max-digits : the max digits for the decimal part of the double value

- mf-value-image, for image enum
	Mandatory parameters :
  		# mf-field      : name of this field
	Optional parameters :
  		# mf-id                 : to set the id of the input field instead of calculating it
  		# mf-label              : label to set above this field
 		# mf-hide-label         : true to set mf-label hidden
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  
- mf-integerfield, for integer inputs
  	Mandatory parameters :
  		# mf-field          : name of this field
	Optional parameters :
  		# mf-label          : label to set above this field
  		# mf-required       : true if the value of this field cannot be null
  		# mf-readonly       : true if this field is in read-only mode
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-placeholder    : the text inside the pristine input
  		# mf-min            : then min value
  		# mf-max            : then max value
  
- mf-textfield, for text inputs, or mf-multilinefield for text inputs in multiple lines
	Mandatory parameters :
  		# mf-field      : name of this field
	Optional parameters :
  		# mf-id                 : to set the id of the input field instead of calculating it
  		# mf-label              : label to set above this field
  		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-placeholder        : the text inside the input
  		# mf-custom-format      : adds a function to apply to the view formatter
  		# mf-custom-validation  : adds a function to apply to the view validation
  		# mf-password           : change the type of the input to password
  		# mf-autocomplete       : sets an autocomplete dropdown to the field. Its value is the name of the scope variable of the array with the autocomplete list
  		# mf-autocomplete-limit : sets the limit of the results shown in the autocomplete dropdown
  		# mf-autocomplete-force : forces the field validation to be one of the elements of the autocomplete list
  		
- mf-signature, for signature inputs
	Mandatory parameters :
  		# mf-field      : name of this field
	Optional parameters :
  		# mf-label              : label to set above this field
  		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file

- mf-slider, for an integer input in the for of a slider 
  	Mandatory parameters :
  		# mf-field          : name of this field
	Optional parameters :
  		# mf-label          : label to set above this field
  		# mf-required       : true if the value of this field cannot be null
  		# mf-readonly       : true if this field is in read-only mode
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-min            : the min value
  		# mf-max            : the max value
  		# mf-step			: the step between two available values
  		
- mf-emailfield, for any email input
	Mandatory parameters :
 		# mf-field      : name of this field
	Optional parameters :
  		# mf-id                 : to set the id of the input field instead of calculating it
  		# mf-label              : label to set above this field
  		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-onchange           : function to call in controller when change has occurred on input
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-placeholder        : the text inside the input
  		
- mf-radiogroup, for radio enumeration inputs (enum were any value can be selected via checkboxes)
	Mandatory parameters :
  		# mf-field                : name of this field
  		# mf-displayed-attributes : attribute(s) of an item object to display as the text value
	Optional parameters :
  		# mf-id                   : to set the id of the input field instead of calculating it
  		# mf-label                : label to set above this field
  		# mf-hide-label           : true to set mf-label hidden
  		# mf-required             : true if the value of this field cannot be null
  		# mf-readonly             : true if this field is in read-only mode
  		# mf-onchange             : function to call in controller when change has occurred on input
  		# mf-css-class-container  : the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-value-attribute      : attribute of an item object considered as the identifier
  		
- mf-checkbox, for checkbox inputs
	Mandatory parameters :
  		# mf-field      : name of this field
	Optional parameters :
  		# mf-id                 : to set the id of the input field instead of calculating it
  		# mf-label              : label to set above this field
  		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		
- mf-address-location, for position inputs (longitude-latitude - map access)
	Mandatory parameters :
  		# mf-field      : name of this field
	Optional parameters :
  		# mf-id                 : to set the id of the input field instead of calculating it
  		# mf-label              : label to set above this field
  		# mf-hide-label         : true to set mf-label hidden
  		# mf-required           : true if the value of this field cannot be null
  		# mf-readonly           : true if this field is in read-only mode
  		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
  		# mf-latitude-placeholder: the text inside the latitude input
  		# mf-longitude-placeholder: the text inside the longitude input

- mf-photo, for photo camera inputs 
	Mandatory parameters :
 		# mf-field      : path to the object in the controller scope mapped with this field
	Optional parameters :
 		# mf-id                 : to set the id of the input field instead of calculating it
 		# mf-label              : label to set above this field
 		# mf-hide-label         : true to set mf-label hidden
 		# mf-required           : true if the value of this field cannot be null
 		# mf-readonly           : true if this field is in read-only mode
 		# mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
 
 - mf-combo, for combobox inputs
 	Mandatory parameters :
  		# mf-field                : name of this field
  		# mf-displayed-attributes : attribute(s) of an item object to display as the text value
	Optional parameters :
        # mf-id                 : to set the id of the input field instead of calculating it
        # mf-label              : label to set above this field
        # mf-hide-label         : true to set mf-label hidden
        # mf-required           : true if the value of this field cannot be null
        # mf-readonly           : true if this field is in read-only mode
        # mf-onchange           : function to call in controller when change has occurred on input
        # mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file
        
 - mf-list, for simple list inputs
	Optional parameters :
        # mf-field              : path to the object in the controller scope mapped with this field
        # mf-custom-click(?)    : method to call when user click in item of the list
        # mf-items-display-step : number of additional items to display when scrolling down
        # mf-row-height         : number of pixels for one row
        # ng-class
        
- mf-textview, for readonly text
   Mandatory parameters :
        # mf-field      : path to the object in the controller scope mapped with this field
   Optional parameters :
        # mf-id                 : to set the id of the input field instead of calculating it
        # mf-label              : label to set above this field
        # mf-hide-label         : true to set mf-label hidden
        # mf-css-class-container: the name of the class containing the custom style. Add your style in the custom scss file

- mf-fixed-list, for a fixed list input
   Mandatory parameters :
        # mf-detail-template: url of html template of item detail
   Optional parameters :
        # mf-field      : path to the object in the controller scope mapped with this field
        # mf-title-head: title in head of fixed list
        # mf-scroll: make the list scrollable