dm.globalComponentFactory("forms", function ($) {
	var context = {};
    
	//Add custom validation methods
	if ($.validator) {
        //VALIDATEDATEOFBIRTH
        var validationType = "validatedateofbirth";
        if ($.validator.unobtrusive) {
            $.validator.unobtrusive.adapters.add(validationType, ['yearproperty', 'monthproperty', 'dayproperty'], function (options) {
                options.rules[validationType] = {
                    yearSelector: "#" + options.params.yearproperty,
                    monthSelector: "#" + options.params.monthproperty,
                    daySelector: "#" + options.params.dayproperty
                };
                options.messages[validationType] = options.message;
            }, '');
        }            
        $.validator.addMethod(validationType, function (value, element, params) {
            var date = $(params.monthSelector).val() + "/" + $(params.daySelector).val() + "/" + $(params.yearSelector).val();
            return dm.utilities.date.isDate(date);
        });
        
        //VALIDATEDATEDOBRESTRICTION
        validationType = "validatedatedobrestriction";
        if ($.validator.unobtrusive) {
            $.validator.unobtrusive.adapters.add(validationType, ['yearproperty', 'monthproperty', 'dayproperty', 'agelimitproperty', 'mindateproperty'], function (options) {
                options.rules[validationType] = {
                    yearSelector: "#" + options.params.yearproperty,
                    monthSelector: "#" + options.params.monthproperty,
                    daySelector: "#" + options.params.dayproperty,
                    ageLimit: options.params.agelimitproperty,
                    minDate: options.params.mindateproperty
                };
                options.messages[validationType] = options.message;
            }, '');
        }
        $.validator.addMethod(validationType, function (value, element, params) {
            var date = $(params.monthSelector).val() + "/" + $(params.daySelector).val() + "/" + $(params.yearSelector).val();
            if (dm.utilities.date.isDate(date)) {
                var dob = new Date($(params.yearSelector).val(), $(params.monthSelector).val() - 1, $(params.daySelector).val());

                if (params.minDate.length > 0) {
                    var dateProps = params.minDate.split("/");
                    var minDate = new Date(dateProps[2], dateProps[1] - 1, dateProps[0]);
                    if (dob < minDate) {
                        return false;
                    }
                }

                var today = new Date();

                var age = today.getFullYear() - dob.getFullYear();
                if (dob > today.setFullYear(today.getFullYear() - age)) age--;

                if (age < params.ageLimit) {
                    return false;
                }

                return true;
            }

            return false;
        });
        
        //SELECTONE
        validationType = "selectone";
        if ($.validator) {
            $.validator.addMethod(validationType, function (value, element, params) {                                    
                return $('input[name=' + $(element).attr('name') + ']:checked').length > 0;
            });
        }           
        if ($.validator.unobtrusive) {
            $.validator.unobtrusive.adapters.addBool("selectone")
        }        
        
        $.validator.addMethod("mustbetrue", function (value, element, param) {
            return element.checked;
        });
        if ($.validator.unobtrusive) {
            $.validator.unobtrusive.adapters.addBool("mustbetrue");
        }
        
        //Set additional setting for jquery validation here.
        var setJqueryValidationDefaults = function (options) {
            var defaults = dm.config.forms.jqueryValidateDefaults;
            var settings = jQuery.extend(true, defaults, options);
    
            $.validator.setDefaults(settings);
        };
        
        setJqueryValidationDefaults(context.jqueryValDefaults || {});  
    }
    
    //Defaults for jquery validation. These should not be changed and are only used if
    //in sites using stock jquery validation plugin. ASP.NET MVC sites will not use
    //the below values.
    context.errorClass = "field-validation-error";
    context.validClass = "field-validation-valid";
    context.errorElement = "span";
    context.errorPlacement = function (error, element) {
        var name = $(element).attr('name');
        error.appendTo($('[data-valmsg-for="' + name + '"]'));
    };
    
    return context;
      
}, {
    terms: {
		selector: '.terms'
	},
    jqueryValidateDefaults: {
        ignore: null,
        highlight: function (element, errorClass, validClass) {
            if (!$.validator.unobtrusive) {
                errorClass = "input-validation-error";
                validClass = "input-validation-valid";
                $(element).addClass(errorClass).removeClass(validClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if (!$.validator.unobtrusive) {
                errorClass = "input-validation-error";
                validClass = "input-validation-valid";
                $(element).removeClass(errorClass).addClass(validClass);
            }
        }
    }
}, [jQuery]);