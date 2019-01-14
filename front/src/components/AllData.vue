<template>
  <div id="all-data">
    <div class="cs-container">
      <Table
        :loading="loading"
        :columns="tableObj.title"
        :data="tableObj.data"
        @on-sort-change="handleSort"
      ></Table>
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
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
        this.loading = true;

        const apiUrl = "/getAllData";
        this.$http
            .post(apiUrl)
            .then(res => {
            if (res && res.data && res.data.code && res.data.code == 1) {
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
    handleSort(obj) {
        if(this.loading) return false;
        this.loading = true;
        const type = obj.key;
        const order = obj.order;
        const apiUrl = "/sortAllData";
        const params = {
            type: type,
            order: order
        }
        this.$http
            .post(apiUrl,params)
            .then(res => {
            if (res && res.data && res.data.code && res.data.code == 1) {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.cs-container {
  margin-top: 10px;
}
</style>

