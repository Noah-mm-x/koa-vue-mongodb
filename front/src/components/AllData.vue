<template>
    <div id="all-data">
        <div class="cs-container">
            <Table
                :loading="loading"
                :columns="tableObj.title"
                :data="tableObj.data"
                @on-sort-change="handleSort"
            ></Table>
            <div class="cs-page-wrap">
                <Page
                    class="page"
                    :total="pageOpt.total"
                    :page-size="pageOpt.size"
                    :current="pageOpt.current"
                    @on-change="changePage"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            tableObj: {
                title: [
                    {
                        type: "index",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "名字",
                        key: "name"
                    },
                    {
                        title: "类型",
                        key: "type"
                    },
                    {
                        title: "价格",
                        key: "price",
                        sortable: "custom"
                    },
                    {
                        title: "更新操作",
                        key: "_id",
                        align: "center",
                        render: this.updateRender
                    }
                ],
                data: []
            },
            pageOpt:{
                total: 0,
                size: 10,
                current: 1
            }
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true;

            const apiUrl = "/pageData";
            this.$http
                .post(apiUrl)
                .then(res => {
                    if (
                        res &&
                        res.data &&
                        res.data.code &&
                        res.data.code == 1
                    ) {
                        this.loading = false;
                        const data = res.data.data;
                        this.tableObj.data = data.list;
                        this.pageOpt.total = data.allDatalength;
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
        handleSort(obj) {
            if (this.loading) return false;
            this.loading = true;
            const type = obj.key;
            const order = obj.order;
            const apiUrl = "/sortAllData";
            const params = {
                type: type,
                order: order
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
                        const data = res.data.data;
                        this.tableObj.data = data;
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
        linkToUpdate(obj) {
            const id = obj.row._id;
            const path = "/updateData";
            this.$router.push({
                path: path,
                query: {
                    id: id
                }
            });
        },
        updateRender(h, obj) {
            return h("Button", {
                props: {
                    type: "primary",
                    size: "small"
                },
                domProps: {
                    innerHTML: "更新此项"
                },
                nativeOn: {
                    click: () => {
                        this.linkToUpdate(obj);
                    }
                }
            });
        },
        changePage(page) {
            if (this.loading) return false;
            this.pageOpt.current = page
            const apiUrl = "/pageData";
            let params = {
                limit: this.pageOpt.size,
                current: page,
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
                        const data = res.data.data;
                        this.tableObj.data = data.list;
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
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./../assets/css/common.scss";
.cs-container {
    margin-top: 10px;
}
</style>

