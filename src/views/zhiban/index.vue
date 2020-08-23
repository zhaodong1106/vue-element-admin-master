//eslint-disable//
<template>
  <div class="container">
    <el-table style="width: 100%" border="true" class="" :data="dataList" >
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="星期一"   align="center">
        <template slot-scope="{row}" >
          <template v-if="row.edit">
            <el-select  v-model="row.one"  placeholder="请选择" >
              <el-option v-for="item in options" :lable="item.lable" :value="item.lable"   >

              </el-option>
            </el-select>
          </template>
            <span v-else >
                 <el-tag style="margin: 4px 0" :type="row.one|statusFilter">{{row.one}}</el-tag>
            </span>
        </template>
      </el-table-column>
      <el-table-column label="星期二" align="center" >
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.two"  placeholder="请选择"  >
              <el-option v-for="item in options" :lable="item.lable" :value="item.lable"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.two|statusFilter">{{row.two}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="星期三" align="center" >
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.three"  placeholder="请选择"  >
              <el-option v-for="item in options" :lable="item.lable" :value="item.lable"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.three|statusFilter">{{row.three}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="星期四" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.four"  placeholder="请选择"  >
              <el-option v-for="item in options" :lable="item.lable" :value="item.lable"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.four|statusFilter">{{row.four}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="星期五" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.five"  placeholder="请选择"  >
              <el-option v-for="item in options" :lable="item.lable" :value="item.lable"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.five|statusFilter">{{row.five}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="星期六" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.six"  placeholder="请选择"  >
              <el-option v-for="item in options" :lable="item.lable" :value="item.lable"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.six|statusFilter">{{row.six}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="星期日" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.seven"  placeholder="请选择"  >
              <el-option v-for="item in options" :lable="item.lable" :value="item.lable"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.seven|statusFilter">{{row.seven}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Zhiban',
  filters: {
    statusFilter(status) {
      const statusMap = {
        '值班': 'success',
        '不值班': 'info',
        "请假": 'danger'
      }
      return statusMap[status]
    }
  },
  data: function () {
    return {
      dataList:[
        {name:'肇东22222222222222222222222222222222222ghdghhhhhhhhhhhhhhh',one:'值班',two:'值班',three:'值班',four:'值班',five:'值班',six:'值班',seven:'值班',edit:false},
        {name:'肇东2',one:'值班',two:'值班',three:'值班',four:'值班',five:'值班',six:'值班',seven:'值班',edit:false},
        {name:'肇东3',one:'值班',two:'值班',three:'值班',four:'值班',five:'值班',six:'值班',seven:'值班',edit:false},
        {name:'肇东4',one:'值班',two:'值班',three:'值班',four:'值班',five:'值班',six:'值班',seven:'值班',edit:false},
      ],
      options:[
        {lable:"值班",value:1},
        {lable:"不值班",value:2},
        {lable:"请假",value:3}
      ],
      xxxx:'值班'
    }
  },
  methods:{
    confirmEdit(row) {
      row.edit = false
      row.one = row.one
      row.two = row.two
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="scss">
 .container{
   padding: 20px;
   .el-select__input {
     vertical-align: baseline;
   }
   .el-select--medium{
     vertical-align: bottom !important;
   }
 }
 .el-select-medium{
   vertical-align: bottom !important;
 }
</style>
