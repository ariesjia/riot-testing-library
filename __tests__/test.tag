<app>
    <p data-testid="count">{ state.count }</p>
    <button data-testid="button" onclick={add}>button</button>
    <script>
        export default {
            onBeforeMount(props, state) {
                this.state = {
                    count: props.count || 0
                }
            },
            add() {
                this.update({
                    count: this.state.count + 1,
                })
            },
        }
    </script>
</app>
