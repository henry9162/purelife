<template>
    <div class="auth">
        <div class="grey--text d-flex justify-center text--darken-3 font-weight-light" style="width: 100%">
            <transition mode="out-in" enter-active-class="animated animate__flipInY" leave-active-class="animated animate__flipOutY">
                <component :is="view"></component>
            </transition>
        </div> 
    </div>
</template>

<script>
import register from '../components/auth/register'
import login from '../components/auth/login'

export default {
    layout: 'default',
    components: { register,  login},

    computed: {
        view() {
            return this.$store.state.auths.view
        }
    }
}
</script>

<style lang="scss" scoped>
    .auth {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
