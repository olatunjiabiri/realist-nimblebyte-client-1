/*! For license information please see 886.eb956e81.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[886],{2886:function(e,t,n){n.r(t),n.d(t,{KEYBOARD_DID_CLOSE:function(){return o},KEYBOARD_DID_OPEN:function(){return r},copyVisualViewport:function(){return D},keyboardDidClose:function(){return l},keyboardDidOpen:function(){return g},keyboardDidResize:function(){return b},resetKeyboardAssist:function(){return s},setKeyboardClose:function(){return p},setKeyboardOpen:function(){return h},startKeyboardAssist:function(){return c},trackViewportChanges:function(){return y}});var i=n(6184),r="ionKeyboardDidShow",o="ionKeyboardDidHide",u={},f={},a=!1,s=function(){u={},f={},a=!1},c=function(e){if(i.K.getEngine())d(e);else{if(!e.visualViewport)return;f=D(e.visualViewport),e.visualViewport.onresize=function(){y(e),g()||b(e)?h(e):l(e)&&p(e)}}},d=function(e){e.addEventListener("keyboardDidShow",(function(t){return h(e,t)})),e.addEventListener("keyboardDidHide",(function(){return p(e)}))},h=function(e,t){w(e,t),a=!0},p=function(e){v(e),a=!1},g=function(){var e=(u.height-f.height)*f.scale;return!a&&u.width===f.width&&e>150},b=function(e){return a&&!l(e)},l=function(e){return a&&f.height===e.innerHeight},w=function(e,t){var n=t?t.keyboardHeight:e.innerHeight-f.height,i=new CustomEvent(r,{detail:{keyboardHeight:n}});e.dispatchEvent(i)},v=function(e){var t=new CustomEvent(o);e.dispatchEvent(t)},y=function(e){u=Object.assign({},f),f=D(e.visualViewport)},D=function(e){return{width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale}}}}]);
//# sourceMappingURL=886.eb956e81.chunk.js.map