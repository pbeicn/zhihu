<template>
    <div id="orl" v-bind:class="['list']">
        <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了" @load="onLoad">
            <div  v-for="(item, index) in dataList" :key="index">
                <div v-bind:class="['orderTitleRow']">
                    <div v-bind:class="['type']">知</div>
                    <div v-bind:class="['title']">{{item.ordertitle}}</div>
                </div>
                <div v-bind:class="['orderRequest']">
                    <span v-bind:class="['count']">粉丝数最低:{{item.fensi}}</span>
                    <router-link v-bind:class="['view']" to="/orderReceive/orderReceiveDetail">查看
                        <van-icon name="arrow"/>
                    </router-link>
                </div>
                <div v-bind:class="['orderRequest']">
                    <span v-bind:class="['price']">单价:{{item.price}}元  需求数量:{{item.needcnt}}</span>
                </div>
                <div v-bind:class="['orderRequestButtom']">
                </div>
            </div>
        </van-list>
    </div>

</template>
<script type="text/javascript">
    var self;//全局Vue对象
    export default {
        name: 'orl',
        mounted() {//vue加载完成后运行
            self = this;
        },
        watch: {
            $route() {
                this.orderType= this.$route.query.tabIndex;
                this.pageNo=0;
                this.dataList=[];
                this.onLoad();
            }
        },

        data() {
            return {
                dataList: [],
                pageNo:0,
                loading: false,
                finished: false,
                orderType:1
            }
        },
        methods: {
            onLoad(){
                self.pageNo=self.pageNo+1;
                this.$ajax
                    .get("/api/getorderpage/"+self.pageNo+"/10", {params:{ordertype:self.orderType}})
                    .then(res => {
                        if(res.data.code!=undefined&&res.data.code!="204"){
                            var dataArr=res.data.data.content;
                            var totalRow=res.data.data.totalSize;
                            self.loading=false;
                            if(self.pageNo*10>=totalRow){
                                self.finished = true;
                            }
                            for(var index in dataArr){
                                self.dataList.push(dataArr[index]);
                            }
                        }
                        self.loading=false;

                    })
                    .catch(function(error) {
                        self.loading=false;
                        self.finished = true;
                        window.console.log(error);
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
        height: 20px;
        width: 20px;
        line-height: 20px;
        font-size: 16px;
        text-align: center;
        vertical-align: middle;
        color: white;
        float: left;
    }

    .orderTitleRow .title {
        height: 23px;
        margin-left: 30px;
        line-height: 23px;
        font-size: 16px;
        text-align: left;
        vertical-align: middle;
        font-family: "Arial Negreta", "Arial Normal", Arial;
        font-weight: 700;
        font-style: normal;
        letter-spacing: normal;
        color: rgb(127, 127, 127);
    }

    .orderRequest {
        //margin-top: 20px;
        width: 100%;
        height: 40px;
    }

    .orderRequest .count {
        float: left;
        height: 35px;
        line-height: 35px;
        font-size: 16px;
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
        font-size: 16px;
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
        font-size: 16px;
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