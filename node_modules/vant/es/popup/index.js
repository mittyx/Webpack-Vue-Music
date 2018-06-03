
import create from '../utils/create';
import Popup from '../mixins/popup';

export default create({
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.currentTransition } }, [_vm.inited || !_vm.lazyRender ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.value, expression: "value" }], class: _vm.b((_obj = {}, _obj[_vm.position] = _vm.position, _obj)) }, [_vm._t("default")], 2) : _vm._e()]);
    var _obj;
  },

  name: 'popup',

  mixins: [Popup],

  props: {
    transition: String,
    lazyRender: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: ''
    }
  },

  data: function data() {
    return {
      inited: this.value
    };
  },


  computed: {
    currentTransition: function currentTransition() {
      return this.transition || (this.position === '' ? 'van-fade' : 'popup-slide-' + this.position);
    }
  },

  watch: {
    value: function value() {
      this.inited = this.inited || this.value;
    }
  }
});