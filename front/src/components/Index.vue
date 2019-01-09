<template>
  <div id="index">
    <div class="line-item">类型：
      <Select v-model="currentWay" style="width:200px" @on-query-change="handleSelectWay">
        <Option v-for="item in wayList" :value="item.param" :key="item.param">{{ item.name }}</Option>
      </Select>
    </div>

    <div v-show="wayShow == 'name'" class="line-item">名称：
      <Input v-model="currentObj.name" placeholder="请输入名称" style="width: 200px" name="name"/>
    </div>
    <div v-show="wayShow == 'type'" class="line-item">类型：
      <Select v-model="currentObj.type" style="width:200px" @on-query-change="handleSelectType">
        <Option v-for="item in typeList" :value="item.param" :key="item.param">{{ item.name }}</Option>
      </Select>
    </div>
    <div v-show="wayShow == 'price'" class="line-item">价格：
      <Input v-model="currentObj.minVal" placeholder="最小值" style="width: 100px"/>
      <Input v-model="currentObj.maxVal" placeholder="最大值" style="width: 100px"/>
    </div>
    <Button class="btn" type="primary" @click="handleSearch">搜索</Button>
    <div class="line-item">数据：
      <Table :loading="loading" :columns="tableObj.title" :data="tableObj.data"></Table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wayShow: "name",
      wayList: [
        {
          name: "名称",
          param: "name"
        },
        {
          name: "类型",
          param: "type"
        },
        {
          name: "价格",
          param: "price"
        }
      ],
      currentWay: "",
      currentObj: {
        name: "",
        type: "",
        minVal: "",
        maxVal: ""
      },
      typeList: [
        {
          name: "ARPG(动作角色扮演类游戏)",
          param: "ARPG"
        },
        {
          name: "RPG(角色扮演类游戏)",
          param: "RPG"
        }
      ],
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
            key: "price"
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    // const {data} = await getARPGGamesData()
    // console.log('data',getARPGGamesData());
    // getARPGGamesData().then(res=>{
    //     console.log('res',res);
    // })
    // this.getData();
  },
  methods: {
    // async getData() {
    //   let params = {
    //     way: "type",
    //     val: "ARPG"
    //   };
    //   let re = await getARPGGamesData(params);
    //   console.log("re", re);
    //   return re;
    // },
    // async handleSelectWay(val) {
    currentObjInit() {
      const obj = this.currentObj;
      for (let key in obj) {
        this.currentObj[key] = "";
      }
    },
    handleSelectWay() {
      this.wayShow = this.currentWay;
      this.currentObjInit();
    },
    handleSelectType(val) {
      const type = this.currentObj.type;
    },
    handleSearch() {
      const currentWay = this.currentWay;
      if (!currentWay) {
        alert("未选择方式");
        return false;
      }
      switch (currentWay) {
        case "name":
          this.handleGetGameByName();
          break;
        case "type":
          this.handleGetGameByType();
          break;
        case "price":
          this.handleGetGameByPrice();
          break;
        default:
          break;
      }
    },
    tableDataInit() {
      this.tableObj.data = [];
    },
    handleGetGameByName() {
      this.loading = true;

      const apiUrl = "/getGamesByName";
      const params = {
        val: this.currentObj.name
      };
      this.$http
        .post(apiUrl, params)
        .then(res => {
          if (res && res.data && res.data.code && res.data.code == 1) {
            this.loading = false;
            const data = res.data.data;
            this.tableObj.data = data;
          } else {
            this.loading = false;
            this.tableDataInit();
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
    handleGetGameByType() {
      this.loading = true;

      const apiUrl = "/getGamesByType";
      const params = {
        val: this.currentObj.type
      };
      this.$http
        .post(apiUrl, params)
        .then(res => {
          if (res && res.data && res.data.code && res.data.code == 1) {
            this.loading = false;
            const data = res.data.data;
            this.tableObj.data = data;
          } else {
            this.loading = false;
            this.tableDataInit();
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
    handleGetGameByPrice() {
      this.loading = true;

      const apiUrl = "/getGamesByPrice";
      const params = {
        minVal: this.currentObj.minVal,
        maxVal: this.currentObj.maxVal
      };
      this.$http
        .post(apiUrl, params)
        .then(res => {
          if (res && res.data && res.data.code && res.data.code == 1) {
            this.loading = false;
            const data = res.data.data;
            this.tableObj.data = data;
          } else {
            this.loading = false;
            this.tableDataInit();
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
#index {
  padding-left: 30px;
  overflow: hidden;
}
.btn {
  display: block;
  margin-top: 10px;
}
.line-item {
  margin-top: 10px;
}
</style>

