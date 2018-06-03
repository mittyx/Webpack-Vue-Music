'use strict';

exports.__esModule = true;

var _create = require('../utils/create');

var _create2 = _interopRequireDefault(_create);

var _popup = require('../mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_LIST = ['success', 'fail', 'loading'];

exports.default = (0, _create2.default)({
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "van-fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.value, expression: "value" }], class: _vm.b([_vm.style, _vm.position]) }, [_vm.style === 'text' ? _c('div', [_vm._v(_vm._s(_vm.message))]) : _vm._e(), _vm.style === 'html' ? _c('div', { domProps: { "innerHTML": _vm._s(_vm.message) } }) : _vm._e(), _vm.style === 'default' ? [_vm.type === 'loading' ? _c('loading', { attrs: { "color": "white", "type": _vm.loadingType } }) : _c('icon', { class: _vm.b('icon'), attrs: { "name": _vm.type } }), _vm.isDef(_vm.message) ? _c('div', { class: _vm.b('text') }, [_vm._v(_vm._s(_vm.message))]) : _vm._e()] : _vm._e()], 2)]);
  },

  name: 'toast',

  mixins: [_popup2.default],

  props: {
    forbidClick: Boolean,
    message: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    loadingType: {
      type: String,
      default: 'circular'
    },
    position: {
      type: String,
      default: 'middle'
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      clickable: false
    };
  },

  computed: {
    style: function style() {
      return STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : this.type;
    }
  },

  mounted: function mounted() {
    this.toggleClickale();
  },

  watch: {
    value: function value() {
      this.toggleClickale();
    },
    forbidClick: function forbidClick() {
      this.toggleClickale();
    }
  },

  methods: {
    toggleClickale: function toggleClickale() {
      var clickable = this.value && this.forbidClick;
      if (this.clickable !== clickable) {
        this.clickable = clickable;
        var action = clickable ? 'add' : 'remove';
        document.body.classList[action]('van-toast--unclickable');
      }
    }
  }
});