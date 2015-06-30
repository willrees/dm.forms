/// <reference path="../../typescript.definitions/dm.core.d.ts""/>

dm.forms = dm.forms || {};

(function(context){
	var defaultOptions = {
		terms: {
			selector: '.terms'
		}
	};
	if (dm.forms.options === undefined) {
		dm.forms.options = defaultOptions;		
	} else {
		dm.forms.options = jQuery.extend(true, defaultOptions, dm.forms.options);
	}
	
})(dm.forms);