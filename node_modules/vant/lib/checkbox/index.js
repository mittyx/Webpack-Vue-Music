'use strict';

exports.__esModule = true;

var _create = require('../utils/create');

var _create2 = _interopRequireDefault(_create);

var _findParent = require('../mixins/find-parent');

var _findParent2 = _interopRequireDefault(_findParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.b() }, [_c('div', { class: [_vm.b('icon', [_vm.shape, { disabled: _vm.isDisabled, checked: _vm.checked }])], on: { "click": _vm.toggle } }, [_vm._t("icon", [_c('icon', { attrs: { "name": "success" } })], { checked: _vm.checked })], 2), _vm.$slots.default ? _c('span', { class: _vm.b('label', _vm.labelPosition), on: { "click": function click($event) {
          _vm.toggle('label');
        } } }, [_vm._t("default")], 2) : _vm._e()]);
  },

  name: 'checkbox',

  mixins: [_findParent2.default],

  props: {
    name: null,
    value: null,
    disabled: Boolean,
    labelPosition: String,
    labelDisabled: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: 'round'
    }
  },

  computed: {
    checked: {
      get: function get() {
        return this.parent ? this.parent.value.indexOf(this.name) !== -1 : this.value;
      },
      set: function set(val) {
        var parent = this.parent;

        if (parent) {
          var parentValue = this.parent.value.slice();
          if (val) {
            if (parent.max && parentValue.length >= parent.max) {
              return;
            }
            /* istanbul ignore else */
            if (parentValue.indexOf(this.name) === -1) {
              parentValue.push(this.name);
              parent.$emit('input', parentValue);
            }
          } else {
            var index = parentValue.indexOf(this.name);
            /* istanbul ignore else */
            if (index !== -1) {
              parentValue.splice(index, 1);
              parent.$emit('input', parentValue);
            }
          }
        } else {
          this.$emit('input', val);
        }
      }
    },

    isDisabled: function isDisabled() {
      return this.parent && this.parent.disabled || this.disabled;
    }
  },

  watch: {
    value: function value(val) {
      this.$emit('change', val);
    }
  },

  created: function created() {
    this.findParent('van-checkbox-group');
  },

  methods: {
    toggle: function toggle(target) {
      if (!this.isDisabled && !(target === 'label' && this.labelDisabled)) {
        this.checked = !this.checked;
      }
    }
  }
});