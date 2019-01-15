<template>
    <div id="update-data">
        <div class="cs-container">
            <div class="line-item">需要修改的数据的名字：
                <Input
                    v-model="sourceName"
                    placeholder="请输入名称"
                    style="width: 200px"
                    name="name"
                />
            </div>
            <div class="line-item">修改后的数据：</div>
            <div class="line-item">名字：
                <Input
                    v-model="name"
                    placeholder="请输入名称"
                    style="width: 200px"
                    name="name"
                />
            </div>
            <div class="line-item">类型：
                <Select
                    v-model="type"
                    style="width:200px"
                >
                    <Option
                        v-for="item in typeList"
                        :value="item.param"
                        :key="item.param"
                    >{{ item.name }}</Option>
                </Select>
            </div>
            <div class="line-item">价格：
                <Input
                    v-model="price"
                    placeholder="请输入价格"
                    style="width: 200px"
                    name="price"
                />
            </div>
            <Button
                class="btn"
                type="info"
                @click="linkToAll"
            >
                查看所有数据
            </Button>
            <Button
                class="btn"
                type="primary"
                :loading="loading"
                @click="handleUpdateData"
            >更改</Button>
        </div>
    </div>
</template>
<script>
import { removeTheIllegalDataObject } from "./../libs/util";
export default {
    data() {
        return {
            sourceName: "",
            name: "",
            type: "",
            price: "",
            loading: false,
            typeList: [
                {
                    name: "ARPG(动作角色扮演类游戏)",
                    param: "ARPG"
                },
                {
                    name: "RPG(角色扮演类游戏)",
                    param: "RPG"
                },
                {
                    name: "AFPS(动作射击类游戏)",
                    param: "AFPS"
                },
                {
                    name: "RAC(赛车类游戏)",
                    param: "RAC"
                },
                {
                    name: "ACT(动作类游戏)",
                    param: "ACT"
                },
                {
                    name: "AVG(冒险类游戏)",
                    param: "AVG"
                },
                {
                    name: "EDU(养成类游戏)",
                    param: "EDU"
                },
                {
                    name: "FTG(格斗类游戏)",
                    param: "FTG"
                },
                {
                    name: "MUD(网络游戏)",
                    param: "MUD"
                },
                {
                    name: "MUG(音乐类游戏)",
                    param: "MUG"
                },
                {
                    name: "RTS(即时战略类游戏)",
                    param: "RTS"
                },
                {
                    name: "SIM(模拟经营类游戏)",
                    param: "SIM"
                },
                {
                    name: "SLG(策略战棋类游戏)",
                    param: "SLG"
                },
                {
                    name: "TAB(桌面棋类游戏)",
                    param: "TAB"
                }
            ]
        };
    },
    created() {
        this.handlePageIn();
    },
    mounted() {},
    methods: {
        handleUpdateData() {
            if (this.loading) return false;
            this.loading = true;

            if (!this.sourceName) {
                this.$Message.error({
                    content: "待修改的名字不能为空",
                    duration: 2
                });
                this.loading = false;
                return false;
            }

            const apiUrl = "/updateData";
            const targetData = removeTheIllegalDataObject({
                name: this.name,
                type: this.type,
                price: parseFloat(this.price) 
            });
            const params = {
                sourceName: this.sourceName,
                targetData: targetData
            };
            this.$http
                .post(apiUrl, params)
                .then(res => {
                    if (
                        res &&
                        res.data &&
                        res.data.code &&
                        res.data.code == 1
                    ) {
                        this.loading = false;
                        this.$Message.success({
                            content: "添加成功"
                        });
                    } else {
                        this.loading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                })
                .catch(err => {
                    console.log("err", err);
                });
        },
        handlePageIn() {
            const id = this.$route.query.id;
            if(!id) return false;
            const apiUrl = "/getGamesById";
            const params = {
                id: id
            };
            this.$http
                .post(apiUrl, params)
                .then(res => {
                    if (
                        res &&
                        res.data &&
                        res.data.code &&
                        res.data.code == 1
                    ) {
                        const data = res.data.data[0];
                        this.sourceName = data.name;
                        this.name = data.name;
                        this.type = data.type;
                        this.price = data.price;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                })
                .catch(err => {
                    console.log("err", err);
                });
        },
        linkToAll(){
            const path = "/allData";
            this.$router.push({
                path: path
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.line-item {
    margin-top: 10px;
}
.btn {
    margin-top: 10px;
}
</style>

