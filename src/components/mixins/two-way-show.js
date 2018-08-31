'use strict'

exports.default = {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        proxyShow: {
            get: function () {
                return this.value
            },
            set: function (val) {
                this.$emit('input', val)
            }
        }
    }
}
