(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

// ---------------------------------
// ---------- FootNote----------
// ---------------------------------
// Gère l'affichage des notes de bas de page d'une information.
// ------------------------

;
(function ($, window, document, undefined) {

    var pluginName = 'footerNote';

    // Create the plugin constructor
    function Plugin(element, options) {

        this._name = pluginName;
        this.element = element;
        this._defaults = $.fn.footerNote.defaults;

        this.options = $.extend({}, this._defaults, options);
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        // Initialization logic
        init: function () {
            this.buildCache();
            this.bindEvents();
            this.render();
        },
        // Cache DOM nodes for performance
        buildCache: function () {
            this.$element = $(this.element);
            this.$infos = $('*[data-fnote]');
        },
        // Bind events that trigger methods
        bindEvents: function () {
            var plugin = this;
            /*plugin.$elements.on('show' + '.' + plugin._name, function () {
             plugin.render.call(plugin);
             });
             plugin.$elements.on('hide' + '.' + plugin._name, function () {
             plugin.render.call(plugin);
             });*/
        },
        //print foot note in the page
        render: function () {
            this.buildCache();
            console.log('Je suis render');
            this.printExponent();
            this.printFootNote.call(this, this.checkOccurence());
        },
        printExponent: function () {
            var element;
            var html;
            this.$infos.each(function () {
                element = $(this);
                if (!element.find('span.exponent').length > 0) {
                    html = '<span class="exponent">';
                    $.each(element.data('fnote'), function (index, value) {
                        html += '(' + ((value) + 1) + ')';
                    });
                    html += '</span>';
                    element.append(html);
                }
            });
        },
        checkOccurence: function () {
            var occurence = [];
            this.$infos.each(function () {
                    $.each($(this).data('fnote'), function (index, value) {
                        if ($.inArray(value, occurence) < 0) {
                            occurence.push(value);
                        }
                    });
            });
            return occurence;
        },
        printFootNote: function (occurence) {
            var footContainer = this.$element;
            footContainer.empty();
            console.log(occurence);
            $.each(this.options.registry, function (index, value) {
                console.log(index);
                console.log($.isArray(index, occurence)>-1);
                if (occurence.indexOf(index)>-1){
                    footContainer.append('<li><span>(' + (index + 1) + ')</span> ' + value + '</li>');
                }
            });
        },
        callback: function () {
            // Cache onComplete option
            var onComplete = this.options.onComplete;

            if (typeof onComplete === 'function') {
                onComplete.call(this.element);
            }
        }
    });

    $.fn.footerNote = function (options) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var item = $(this), instance = item.data("plugin_" + pluginName);
            if (!instance) {
                item.data("plugin_" + pluginName, new Plugin(this, options));
            } else {
                if (typeof options === 'string') {
                    instance[options].apply(instance, args);
                }
            }
        });
    };

    $.fn.footerNote.defaults = {
        registry: []
    };

})(jQuery, window, document);