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

    var pluginName = 'footNote';

    // Create the plugin constructor
    function Plugin(options) {

        this._name = pluginName;
        this._defaults = $.footNote.defaults;

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
            this.$elements = $('*[data-fnote]');
            this.$fnoteStorage = $('.footer-note');
            return $.isEmptyObject(this.$fnoteStorage);
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
            if (this.buildCache()) {
                var element;
                console.log('Je suis render');
                console.log(this.$elements);
                this.$elements.each(function () {
                    element = this;
                    element.data('data-fnote').each(function () {
                        element.append('<span class="exponent">(' + this + ')</span>');
                    });
                });
            } else {
                console.log('div of class ".footer-note" is missing in the page');
            }
        },
        hide: function () {
            console.log('je suis hide');
        },
        show: function () {
            console.log('je suis show');
        },
        callback: function () {
            // Cache onComplete option
            var onComplete = this.options.onComplete;

            if (typeof onComplete === 'function') {
                onComplete.call(this.element);
            }
        }
    });

    $.footNote = function (options) {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName, new Plugin(options));
        }
    };

    $.footNote.defaults = {
        registry: []
    };

})(jQuery, window, document);
