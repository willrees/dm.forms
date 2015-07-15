/// <reference path="../../typescript.definitions/dm.core.d.ts" />

(function ($, context) {
	"use strict";

    //data-dm-form-value
	$('input[data-dm-form-value]').each(function () {
		var $compositeInput = $(this);
	
		//{Day}/{Month}/{Year}
		var format = $compositeInput.data('dm-form-value');
		var selectors = [];
		var tempFormat = format;
		var Control = function (placeholder) {
		    this.placeholder = placeholder;
		    this.selector = this.placeholder.replace('{', '#').replace('}', '');
		};
		Control.prototype.value = function () {
		    return $(this.selector).val();
		};


		while (tempFormat.indexOf('{') >= 0) {
			var placeholder = tempFormat.substr(tempFormat.indexOf("{"), tempFormat.indexOf("}") + 1);
			selectors.push(new Control(placeholder));
			tempFormat = tempFormat.substr(tempFormat.indexOf("}") + 2);
		}

		selectors.forEach(function (item, index, arr) {
			$(item.selector)
				.off('change.dm-form-value')
				.on('change.dm-form-value', function () {
				    var tempFormat = format;

				    var complete = true;
				    arr.forEach(function (item) {
				        var itemVal = item.value();
				        tempFormat = tempFormat.replace(item.placeholder, itemVal);

				        if (itemVal === undefined || itemVal === "") {
				            complete = false;
				        }
				    });

				    $compositeInput.val(tempFormat);

				    if (complete) {
				        $compositeInput.valid();
				    }
				});
		});

	});

	$('*[data-dm-form-mustread]').each(function () {

	    var $submitBtn = $(this);
	    var selector = $submitBtn.data("dm-form-mustread");
	    var $textarea = $(selector);
	    
	    $submitBtn.attr('disabled', 'disabled');
	    $textarea.off('scroll.dm-form-mustread').on('scroll.dm-form-mustread', function () {
	        var offset = $(this).height();
	         
	        if (this.scrollHeight <= (this.scrollTop + offset)) {
	            $submitBtn.removeAttr('disabled');
	        } else {
	            $submitBtn.attr('disabled', 'disabled');
	        }
	    });
	});
	

	return context;
})(jQuery, dm.forms);