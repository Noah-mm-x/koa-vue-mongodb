<template>
  <div id="add-data">
    <div class="line-item">名字：
      <Input v-model="name" placeholder="请输入名称" style="width: 200px" name="name"/>
    </div>
    <div class="line-item">类型：
      <Select v-model="type" style="width:200px">
        <Option v-for="item in typeList" :value="item.param" :key="item.param">{{ item.name }}</Option>
      </Select>
    </div>
    <div class="line-item">价格：
      <Input v-model="price" placeholder="请输入价格" style="width: 200px" name="price"/>
    </div>
    <Button class="btn" type="primary" :loading="loading" @click="handleAddData">添加</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  methods: {
    dataInit() {
      this.name = "";
      this.type = "";
      this.price = "";
    },
    handleAddData() {
      if (this.loading) return false;
      this.loading = true;

      if (!this.name) {
        this.$Message.error({
          content: "名称不能为空",
          duration: 2
        });
        this.loading = false;
        return false;
      }

      if (!this.type) {
        this.$Message.error({
          content: "类型不能为空",
          duration: 2
        });
        this.loading = false;
        return false;
      }

      if (!this.price) {
        this.$Message.error({
          content: "价格不能为空",
          duration: 2
        });
        this.loading = false;
        return false;
      }

      const apiUrl = "/addData";
      const params = {
        name: this.name,
        type: this.type,
        price: this.price
      };
      this.$http
        .post(apiUrl, params)
        .then(res => {
          if (res && res.data && res.data.code && res.data.code == 1) {
            this.loading = false;
            this.dataInit();
            this.$Message.success({
              content: "添加成功"
            });
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
#add-data {
  padding-left: 30px;
  overflow: hidden;
}
.line-item {
  margin-top: 10px;
}
.btn {
  display: block;
  margin-top: 10px;
  margin-left: 182px;
}
</style>


