<template>
    <div>
        <v-parallax height="100" dark src="https://ak4.picdn.net/shutterstock/videos/33878734/thumb/1.jpg">
            <v-row align="center" justify="center">
                <div>
                    <h2 class="customm-caption red--text text--darken-2 mb-3 font-weight-bold text-uppercase">
                        <slot></slot>
                    </h2>
                    <div class="d-flex justify-center">
                        <hr style="width: 30%" class="red font-weight-black">
                    </div>
                </div>
            </v-row>
        </v-parallax>
    </div>
</template>

<style lang="scss">
    .customm-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
        font-size: 24px;
    }
</style>
