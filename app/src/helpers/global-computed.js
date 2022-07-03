export default {
    loading(){
        return this.$store.state.loading;
    },
    isPc(){
        return this.$vuetify.breakpoint.mdAndUp;
    },
    isPhone(){
        return !this.isPc;
    },
    navbarHeight(){
        return this.isPc ? 90 : 70;
    },
    lightNavbar(){
        return this.$store.state.lightNavbar;
    },
}
