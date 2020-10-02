function replace(ak) {
    $('#mainContainer > span > div > span > span > span').each(function () {
        var text = $(this).text();
        $(this).text(text.replace(/\s/g, "<_>"));
    });

    ak();
}

function replace2() {
    $('#mainContainer > span > div > span > span > span').each(function () {
        var text = $(this).text();
        $(this).text(text.replace(/<_>/g, " "));
    });
}

$(document).ready(function () {
    /*
    setTimeout(replace, 0);
    setTimeout(vueInit, 1000);
    setTimeout(replace2, 2000);
    */

    replace(vueInit);
});

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


function vueInit() {

    var app = new Vue({
        el: '.main',
        data: {
            accountPlaceholder: '',
            passwordPlaceholder: '',
            ctn1: 1,
            ctn2: 1,
            ctnActiveClass: 'tabbar_active',
            ctnDeactiveClass: '',
            ctnErrorClass: '',
            trySearch: '',
            loginAccount: '',
            loginPassword: ''
        },
        methods: {
            toggle: function () {
                this.a1 = !this.a1;
            },
            onLogin: function () {
                //console.log("prev " + this.$cookies.get("search"));
                console.log("id " + this.loginAccount);
                //this.$cookies.set("search", this.trySearch, 10);

                //this.loginAccount = '';

                this.$refs.pw.focus();
            },
            onPassword: function () {
                //console.log("prev " + this.$cookies.get("search"));
                console.log("pw " + this.loginPassword);
                //this.$cookies.set("search", this.trySearch, 10);

                //this.loginPassword = '';
                this.chkLogin();
            },
            chkLogin: function () {
                if (this.loginAccount == "charmon" &&
                    this.loginPassword == "likewhat") {
                    console.log("success!");
                    window.location.href = '/ptsbbs/page1';
                } else {
                    console.log("failed");
                }
            }
        }
    });

    replace2();
}
