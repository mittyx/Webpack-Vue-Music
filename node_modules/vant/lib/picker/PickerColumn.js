'use strict';

exports.__esModule = true;

var _create = require('../utils/create');

var _create2 = _interopRequireDefault(_create);

var _deepClone = require('../utils/deep-clone');

var _deepClone2 = _interopRequireDefault(_deepClone);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_DURATION = 200;
var range = function range(num, arr) {
  return Math.min(Math.max(num, arr[0]), arr[1]);
};

exports.default = (0, _create2.default)({
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.b(), _vm.className], style: _vm.columnStyle, on: { "touchstart": _vm.onTouchStart, "touchmove": function touchmove($event) {
          $event.preventDefault();return _vm.onTouchMove($event);
        }, "touchend": _vm.onTouchEnd, "touchcancel": _vm.onTouchEnd } }, [_c('ul', { style: _vm.wrapperStyle }, _vm._l(_vm.options, function (option, index) {
      return _c('li', { staticClass: "van-ellipsis", class: _vm.b('item', {
          disabled: _vm.isDisabled(option),
          selected: index === _vm.currentIndex
        }), style: _vm.optionStyle, domProps: { "innerHTML": _vm._s(_vm.getOptionText(option)) }, on: { "click": function click($event) {
            _vm.setIndex(index, true);
          } } });
    }))]);
  },

  name: 'picker-column',

  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    visibleItemCount: Number,
    initialOptions: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },

  data: function data() {
    return {
      startY: 0,
      offset: 0,
      duration: 0,
      startOffset: 0,
      options: (0, _deepClone2.default)(this.initialOptions),
      currentIndex: this.defaultIndex
    };
  },
  created: function created() {
    this.$parent.children && this.$parent.children.push(this);
    this.setIndex(this.currentIndex);
  },
  destroyed: function destroyed() {
    this.$parent.children && this.$parent.children.splice(this.$parent.children.indexOf(this), 1);
  },

  watch: {
    defaultIndex: function defaultIndex() {
      this.setIndex(this.defaultIndex);
    }
  },

  computed: {
    count: function count() {
      return this.options.length;
    },
    baseOffset: function baseOffset() {
      return this.itemHeight * (this.visibleItemCount - 1) / 2;
    },
    columnStyle: function columnStyle() {
      return {
        height: this.itemHeight * this.visibleItemCount + 'px'
      };
    },
    wrapperStyle: function wrapperStyle() {
      return {
        transition: this.duration + 'ms',
        transform: 'translate3d(0, ' + (this.offset + this.baseOffset) + 'px, 0)',
        lineHeight: this.itemHeight + 'px'
      };
    },
    optionStyle: function optionStyle() {
      return {
        height: this.itemHeight + 'px'
      };
    }
  },

  methods: {
    onTouchStart: function onTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startOffset = this.offset;
      this.duration = 0;
    },
    onTouchMove: function onTouchMove(event) {
      var deltaY = event.touches[0].clientY - this.startY;
      this.offset = range(this.startOffset + deltaY, [-(this.count * this.itemHeight), this.itemHeight]);
    },
    onTouchEnd: function onTouchEnd() {
      if (this.offset !== this.startOffset) {
        this.duration = DEFAULT_DURATION;
        var index = range(Math.round(-this.offset / this.itemHeight), [0, this.count - 1]);
        this.setIndex(index, true);
      }
    },
    adjustIndex: function adjustIndex(index) {
      index = range(index, [0, this.count]);
      for (var i = index; i < this.count; i++) {
        if (!this.isDisabled(this.options[i])) return i;
      }
      for (var _i = index - 1; _i >= 0; _i--) {
        if (!this.isDisabled(this.options[_i])) return _i;
      }
    },
    isDisabled: function isDisabled(option) {
      return (0, _utils.isObj)(option) && option.disabled;
    },
    getOptionText: function getOptionText(option) {
      return (0, _utils.isObj)(option) && this.valueKey in option ? option[this.valueKey] : option;
    },
    setIndex: function setIndex(index, userAction) {
      index = this.adjustIndex(index) || 0;
      this.offset = -index * this.itemHeight;

      if (index !== this.currentIndex) {
        this.currentIndex = index;
        userAction && this.$emit('change', index);
      }
    },
    setValue: function setValue(value) {
      var options = this.options;

      for (var i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
    },
    getValue: function getValue() {
      return this.options[this.currentIndex];
    }
  }
});