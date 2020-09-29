Vue.component('ep2', {
    template: '<div>{{ text }}</div>',
    data() {
        return {
            text: '乘客 ep2'
        }
    }
});

Vue.component('input_code', {
    template: '<input :placeholder="text">',
    data() {
        return {
            text: '代號',
            message: ''
        }
    }
});

var app = new Vue({
    el: '.main',
    data: {
        loginName: '琪',
        ctn1: 1,
        ctn2: 1,
        ctnActiveClass: 'tabbar_active',
        ctnDeactiveClass: '',
        ctnErrorClass: '',
        trySearch: '',
        loginAccount: ''
    },
    methods: {
        toggle: function () {
            this.a1 = !this.a1;
        },
        onLogin: function () {
            //console.log("prev " + this.$cookies.get("search"));
            console.log("hey " + this.loginAccount);
            //this.$cookies.set("search", this.trySearch, 10);
            
            this.loginAccount = '';
        }
    }
});
