<template>
    <div id="ord">
        <div class="toptitle">点赞详情</div>
        <van-row class="tablerow">
            <van-col span="6" class="font_center tablecol">
                标题
            </van-col>
            <van-col span="18" class="font_left tablecol">
                {{order.ordertitle}}
            </van-col>
        </van-row>
        <van-row class="tablerow">
            <van-col span="6" class="font_center tablecol">
                连接
            </van-col>
            <van-col span="18" class="font_left tablecol">
                {{order.orderurl}}
            </van-col>
        </van-row>
        <van-row class="tablerow">
            <van-col span="6" class="font_center tablecol">
                求赞ID
            </van-col>
            <van-col span="18" class="font_left tablecol">
                ***的狼
            </van-col>
        </van-row>
        <van-row class="tablerow">
            <van-col span="6" class="font_center tablecol">
                单价
            </van-col>
            <van-col span="18" class="font_left tablecol">
                {{order.price}}元
            </van-col>
        </van-row>
        <van-row class="tablerow">
            <van-col span="6" class="font_center tablecol">
                粉丝要求
            </van-col>
            <van-col span="18" class="font_left tablecol">
                {{order.fensi}}起
            </van-col>
        </van-row>
        <van-row class="tablerow">
            <van-col span="6" class="font_center tablecol">
                订单状态
            </van-col>
            <van-col span="18" class="font_left tablecol">
                {{order.orderstate}}
            </van-col>
        </van-row>

        <div class="step" @click="takeorder">立即抢单(第一步)</div>
        <div class="step">跳转到知乎该回答处 (第2步）</div>
        <div class="step step3">确认已点赞（第3步）</div>

        <van-row  >
            <van-col span="12"  >
                <van-row  class="tablerow">
                    <van-col span="8" class="font_center tablecol">
                        点赞ID
                    </van-col>
                    <van-col span="16" class="font_left tablecol">
                        {{currentUser.username}}
                    </van-col>
                </van-row>
                <van-row  class="tablerow">
                    <van-col span="8" class="font_center tablecol">
                        抢单时间
                    </van-col>
                    <van-col span="16" class="font_left tablecol">
                        2020-03-09 12:00:00
                    </van-col>
                </van-row>
                <van-row  class="tablerow">
                    <van-col span="8" class="font_center tablecol">
                        确认时间
                    </van-col>
                    <van-col span="16" class="font_left tablecol">
                        2020-03-09 12:00:00
                    </van-col>
                </van-row>
                <van-row  class="tablerow">
                    <van-col span="8" class="font_center tablecol">
                        订单状态
                    </van-col>
                    <van-col span="16" class="font_left tablecol">
                        已抢单 订单完成
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="12"  >
                <van-row  >
                    <van-col span="12"  >
                        <img height="80" width="80">
                    </van-col>
                    <van-col span="12"  >
                        <img height="80" width="80">
                    </van-col>
                </van-row>
                <van-row  class="tablerow">
                    <van-col span="12"  >
                        微信客服1
                    </van-col>
                    <van-col span="12"  >
                        微信客服2
                    </van-col>
                </van-row>
                <van-row  class="tablerow">
                    <van-col span="24"  >
                        有任何问题，请联系微信客服
                    </van-col>

                </van-row>
            </van-col>
        </van-row>
    </div>

</template>
<script type="text/javascript">
    var self;
    export default {
        name: 'ord',
        mounted() {//vue加载完成后运行
            self = this;
            this.orderid= this.$route.query.orderid;
            this.onLoad();
        },

        data() {
            return {
                orderid:"",
                order:{},
                currentUser:{},
                ordertake:{}
            }
        },
        methods: {
            onLoad:function () {
                //获取订单信息
                this.$ajax
                    .get("/api/getorderdetail", {params:{orderid:self.orderid}})
                    .then(res => {
                        self.order=res.data.data;
                    })
                    .catch(function(error) {
                        window.console.log(error);
                    });
                //获取当前用户
                this.$ajax
                    .get("/api/getuserinfo")
                    .then(res => {
                        self.currentUser=res.data.data;
                    })
                    .catch(function(error) {
                        window.console.log(error);
                    });
            },
            takeorder:function () {
                console.log("抢单");
                this.$ajax
                    .post("/api/takeorder", self.order)
                    .then(res => {
                        if(res.data.code!=null&&res.data.code!=undefined&&res.data.code!="0"){
                           self.$toast.fail(res.data.message);
                        }else{
                            console.log(res);
                        }

                    })
                    .catch(function(error) {
                        window.console.log(error);
                    });
            }
        }

    }
</script>
<style>
    .toptitle {
        height: 80px;
        width: 100%;
        font-size: 30px;
        line-height: 80px;
        font-family: "Arial Negreta", "Arial Normal", Arial;
        color: white;
        background-color: #02A7F0;
        margin-bottom: 40px;
    }

    .tablerow {
        margin-top: 10px;
    }

    .tablecol {
        border-left: 1px #ebedf0 solid;
        white-space:normal;
        word-break:break-all;
        overflow:hidden;
    }

    .font_left {
        text-align: left;
       /* padding-left: 20px;*/
    }

    .font_center {
        text-align: center;
    }

    .step {
        height: 80px;
        width: 90%;
        margin: 0 auto;
        font-size: 30px;
        line-height: 80px;
        font-family: "Arial Negreta", "Arial Normal", Arial;
        color: white;
        background-color: #02A7F0;
        margin-top: 40px;
        border-radius: 10px;
    }
    .step3{
        margin-bottom: 40px;
    }
</style>