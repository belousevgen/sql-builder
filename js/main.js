// IE Mobile Fix. http://getbootstrap.com/getting-started/#support-ie10-width
// Copyright 2014-2015 Twitter, Inc.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
    );
    document.querySelector('head').appendChild(msViewportStyle);
};


/**
 * Fixing Header
 */
(function(global) {
    var $navbar,
        $section,
        headHeight,
        treshold,
        offset = 200; // magic number

    function init() {
        $navbar = $('.navbar');
        $section = $('.head-section');
        if (!($navbar.length > 0 && $section.length > 0)) return;
        calcSize();
        bindEvents();
    }

    function calcSize() {
        headHeight = $section.outerHeight();
        treshold = headHeight - offset;
    }

    function onScroll() {
        var scrollTop = $(window).scrollTop();
        var action = scrollTop > treshold ? 'add' : 'remove';
        $navbar[action + 'Class']('navbar-fixed-top navbar-inverse');
    }

    function bindEvents() {
        $(window).on('scroll', onScroll);
        $(window).on('resize', calcSize);
    }

    function destroy() {
        $(window).off('scroll', onScroll);
        $(window).off('resize', calcSize);
    }

    global.headerModule = {
        init: init,
        calcSize: calcSize,
        destroy: destroy
    };
})(window);


/**
 * Sign-in & Sign-up forms
 */
 (function(global) {
    var $signin,
        $signup;

    function init() {
        $signin = $('#sign-in');
        $signup = $('#sign-up');
        if (!($signin.length > 0 && $signup.length > 0)) return;
        bindEvents();
    }

    function bindEvents() {
        $signin.on('show.bs.modal', function() {
            $signup.modal('hide')
        });
        $signup.on('show.bs.modal', function() {
            $signin.modal('hide')
        })
    }

    window.formsModule = {
        init: init
    }
 })(window);


/**
 * init scripts
 */
$(function() {
    window.headerModule && window.headerModule.init();
    window.formsModule && window.formsModule.init();
});