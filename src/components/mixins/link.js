export default {
    props: {
        to: {
            type: [Object, String]
        }
    },
    computed: {
        linkUrl() {
            const type = typeof this.to;
            return type === 'string' ? this.to : null;
        }
    },
    methods: {
        handleClick (new_window = false) {
            if (new_window){
                window.open(this.to);
            } else {
                const isRoute = this.$router;
                if (isRoute) {
                    this.replace ? this.$router.replace(this.to) : this.$router.push(this.to);
                } else {
                    window.location.href = this.to;
                }
            }
        },
        handleCheckClick (event, new_window = false) {
            if (this.to) {
                if (this.target === '_blank') {
                    return false;
                } else {
                    event.preventDefault();
                    this.handleClick(new_window);
                }
            }
        }
    }
}