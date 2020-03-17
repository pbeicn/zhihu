<template>
    <div id="orl" v-bind:class="['list']">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div  v-for="(item, index) in dataList" :key="index">
                <div v-bind:class="['orderTitleRow']">
                    <div v-bind:class="['type']">知</div>
                    <div v-bind:class="['title']">托福是自学好还是报班好？</div>
                </div>
                <div v-bind:class="['orderRequest']">
                    <span v-bind:class="['count']">粉丝数最低:1000</span>
                    <router-link v-bind:class="['view']" to="/orderReceive/orderReceiveDetail">查看
                        <van-icon name="arrow"/>
                    </router-link>
                </div>
                <div v-bind:class="['orderRequest']">
                    <span v-bind:class="['price']">单价:3.3元  需求数量:10</span>
                </div>
                <div v-bind:class="['orderRequestButtom']">
                </div>
            </div>
        </van-pull-refresh>
    </div>

</template>
<script type="text/javascript">
    export default {
        name: 'orl',
        watch: {
            $route() {
                this.orderType= this.$route.query.tabIndex;
                this.loadData();
            }
        },

        data() {
            return {
                isLoading: false,
                dataList: [],
                pageSize:10,
                pageNo:1,
                orderType:1
            }
        },
        methods: {
            onRefresh() {
                setTimeout(() => {
                    this.$toast('加载成功');
                    this.isLoading = false;
                }, 1000);
            },
            loadData(){
               // alert(this.orderType);
                this.$ajax
                    .get("/api/getorderpage", {orderType:this.orderType})
                    .then(res => {
                       window.console.log(res);
                        /*  window.console.log("a1" + res.code);
                         window.console.log("a2" + res.data.code);
                         this.tipinfo = res.data.message;
                         this.tipinfos(res.data.message);*/
                    })
                    .catch(function(error) {
                        window.console.log(error);
                        /*if (error.response) {
                            window.console.log("AAA" + error.response.data.message);
                            window.console.log("11111111");
                        } else if (error.request) {
                            window.console.log("22222222222");
                            window.console.log(error.request);
                        } else {
                            window.console.log("333333333333");
                            window.console.log("Error", error.message);
                        }
                        window.console.log("4444444444");
                        window.console.log(error.config);*/
                    });
            }
        }
    }
</script>
<style>
    .list {
        width: 96%;
        height: 100%;
        margin: 0 auto;
    }

    .orderTitleRow {
        width: 100%;
        height: 35px;
    }

    .orderTitleRow .type {
        background-color: #5FBCEC;
        height: 35px;
        width: 35px;
        line-height: 35px;
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        color: white;
        float: left;
    }

    .orderTitleRow .title {
        height: 35px;
        margin-left: 50px;
        line-height: 35px;
        font-size: 30px;
        text-align: left;
        vertical-align: middle;
        font-family: "Arial Negreta", "Arial Normal", Arial;
        font-weight: 700;
        font-style: normal;
        letter-spacing: normal;
        color: rgb(127, 127, 127);
    }

    .orderRequest {
        margin-top: 20px;
        width: 100%;
        height: 40px;
    }

    .orderRequest .count {
        float: left;
        height: 35px;
        line-height: 35px;
        font-size: 30px;
        text-align: left;
        vertical-align: middle;
        font-family: "Arial Negreta", "Arial Normal", Arial;
        font-weight: 700;
        font-style: normal;
        letter-spacing: normal;
        color: rgb(132, 0, 255);
    }

    .orderRequest .view {
        float: right;
        color: #108EE9;
        /*padding-right: 50px;*/
        height: 35px;
        line-height: 35px;
        font-size: 30px;
        text-align: left;
        vertical-align: middle;
        font-family: "Arial Negreta", "Arial Normal", Arial;
        font-weight: 700;
        font-style: normal;
        letter-spacing: normal;
        color: rgb(127, 127, 127);
    }

    .orderRequest .price {
        float: left;
        height: 35px;
        line-height: 35px;
        font-size: 30px;
        text-align: left;
        vertical-align: middle;
        font-family: "Arial Negreta", "Arial Normal", Arial;
        font-weight: 700;
        font-style: normal;
        letter-spacing: normal;
        color: #F59A23;
    }

    .orderRequestButtom {
        border-bottom: 1px solid rgb(204, 204, 204);
        margin-bottom: 15px;
    }
</style>