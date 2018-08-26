'use strict';

exports.__esModule = true;

var _create = require('../utils/create');

var _create2 = _interopRequireDefault(_create);

var _field = require('../field');

var _field2 = _interopRequireDefault(_field);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('field', _vm._g({ ref: "field", attrs: { "rows": "1", "autosize": "", "clearable": !_vm.isAndroid, "type": "textarea", "maxlength": "200", "value": _vm.value, "error": _vm.error, "label": _vm.$t('label'), "placeholder": _vm.$t('placeholder') } }, _vm.$listeners), [_vm.showIcon && _vm.isAndroid ? _c('span', { class: _vm.b('finish'), attrs: { "slot": "icon" }, on: { "click": function click($event) {
          _vm.$refs.field.blur();
        } }, slot: "icon" }, [_vm._v("\n      " + _vm._s(_vm.$t('complete')) + "\n    ")]) : _vm._e()]), _vm._l(_vm.searchResult, function (express) {
      return _vm.showSearchList ? _c('cell', { key: express.name + express.address, attrs: { "title": express.name, "label": express.address, "icon": "location", "clickable": "" }, on: { "click": function click($event) {
            _vm.onSelect(express);
          } } }) : _vm._e();
    })], 2);
  },

  name: 'address-edit-detail',

  components: {
    Field: _field2.default
  },

  props: {
    value: String,
    error: Boolean,
    focused: Boolean,
    searchResult: Array,
    showSearchResult: Boolean
  },

  created: function created() {
    this.isAndroid = (0, _utils.isAndroid)();
  },

  computed: {
    showSearchList: function showSearchList() {
      return this.showSearchResult && this.focused && this.searchResult.length;
    },
    showIcon: function showIcon() {
      return this.value && this.focused;
    }
  },

  methods: {
    onSelect: function onSelect(express) {
      this.$emit('select-search', express);
      this.$emit('input', ((express.address || '') + ' ' + (express.name || '')).trim());
    }
  }
});