// ==UserScript==
// @name         FB->4chan No Captcha
// @namespace    https://github.com/karamazi/userscripts/blob/master/Fb4chanNoCaptcha.js
// @version      0.1
// @description  Fixes 4chan images links in FB chat box, so that they do not generate captcha.
// @updateUrl https://github.com/karamazi/userscripts/blob/master/Fb4chanNoCaptcha.js
// @downloadUrl https://github.com/karamazi/userscripts/blob/master/Fb4chanNoCaptcha.js
// @homepage https://github.com/karamazi/userscripts
// @author       You
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @include http://www.messenger.com/*
// @include https://www.messenger.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function fix_4chan_links(link_class_name, get_ahref_element) {
        var link_span_containers = document.getElementsByClassName(link_class_name);
        for(var i = 0; i< link_span_containers.length ; i++ ) {
            if(!link_span_containers[i].firstElementChild) {
                continue;
            }
            console.log(link_span_containers[i]);
            var link_elements = get_ahref_element(link_span_containers[i]);

            for(var j = 0; j < link_elements.length; j++ ) {
                fix_link(link_elements[j]);
            }
        }
    }

    function fix_link(link_element) {
        var link_text = link_element.innerHTML;
        if (link_text.indexOf("4cdn") !== -1) {
            link_element.setAttribute("href", link_text);
            link_element.setAttribute("rel", "noreferrer");
        }
    }

    function fb_get_ahrefs_from_container(span_container){
        return span_container.firstElementChild.getElementsByTagName('a');
    }
    function messenger_get_ahrefs_from_container(span_container){
        return span_container.getElementsByTagName('a');
    }

    function onTimeout() {
        //facebook small chat window
        fix_4chan_links("_5yl5", fb_get_ahrefs_from_container);

        //messenger + facebook fullscreen chat window
        fix_4chan_links("_3oh- _58nk", messenger_get_ahrefs_from_container);
        window.setTimeout(onTimeout, 1500);
    }
    window.setTimeout(onTimeout, 1500);
    // ToConsider: Call when Ajax reloads messenger window?
})();
