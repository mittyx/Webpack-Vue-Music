'use strict'

exports.default = {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        visible: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    mounted() {
        if(this.value) {
            this.visible = true
        }
    }
}
