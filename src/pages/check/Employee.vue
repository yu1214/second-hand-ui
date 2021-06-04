<template>
  <div class="employee">
    <!-- 表格 -->
    <el-table :data="employee">
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="realname" label="用户名" />
      <el-table-column prop="telephone" label="手机号" />
      <el-table-column prop="idCard" label="身份证号码" />
      <el-table-column prop="bankCard" label="银行卡号" />
      <el-table-column prop="registerTime" label="注册时间" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="shenhe(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 模态框 -->
    <el-dialog title="员工审核" :visible.sync="visible">
      <p>用户名：{{this.emp.realname}}</p>
      <p>身份证号：{{this.emp.idCard}}</p>
      <div>
        <p>身份证正面照片</p>
        <img width="260" height="140" :src="this.emp.idPhotoPositive" alt />
      </div>
      <div>
        <p>身份证反面照片</p>
        <img width="260" height="140" :src="this.emp.idPhotoNegative" alt />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">审核通过</el-button>
        <el-button type="danger" @click="refuse">拒绝审核</el-button>
      </div>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>
<script>
import { get } from "@/utils/request";
export default {
  data() {
    return {
      visible: false,
      employee: [],
      emp: []
    };
  },
  created() {
    this.loadEmployee();
  },
  methods: {
    loadEmployee() {
      let url = "http://121.199.29.84:8090/user/findAllEmployee";
      get(url).then(response => {
        this.employee = response.data;
      });
    },
    shenhe(row) {
      this.emp = row;
      this.visible = true;
    },
    submit() {
      let url = "http://121.199.29.84:8090/user/auditing";
      get(url, { id: this.emp.id }).then(response => {
        this.$message({ type: "success", message: response.message });
        this.loadEmployee();
      });
      this.visible = false;
    },
    refuse() {
      let url = "http://121.199.29.84:8090/user/refuseauditing";
      get(url, { id: this.emp.id }).then(response => {
        this.$message({ type: "success", message: response.message });
        this.loadEmployee();
      });
      this.visible = false;
    }
  }
};
</script>