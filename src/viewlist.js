
var EVENT = 'init inited update updated destroy'.split(' ').reduce(function (obj, key) {
  obj[key] = key;
  return obj;
}, {});

import { Observable } from './observable';
import { View } from './view';
import { define, extendable, inherits } from './utils';

export function ViewList (options) {
  if (!(this instanceof ViewList)) {
    return new ViewList(options);
  }

  Observable.call(this);

  this.lookup = {};
  this.views = [];

  if (typeof options === 'function') {
    this.View = options;
  } else {
    for (var key in options) {
      if (EVENT[key]) {
        this.on(key, options[key]);
      } else {
        this[key] = options[key];
      }
    }
  }
  this.trigger(EVENT.init);
  this.trigger(EVENT.inited);
}

inherits(ViewList, Observable);

define(ViewList.prototype, {
  update: function (data) {
    this.trigger(EVENT.update, data);

    var viewList = this;
    var views = new Array(data.length);
    var lookup = {};
    var currentViews = this.views;
    var currentLookup = this.lookup;
    var key = this.key;

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var id = key && item[key];
      var ViewClass = this.View || this.view || View;
      var view = (key ? currentLookup[id] : currentViews[i]) || new ViewClass();

      if (key) lookup[id] = view;

      views[i] = view;
      view.update(item);
    }
    if (key) {
      for (var id in currentLookup) {
        if (!lookup[id]) {
          currentLookup[id].destroy();
        }
      }
    } else {
      for (var i = views.length; i < currentViews.length; i++) {
        currentViews[i].destroy();
      }
    }
    this.views = views;
    this.lookup = lookup;
    if (this.parent) this.parent.setChildren(views);

    this.trigger(EVENT.updated);
  },
  destroy: function () {
    this.trigger(EVENT.destroy);
    this.update([]);
    this.off();
  }
});

extendable(ViewList);

export var viewlist = ViewList;
export var viewList = ViewList;