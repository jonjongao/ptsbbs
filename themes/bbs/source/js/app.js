var app;

$(document).ready(function () {
    var v = function () {
        addVue(restoreSpace);
    };
    replaceSpace(v);

    $('#mainContainer > span').each(function () {
        //Counting each bbsrow
    });
});

function replaceSpace(callback) {
    //Replace all space in html with <_> incase of trim by Vue
    $('#mainContainer > span > div > span > span > span').each(function () {
        var text = $(this).text();
        $(this).text(text.replace(/\s/g, "<_>"));
    });

    callback();
}

function restoreSpace() {
    //Replace all <_> back to space
    $('#mainContainer > span > div > span > span > span').each(function () {
        var text = $(this).text();
        $(this).text(text.replace(/<_>/g, " "));
    });
}

Vue.component('input_code', {
    template: '<input :placeholder="text">',
    data() {
        return {
            text: '代號',
            message: ''
        }
    }
});

Vue.component('page2_pointer', {
    template: '<span class="q7 b0" v-if="this.$root.$data.bbsrowIndex === {{ id }}">Hey</span>',
    props: ['id'],
    data() {
        return {
            //text: this.$root.$data.ctnActiveClass
        }
    },
    methods: {
        getPointer: function () {
            return this.$root.$data.ctnActiveClass;
        }
    }
});

function addVue(callback) {
    app = new Vue({
        el: '.main',
        created: function () {
            window.addEventListener('keyup', this.kup);
        },
        mounted: function () {
            var i = document.getElementById('mainContainer').getAttribute('bbsrowCount');
            this.bbsrowCount = i;
        },
        computed: {
            getAccountLabel: function () {
                //Original 'Charmon' length = 7
                //Rest of space length = 9, so is 16 in total
                var t = this.loginAccount;
                t = t.padEnd(16);
                return t;
            },
            getTimeLabel: function () {
                //Original is '[9/30 星期三 0:29]' length = 15
                var now = new Date();
                var now_local = now.toLocaleDateString();
                var mon = now_local.split('/')[0];
                var day = now_local.split('/')[1];
                var day_list = ['日', '一', '二', '三', '四', '五', '六'];
                var week = day_list[now.getDay()];
                var hour = now.getHours();
                var min = now.getMinutes();
                var t = '[' + mon + '/' + day + ' 星期' + week + ' ' + hour + ':' + min + ']';
                t = t.padStart(15);
                return t;
            }
        },
        data: {
            accountPlaceholder: '',
            passwordPlaceholder: '',
            loginAccount: 'Guest',
            loginPassword: '',
            bbsrowIndex: 0,
            bbsrowCount: 0
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
                    //Direct user to next page
                    window.location.href = '/ptsbbs/layout_page1';
                } else {
                    console.log("failed");
                }
            },
            kup: function (e) {
                switch (e.which) {
                    case 38: //up
                        this.bbsrowIndex--;
                        if (this.bbsrowIndex < 0) this.bbsrowIndex = this.bbsrowCount - 1;
                        break;
                    case 40: //down
                        this.bbsrowIndex++;
                        if (this.bbsrowIndex > this.bbsrowCount - 1) this.bbsrowIndex = 0;
                        break;
                    default:
                        return;
                }
                e.preventDefault();
                console.log(this.bbsrowIndex);
            }
        }
    });

    callback();
}