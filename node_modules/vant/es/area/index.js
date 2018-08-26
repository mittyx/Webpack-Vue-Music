import _Object$keys from 'babel-runtime/core-js/object/keys';

import create from '../utils/create';
import Picker from '../picker';

export default create({
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('picker', { ref: "picker", class: _vm.b(), attrs: { "show-toolbar": "", "value-key": "name", "title": _vm.title, "loading": _vm.loading, "columns": _vm.displayColumns, "item-height": _vm.itemHeight, "visible-item-count": _vm.visibleItemCount }, on: { "change": _vm.onChange, "confirm": function confirm($event) {
          _vm.$emit('confirm', $event);
        }, "cancel": function cancel($event) {
          _vm.$emit('cancel', $event);
        } } });
  },

  name: 'area',

  components: {
    Picker: Picker
  },

  props: {
    value: String,
    title: String,
    loading: Boolean,
    itemHeight: Number,
    visibleItemCount: Number,
    areaList: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    columnsNum: {
      type: [String, Number],
      default: 3
    }
  },

  data: function data() {
    return {
      code: this.value,
      columns: [{ values: [] }, { values: [] }, { values: [] }]
    };
  },


  computed: {
    province: function province() {
      return this.areaList.province_list || {};
    },
    city: function city() {
      return this.areaList.city_list || {};
    },
    county: function county() {
      return this.areaList.county_list || {};
    },
    displayColumns: function displayColumns() {
      return this.columns.slice(0, +this.columnsNum);
    }
  },

  watch: {
    value: function value() {
      this.code = this.value;
      this.setValues();
    },


    areaList: {
      deep: true,
      handler: function handler() {
        this.setValues();
      }
    }
  },

  mounted: function mounted() {
    this.setValues();
  },


  methods: {
    // get list by code
    getList: function getList(type, code) {
      var result = [];
      if (type !== 'province' && !code) {
        return result;
      }

      var list = this[type];
      result = _Object$keys(list).map(function (code) {
        return {
          code: code,
          name: list[code]
        };
      });

      if (code) {
        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      return result;
    },


    // get index by code
    getIndex: function getIndex(type, code) {
      var compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      var list = this.getList(type, code.slice(0, compareNum - 2));
      code = code.slice(0, compareNum);

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },
    onChange: function onChange(picker, values, index) {
      this.code = values[index].code;
      this.setValues();
      this.$emit('change', picker, values, index);
    },
    setValues: function setValues() {
      var code = this.code || _Object$keys(this.county)[0] || '';
      var picker = this.$refs.picker;

      var province = this.getList('province');
      var city = this.getList('city', code.slice(0, 2));

      if (!picker) {
        return;
      }

      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);

      if (city.length && code.slice(2, 4) === '00') {
        code = city[0].code;
      }

      picker.setColumnValues(2, this.getList('county', code.slice(0, 4)));
      picker.setIndexes([this.getIndex('province', code), this.getIndex('city', code), this.getIndex('county', code)]);
    },
    getValues: function getValues() {
      return this.$refs.picker ? this.$refs.picker.getValues() : [];
    },
    reset: function reset() {
      this.code = '';
      this.setValues();
    }
  }
});