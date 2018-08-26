'use strict';

exports.__esModule = true;

var _create = require('../utils/create');

var _create2 = _interopRequireDefault(_create);

var _findParent = require('../mixins/find-parent');

var _findParent2 = _interopRequireDefault(_findParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isSelected, expression: "isSelected" }], class: _vm.b('pane') }, [_vm.inited ? _vm._t("default") : _vm._e(), _vm.$slots.title ? _c('div', { ref: "title" }, [_vm._t("title")], 2) : _vm._e()], 2);
  },

  name: 'tab',

  mixins: [_findParent2.default],

  props: {
    title: String,
    disabled: Boolean
  },

  data: function data() {
    return {
      inited: false
    };
  },

  computed: {
    index: function index() {
      return this.parent.tabs.indexOf(this);
    },
    isSelected: function isSelected() {
      return this.index === this.parent.curActive;
    }
  },

  watch: {
    'parent.curActive': function parentCurActive() {
      this.inited = this.inited || this.isSelected;
    },
    title: function title() {
      this.parent.setLine();
    }
  },

  created: function created() {
    this.findParent('van-tabs');
  },
  mounted: function mounted() {
    var tabs = this.parent.tabs;

    var index = this.parent.$slots.default.indexOf(this.$vnode);
    tabs.splice(index === -1 ? tabs.length : index, 0, this);

    if (this.$slots.title) {
      this.parent.renderTitle(this.$refs.title, this.index);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.tabs.splice(this.index, 1);
  }
});