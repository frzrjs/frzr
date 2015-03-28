(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.frzr=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function clean(e){e.innerHTML=""}module.exports=clean},{}],2:[function(require,module,exports){"use strict";module.exports=function(e,t,o){Object.defineProperty(e,t,{value:o})}},{}],3:[function(require,module,exports){"use strict";function each(e,t){for(var c=e.length,o=0;c>o;o++)t(e[o],o)}module.exports=each},{}],4:[function(require,module,exports){"use strict";function eachReverse(e,r){for(var s=e.length,t=s;t;t--)r(e[t-1],t-1)}module.exports=eachReverse},{}],5:[function(require,module,exports){"use strict";var frzr={tags:{}};module.exports=frzr,frzr.clean=require(1),frzr.defProperty=require(2),frzr.each=require(3),frzr.eachReverse=require(4),frzr.observable=require(11),frzr.inherits=require(12),frzr.tag=require(9),frzr.times=require(10),frzr.mount=require(6),frzr.mountAll=require(7),frzr.parse=require(8),frzr.observable.prototype.one=frzr.observable.prototype.once,frzr.observable.prototype.trigger=frzr.observable.prototype.emit},{1:1,10:10,11:11,12:12,2:2,3:3,4:4,6:6,7:7,8:8,9:9}],6:[function(require,module,exports){"use strict";function mount(r,t,n){var o=new Tag(frzr.tags[t],r,n);return o}function Tag(r,t,n){var o=this,e=o instanceof Tag;if(!e)return new Tag(r,t,n);var i=r.tmpl.cloneNode(!0);o.$root=t,o.$el=i;for(var u in n)o[u]=n[u];r.constructor&&r.constructor.call(o),t&&requestAnimationFrame(function(){t.appendChild(i),o.trigger("mount"),o.$mounted=!0})}var frzr=require(5);module.exports=mount,frzr.inherits(Tag,frzr.observable);var proto=Tag.prototype;proto.$find=function(r){return this.$el.querySelector(r)},proto.$findAll=function(r){return this.$el.querySelectorAll(r)},proto.update=function(r){var t=this;t.trigger("update",t);var r=r||{};for(var n in r)t[n]=r[n];t.trigger("updated",t)},proto.mount=function(r,t,n){var o=this,r=r;"string"==typeof r&&(r=o.$find(r));var e=frzr.mount(r,t,n);return e.$parent=o,e},proto.mountAll=function(r,t,n){var o=this,r=r;"string"==typeof r&&(r=o.$find(r));var e=frzr.mountAll(r,t,n);return e.$parent=o,e},proto.unmount=function(){var r=this;r.trigger("unmount"),r.off(),r.$root.removeChild(r.$el)}},{5:5}],7:[function(require,module,exports){"use strict";function mountAll(e,t,r){return Tags(r,e,t)}function Tags(e,t,r){var o=this,n=o instanceof Tags;return n?(o.$root="string"==typeof t?o.$find(t):t,o.$tags=[],o.$rendered=[],o.$items=e,o.$tagName=r,o.$uid=1,o.$posLookup=[],void requestAnimationFrame(function(){frzr.tags[r].constructor2&&frzr.tags[r].constructor2.call(o),o.update()})):new Tags(e,t,r)}var frzr=require(5);module.exports=mountAll,frzr.inherits(Tags,frzr.observable);var proto=Tags.prototype;proto.update=function(e){var t,r,o=this,n=0;e&&(o.$items=e),o.trigger("update",o.$items);var i=[];frzr.each(o.$items,function(e,t){e.$uid||(frzr.defProperty(e,"$uid",o.$uid),o.$uid++),i[e.$uid]=t});var u,a={create:0,move:0,remove:0},s=[];frzr.each(o.$rendered,function(e){var t=i[e.$uid],r=o.$tags[e.$uid];return void 0===t?(a.remove++,s.push(function(){r.unmount()}),delete o.$tags[e.$uid],void n--):void(r.offset=n)}),n=0,frzr.each(o.$items,function(e,r){var i,d=o.$posLookup[e.$uid];void 0===d?(a.create++,i=frzr.mount(void 0,o.$tagName,e),i.$item=e,i.$parent=o,i.$root=o.$root,i.offset+=n,o.$tags[e.$uid]=i,u||(u=!0,s.push(function(){t=document.createDocumentFragment()})),s.push(function(){t.appendChild(i.$el)}),n++):(i=o.$tags[e.$uid],i.offset+=n,r!==d+i.offset?(a.move++,u||(u=!0,s.push(function(){t=document.createDocumentFragment()})),s.push(function(){t.appendChild(i.$el)})):u&&(u=!1,s.push(function(){o.$root.insertBefore(t,i.$el)})))}),o.trigger("updated",o.$items),o.trigger("render");var d=o.parentNode;d&&a.create+a.move>o.$items.length/5&&(r=document.createComment(""),d.replaceChild(r,o.$root)),frzr.each(s,function(e){e()}),u&&o.$root.appendChild(t),r&&d.replaceChild(o.$root,r),o.trigger("rendered"),o.$rendered=o.$items.slice(),o.$posLookup=i},proto.mount=function(e,t,r){var o=this,e=e;"string"==typeof e&&(e=o.$find(e));var n=frzr.mount(e,t,r);return n.$parent=o,n},proto.mountAll=function(e,t,r){var o=this,e=e;"string"==typeof e&&(e=o.$find(e));var n=frzr.mountAll(e,t,r);return n.$parent=o,n},proto.unmount=function(){self.update([]),self.trigger("unmount"),self.off()}},{5:5}],8:[function(require,module,exports){"use strict";function parse(e){return"string"==typeof e?document.querySelector(e).innerHTML:e.innerHTML}module.exports=parse},{}],9:[function(require,module,exports){"use strict";function Tag(t,e,r,s){if(templates[t])return templates[t].childNodes[0].cloneNode();var a,e=String(e||"").trim();a=document.createElement(startsWith(e,["<td>"])?"tr":startsWith(e,["<tr>","<td>"])?"tbody":startsWith(e,["<thead>","<tbody>"])?"table":"div"),templates[t]=a,a.innerHTML=e,frzr.tags[t]={constructor:r,constructor2:s,tmpl:templates[t].childNodes[0]}}function startsWith(t,e){for(var r,s=e.length,a=0;s>a;a++)if(t.slice(0,e[a].length)===e[a]){r=!0;break}return r}var frzr=require(5),templates={};module.exports=Tag},{5:5}],10:[function(require,module,exports){"use strict";function times(t,e){for(var s=0;t>s;s++)e(s)}module.exports=times},{}],11:[function(require,module,exports){function Emitter(t){return t?mixin(t):void 0}function mixin(t){for(var e in Emitter.prototype)t[e]=Emitter.prototype[e];return t}module.exports=Emitter,Emitter.prototype.on=Emitter.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},Emitter.prototype.once=function(t,e){function i(){this.off(t,i),e.apply(this,arguments)}return i.fn=e,this.on(t,i),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var i=this._callbacks["$"+t];if(!i)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,s=0;s<i.length;s++)if(r=i[s],r===e||r.fn===e){i.splice(s,1);break}return this},Emitter.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),i=this._callbacks["$"+t];if(i){i=i.slice(0);for(var r=0,s=i.length;s>r;++r)i[r].apply(this,e)}return this},Emitter.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},Emitter.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],12:[function(require,module,exports){module.exports="function"==typeof Object.create?function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t}},{}]},{},[5])(5)});