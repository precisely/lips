javascript:(function(next) {
    /**
     * This is bookmarklet that will create terminal with LIPS REPL
     *
     * Copyright (C) Jakub T. Jankiewicz <https://jcubic.pl>
     * Released under MIT license
     */
    if (window.jQuery) {
        return next(window.jQuery);
    }
    function attr(elem, key, value) {
        elem.setAttribute(document.createAttribute(key, value));
    }
    var script = (function() {
        var head = document.getElementsByTagName('head')[0];
        return function(src) {
            var script = document.createElement('script');
            script.setAttribute('src', src);
            script.setAttribute('type', 'text/javascript');
            head.appendChild(script);
            return script;
        };
    })();
    script('https://code.jquery.com/jquery-3.5.0.min.js');
    (function delay(time) {
        if (typeof jQuery == 'undefined') {
            setTimeout(delay, time);
        } else {
            next($.noConflict());
        }
    })(500);
})(function($) {
    const REF = 'devel';
    function init(boostrap) {
        var t = $('div.terminal');
        if (t.length) {
            t.each(function() {
                $(this).terminal().destroy().remove();
            });
        }
        $.terminal.defaults.formatters = $.terminal.defaults.formatters.filter((x) => {
            return x.name !== 'syntax_scheme';
        });
        $.terminal.syntax("scheme");
        $('.shell-wrapper').remove();
        var wrapper = $('<div>').addClass('shell-wrapper').appendTo('body');
        var nav = $('<nav/>').appendTo(wrapper);
        var pos; $(document).off('mousemove');
        var height;
        $('nav').off('mousedown mousemove mouseup').mouseup(function() {
            pos = null;
        }).mousedown(function(e) {
            height = wrapper.height();
            pos = e.clientY;
            return false;
        });
        $(document).off('mousemove.terminal').on('mousemove.terminal', function(e) {
            if (pos) {
                wrapper.height(height + (pos - e.clientY));
            }
        });
        $('<span class="shell-destroy">[x]</span>').click(function() {
            term.destroy();
            wrapper.remove();
        }).appendTo(nav);
        var term = terminal({ selector: $('<div>').appendTo('body'), name: 'lips', lips });
        if (boostrap) {
            var path = `https://cdn.jsdelivr.net/gh/jcubic/lips@${REF}/`;
            term.exec([
                '(load "' + path + 'lib/bootstrap.scm")',
                '(load "' + path + 'lib/R5RS.scm")',
                '(load "' + path + 'examples/helpers.scm")',
                '(load "' + path + 'examples/defstruct.scm")'
            ].join('\n'), true);
        }
        term.echo(lips.banner.replace(/^[\s\S]+(LIPS.*\nCopy.*\n)[\s\S]*/, '$1'), {formatters: false});
        term.appendTo(wrapper);
        $('style.terminal').remove();
        $('<style class="terminal">.terminal { font-size-adjust: none; --size: 1.2;height: calc(100% - 26px); } .shell-wrapper nav {cursor: row-resize; color:#ccc;border-bottom:1px solid #ccc;font-family:monospace;text-align: right;background: black;} .shell-wrapper {position: fixed;z-index:99999;bottom:0;left:0;right:0;height:150px; }.shell-destroy {padding: 5px;cursor:pointer;display: inline-block;}</style>').appendTo('head');
    }
    ['https://unpkg.com/jquery.terminal/css/jquery.terminal.min.css',
     'https://unpkg.com/prismjs/themes/prism-coy.css'
    ].forEach(function(url) {
        if (!$('link[href="' + url + '"]').length) {
            var link = $('<link href="' + url + '" rel="stylesheet"/>');
            var head = $('head');
            if (head.length) {
                link.appendTo(head);
            } else {
                link.appendTo('body');
            }
           }
    });
    if ($.terminal && $.terminal.prism) {
        init();
    } else {
        var scripts = [
            'https://unpkg.com/jquery.terminal/js/jquery.terminal.min.js',
            'https://unpkg.com/js-polyfills/keyboard.js',
            'https://unpkg.com/prismjs/prism.js',
            'https://unpkg.com/jquery.terminal/js/prism.js',
            'https://unpkg.com/prismjs/components/prism-scheme.min.js',
            `https://cdn.jsdelivr.net/gh/jcubic/lips@${REF}/examples/terminal.js`,
            `https://cdn.jsdelivr.net/gh/jcubic/lips@${REF}/examples/prism.js`
        ];
        (function recur() {
            var script = scripts.shift();
            if (!script) {
                if (window.lips) {
                    init();
                } else {
                    $.getScript(`https://cdn.jsdelivr.net/gh/jcubic/lips@${REF}/dist/lips.js`, () => {
                        init(true);
                    });
                }
            } else {
                $.getScript(script, recur);
            }
        })();
    }
});