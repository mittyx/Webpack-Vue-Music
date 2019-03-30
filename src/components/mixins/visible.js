'use strict'

exports.default = {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        visible() {
            return this.value;
        }
    },
    watch: {
        value (val) {
            this.$emit('change', val)
        }
    }
}
