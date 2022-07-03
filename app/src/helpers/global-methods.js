export default {
    
    scrollToElement(el, duration=700){
        let scrollTop = el.offsetTop - this.navbarHeight;
        this.$vuetify.goTo(scrollTop, {duration: duration, container: document.documentElement, easing: 'easeInOutQuad'});
    },

    navigateToLink(ref){
console.log('navigateToLink route.name: ' + this.$route.name);
console.log('navigateToLink ref: ' + ref);

        if ( ! ref.startsWith("#") ) {
console.log('navigateToLink pushing to: ' + ref);
            this.$router.push({name: ref});
        } else if (this.$route.name === 'home'){
            let element = document.querySelector(ref);
            if (element) {
                this.scrollToElement(element, 1000);
            }
        } else {
console.log('navigateToLink pushing to: ' + ref);
            this.$router.push({name: 'home'});
        }
    },

    scrollToTop(){
        this.$vuetify.goTo(0, {duration: 1000, container: document.documentElement, easing: 'easeOutQuint'});
    },
}
