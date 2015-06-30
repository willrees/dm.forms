/// <reference path="../../typescript.definitions/dm.core.d.ts""/>

(function ($, context) {
    "use strict";   

    (function () {
        if ($.validator) {
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
        }
    })();

    (function () {
        if ($.validator) {
            var validationType = "validatedatedobrestriction";
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
        }
    })();

    (function () {
        context.atLeastSelectOneSelectors = context.atLeastSelectOneSelectors || [];
        context.atLeastSelectOneSelectors.forEach(function (item, index, arr) {
            var validationSelector = item;
            if ($.validator) {
                var validationType = "selectone";

                $.validator.addMethod(validationType, function (value, element, params) {
                    return $('input[name=' + $(element).attr('name') + ']:checked').length > 0;
                });

                $.validator.addClassRules(validationSelector, { "selectone": true });

                var errorMessage = $('.' + validationSelector).eq(0).attr('data-val-required');
                $.validator.messages.selectone = errorMessage;
            }
        });        
    })();

    (function () {
        if ($.validator) {
            $.validator.addMethod("mustbetrue", function (value, element, param) {
                return element.checked;
            });
            if ($.validator.unobtrusive) {
                $.validator.unobtrusive.adapters.addBool("mustbetrue");
            }            
        }
    })();

    var setJqueryValidationDefaults = function (options) {
        var defaults = {
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
        };
        var settings = jQuery.extend(true, defaults, options);

        $.validator.setDefaults(settings);
    };

    //Namespace entry point
    context.init = function () {
        setJqueryValidationDefaults(context.jqueryValDefaults || {});       
    };

    //Defaults for jquery validation. These should not be changed and are only used if
    //in sites using stock jquery validation plugin. ASP.NET MVC sites will not use
    //the below values.
    context.errorClass = "field-validation-error";
    context.validClass = "field-validation-valid";
    context.errorElement = "span";
    context.errorPlacement = function (error, element) {
        var name = $(element).attr('name');
        error.insertAfter($('[data-valmsg-for="' + name + '"]'));
    };

    return context;
})(jQuery, dm.forms);