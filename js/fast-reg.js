var vm = new Vue({
    el: ".swiper-container",

    data: {
        section:[
            {"title":"关注你的家乡版吧","board":[
                {"picked":true,"boardName":"Fujian","cnBoardName":"福建"}
            ]},
            {"title":"关注时尚享受生活","board":[
                {"picked":true,"boardName":"Movie","cnBoardName":"电影"},
                {"picked":true,"boardName":"Picture","cnBoardName":"贴图秀"},
                {"picked":true,"boardName":"Food","cnBoardName":"秀色可餐"},
                {"picked":true,"boardName":"Talking","cnBoardName":"谈天说地"},
                {"picked":true,"boardName":"Friends","cnBoardName":"缘来如此"},
                {"picked":true,"boardName":"DIYLife","cnBoardName":"创意生活"},
                {"picked":true,"boardName":"DigLife","cnBoardName":"数字生活"},
                {"picked":true,"boardName":"Clothing","cnBoardName":"衣衣不舍"},
                {"picked":true,"boardName":"Beautify","cnBoardName":"美容护肤"},
                {"picked":true,"boardName":"Feeling","cnBoardName":"情感的天空"},
                {"picked":true,"boardName":"Music","cnBoardName":"音乐交流区"},
            ]},
            {"title":"劳逸结合放松一下","board":[
                {"picked":true,"boardName":"Reading","cnBoardName":"书屋"},
                {"picked":true,"boardName":"Photo","cnBoardName":"摄影"},
                {"picked":true,"boardName":"Englishbar","cnBoardName":"英语吧"},
                {"picked":true,"boardName":"Football","cnBoardName":"足球吧"},
                {"picked":true,"boardName":"Joke","cnBoardName":"笑口常开"},
                {"picked":true,"boardName":"Swim","cnBoardName":"碧水情深"},
                {"picked":true,"boardName":"Cycling","cnBoardName":"梦想单车"},
                {"picked":true,"boardName":"Comic","cnBoardName":"动漫交流区"},
                {"picked":true,"boardName":"Basketball","cnBoardName":"篮球咖啡屋"},
                {"picked":true,"boardName":"Dota","cnBoardName":"Dota"},
                {"picked":true,"boardName":"LOL","cnBoardName":"英雄联盟"},
                {"picked":true,"boardName":"Heartstone","cnBoardName":"炉石传说"}
            ]},
            {"title":"专注学术成为大牛","board":[
                {"picked":true,"boardName":"Java","cnBoardName":"Java"},
                {"picked":true,"boardName":"CPP","cnBoardName":"C/C++"},
                {"picked":true,"boardName":"Python","cnBoardName":"Python"},
                {"picked":true,"boardName":"WWWTechnology","cnBoardName":"WWW技术"},
                {"picked":true,"boardName":"ACM_ICPC","cnBoardName":"算法与程设"},
            ]} 
        ],
        main:[
            {"errorInfo":"用户名不合法或已被注册","error":"normal","name":"username","info":"用户名(以英文开头+英文或数字)","type":"text","effect":false},
            {"errorInfo":"","error":"normal","name":"passwd","info":"设置密码","type":"password","effect":false},
            {"errorInfo":"两次密码不一致","error":"normal","name":"passwd_confirm","info":"再输入一遍密码","type":"password","effect":false},
            {"errorInfo":"该账户已经注册了3个论坛账号了","error":"normal","name":"gwno","info":"校园网账户(默认是学号)","type":"text","effect":false},
            {"errorInfo":"网关验证失败","error":"normal","name":"gwpwd","info":"校园网密码(默认是身份证后六位)","type":"password","effect":false},
        ],
        userInfo:{
            username: "",
            passwd: "",
            passwd_confirm: "",
            gwno: "",
            gwpwd: "",
        },
        hasHome: true,
        loader: false,
    },

    ready: function(){
        var slideHeight = document.getElementById("max-height").clientHeight;
        var swiperLists = document.querySelectorAll(".swiper-slide");
        for (var i = 0; i < swiperLists.length; i++){
            swiperLists[i].style.height = slideHeight + 'px';
        }
    },

    methods: {
        submitReg: function(e){
            // 验证模块去掉
            this.$nextTick(function(){
                swiper.slideNext(false,300);
            });
        },
        onNextStep: function(){
            swiper.slideNext(false,300);
        },
        checkUserId: function(msg){
                this.main[0].error = "normal";
        },
        checkUserPwd: function(){
            if (this.userInfo.passwd_confirm !== ""){
                this.userInfo.passwd == this.userInfo.passwd_confirm && this.userInfo.passwd_confirm != "" ? this.main[2].error = false : this.main[2].error = true; 
            } 
        },
        pick: function(msg,index,i){
            this.section[i].board[index].picked == true ? this.section[i].board[index].picked = false : this.section[i].board[index].picked = true; 
        },
        check: function(msg,i){
            var index = i;
            this.userInfo[msg] != "" ? this.main[index].effect = true : this.main[index].effect = false;
            switch (msg){
                case "username":
                    this.checkUserId(this.userInfo[msg]);
                    break;
                case "passwd":
                    this.userInfo.passwd !== "" ? this.main[1].error = false : this.main[1].error = "normal";
                    this.checkUserPwd();
                    break;
                case "passwd_confirm":
                    this.checkUserPwd();
                    break;
                case "gwno":
                    this.userInfo.gwno !== "" ? this.main[3].error = false : this.main[3].error = "normal";
                    break;
                case "gwpwd":
                    this.userInfo.gwno !== "" ? this.main[4].error = false : this.main[4].error = "normal";
                    break; 
            }

        },
        onSubmit: function(){
            var submitInfo = {};
            submitInfo.username = this.userInfo.username;
            submitInfo.boards = [];
            this.section.map(function(obj){
                var itemLen = obj.board.length;
                for (var i = 0; i < itemLen; i++){
                    var item = obj.board[i];
                    item.picked == true ? submitInfo.boards.push(item.boardName) : "";
                }
            });
            submitInfo.boards = submitInfo.boards.join();
            this.loader = true;
        }
    }
});
