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
        $landingPage,
        treshold;

    function init() {
        $landingPage = $('.landing-page');
        $navbar = $('.navbar');
        if (!($navbar.length > 0 && $landingPage.length > 0)) return;
        calcSize();
        bindEvents();
    }

    function calcSize() {
        treshold = $navbar.outerHeight();
    }

    function onScroll() {
        var scrollTop = $(window).scrollTop();
        var action = scrollTop > treshold ? 'add' : 'remove';
        $navbar[action + 'Class']('navbar-inverse');
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
 * Parallax Image
 */
(function(global) {
    var $window,
        image,
        headSection,
        height,
        raf = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame,
        scrollTop,
        ticking,
        factor = 0.4// factor < 1

    function init() {
        headSection = document.querySelector('.head-section');
        image = document.querySelector('.head-image');
        if (!headSection && !image) return;
        $window = $(window);
        calcSize();
        bindEvents();
    }

    function calcSize() {
        height = headSection.offsetHeight;
    }

    function requestTick() {
        if(!ticking) {
            raf(update);
        }
        ticking = true;
    }

    function update() {
        image.style.transform = 'translate3d(0, ' + scrollTop * factor + 'px, 0)';
        image.style.opacity = 1 - scrollTop / height;
        ticking = false;
    }

    function onScroll() {
        scrollTop = $window.scrollTop();
        if (scrollTop > height) return;
        requestTick();
    }

    function bindEvents() {
        $window.on('scroll', onScroll);
        $window.on('resize', calcSize);
    }

    global.parallaxImageModule = {
        init: init,
        calcSize: calcSize
    }
})(window);


/**
 * Reaveal Scroll Effects on Home page
 * using ScrollTrigger library
 */
(function(global) {
    var trigger;

    function init() {
        if (typeof window.ScrollTrigger !== 'function') return;
        trigger = new ScrollTrigger({
            toggle: {
                visible: 'scroll-show',
                hidden: 'scroll-hide'
            },
            offset: {
                x: 0,
                y: 100
            },
            once: true
        });
    }

    global.scrollRevealModule = {
        init: init
    };
})(window);


/**
 * Scrollable tabs
 */
(function(global) {
    var tabs,
        $tabs;

    function init() {
        tabs = document.querySelector('.features-tabs');
        if (!tabs) return;
        $tabs = $(tabs);
        $(window).on('resize', onResize);
        onResize();
    }

    function onResize() {
        var isOverflow  = tabs.scrollWidth > tabs.offsetWidth;
        var action = isOverflow ? 'add' : 'remove';
        $tabs[action + 'Class']('scrollable');
    }

    global.tabsModule = {
        init: init
    }
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
 * Password inputs UI
 */
(function(global) {
    function init() {
        $(document).on('click', '.reveal-field-control', function(e) {
            var $field = $(e.target).closest('.reveal-field');
            var $input = $field.find('input');
            $field.toggleClass('off');
            var isOff = $field.hasClass('off');
            $input.get(0).type = isOff ? 'text' : 'password';
        });
    }

    global.passwordsInputsModule = {
        init: init
    }
})(window);


/**
 * User Menu
 */
(function(global) {
    var $menu, $menuTrigger;

    function init() {
        $menu = $('.user-block');
        $menuTrigger = $menu.find('.user-avatar');
        if (!($menu.length > 0 && $menuTrigger.length > 0)) return;

        $menuTrigger.on('click', function() {
            $menu.toggleClass('open');
        });

        $(document).on('click', function(e) {
            if (!$menu.get(0).contains(e.target)) {
                $menu.removeClass('open');
            }
        });
    }

    global.menuModule = {
        init: init
    };
})(window);


/**
 * Project menu
 */
(function(global) {
    var MENU_SELECTOR = '.project-menu';
    var TRIGGER_SELECTOR = '.project-menu-trigger';

    function init() {
        var $triggers = $(TRIGGER_SELECTOR);
        if (!$triggers.length) return;

        $(document).on('click', TRIGGER_SELECTOR, function(e) {
            var $menu = $(e.target)
                .closest(MENU_SELECTOR)
                .toggleClass('open');
        });

        $(document).on('click', function(e) {
            var $menu = $(e.target).closest(MENU_SELECTOR);
            if ($menu.length && $menu.get(0).contains(e.target)) {
                $(MENU_SELECTOR)
                    .not($menu)
                    .removeClass('open');
            } else {
                $(MENU_SELECTOR)
                    .removeClass('open');
            }
        })
    }

    global.projectMenuModule = {
        init: init
    }
})(window);


/**
 * init scripts
 */
$(function() {
    window.headerModule && window.headerModule.init();
    window.parallaxImageModule && window.parallaxImageModule.init();
    window.scrollRevealModule && window.scrollRevealModule.init();
    window.tabsModule && window.tabsModule.init();
    window.formsModule && window.formsModule.init();
    window.passwordsInputsModule && window.passwordsInputsModule.init();
    window.menuModule && window.menuModule.init();
    window.projectMenuModule && window.projectMenuModule.init();
});