(function ($, options) {
    "use strict";
    
    //Namespace entry point    
    $(options.selector).each(function () {        
        var $terms = $(this);
        var $form = $terms.parents('form');
        var $btn = $form.find('input[type="submit"],button[type="submit"],a.dm-form-btn-submit');

        var hasRead = function (elment) {
            var $element = $(elment);
            var offset = $element.height();

            if ($element[0].scrollHeight <= ($element[0].scrollTop + offset)) {
                //valid
                return true;
            } else {
                return false;
            }
        };

        $btn.off('click.terms').on('click.terms', function (e) {
            var $errorText = $('*[data-valmsg-for="' + $terms.attr('id') + '"]');
            
            if (hasRead($terms)) {
                //valid
                $errorText.removeClass('validation-error');
                $errorText.addClass('validation-valid');                
            } else {
                //invalid
                $errorText.removeClass('validation-valid');
                $errorText.addClass('validation-error');

                $terms.on('scroll.terms', function (e) {
                    if (hasRead($terms)) {
                        //valid
                        $errorText.removeClass('validation-error');
                        $errorText.addClass('validation-valid');
                        $terms.off('scroll.terms');
                    } else {
                        //invalid
                        $errorText.removeClass('validation-valid');
                        $errorText.addClass('validation-error');
                    }
                });

                if ($form.valid()) {
                    e.preventDefault();
                }
            }
        });
    });
})(jQuery, dm.config.forms.terms);