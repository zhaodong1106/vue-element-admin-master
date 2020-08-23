//eslint-disable//
<template>
  <div class="container">
    <div class="btn-container">
        <el-button  class="el-button el-button--primary" @click="previousWeek">上一周</el-button>
        <el-button  class="el-button el-button--primary" @click="thisWeek">本周</el-button>
         <el-button  class="el-button el-button--primary" @click="nextWeek">下一周</el-button>
      <el-button  class="el-button el-button--primary" @click="generateWeek" v-if="isEdit&&dataList.length==0">生成周计划</el-button>

      <el-date-picker
        v-model="weekSelect"
        type="week"
        format="yyyy-MM-dd"
        :picker-options="{'firstDayOfWeek': 1}"
        placeholder="选择周"
        @change="changeWeek"
        style="margin-left: 10px"
      >
      </el-date-picker>
    </div>
    <el-table style="width: 100%" border="true" class="" :data="dataList" v-loading="isLoading" >
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'星期一('+times[0]+')'"   align="center">
        <template slot-scope="{row}" >
          <template v-if="row.edit">
            <el-select  v-model="row.one"  placeholder="请选择" >
              <el-option v-for="item in options" :label="item.lable" :value="item.value"   >

              </el-option>
            </el-select>
          </template>
            <span v-else >
                 <el-tag style="margin: 4px 0" :type="row.one|statusFilter">{{row.one | valueFilter}}</el-tag>
            </span>
        </template>
      </el-table-column>
      <el-table-column :label="'星期二('+times[1]+')'"align="center" >
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.two"  placeholder="请选择"  >
              <el-option v-for="item in options" :label="item.lable" :value="item.value"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.two|statusFilter">{{row.two | valueFilter}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="'星期三('+times[2]+')'" align="center" >
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.three"  placeholder="请选择"  >
              <el-option v-for="item in options" :label="item.lable" :value="item.value"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.three|statusFilter">{{row.three | valueFilter}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="'星期四('+times[3]+')'" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.four"  placeholder="请选择"  >
              <el-option v-for="item in options" :label="item.lable" :value="item.value"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.four|statusFilter">{{row.four | valueFilter}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="'星期五('+times[4]+')'" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.five"  placeholder="请选择"  >
              <el-option v-for="item in options" :label="item.lable" :value="item.value"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.five|statusFilter">{{row.five | valueFilter}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="'星期六('+times[5]+')'" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.six"  placeholder="请选择"  >
              <el-option v-for="item in options" :label="item.lable" :value="item.value"  >

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.six|statusFilter">{{row.six | valueFilter}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="'星期日('+times[6]+')'" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-select  v-model="row.seven"  placeholder="请选择"  @change="handlerSelect">
              <el-option v-for="item in options" :label="item.lable" :value="item.value">

              </el-option>
            </el-select>
          </template>
          <span v-else >
            <el-tag style="margin: 4px 0"  :type="row.seven|statusFilter">{{row.seven | valueFilter}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220" v-if="isEdit">
        <template slot-scope="{row}">
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check"
              @click="confirmEdit(row)"
            >
              ok
            </el-button>
            <el-button
              v-if="row.edit"
              type="info"
              size="small"
              @click="cancelEdit(row)"
            >cancel
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
  import  {getList,editDataApi} from '@/api/zhiban';
export default {
  name: 'zhiban',
  props:{
    isEdit: false
  },
  created: function () {
    this.getWeek(0);
    this.fetchList();

  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '2': 'info',
        "3": 'danger'
      }
      return statusMap[status]
    },
    valueFilter(status) {
      const valueMap = {
        '1': '值班',
        '2': '不值班',
        "3": '请假'
      }
      return valueMap[status]
    }
  },
  data: function () {
    return {
      isLoading:false,
      valueMap:{
        '1': '值班',
        '2': '不值班',
        "3": '请假'
      },
      weekSelect: '',
      times: [],
      dataList:'',
      options:[
        {lable:'值班',value:1},
        {lable:'不值班',value:2},
        {lable:'请假',value:3}
      ],
      xxxx:'值班'
    }
  },
  methods:{
    confirmEdit(row) {
      this.isLoading=true
      row.edit = false
      row.one = row.one
      row.two = row.two
      editDataApi(row).then(resp=>{

      })
      this.fetchList();
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    cancelEdit(row){
      row.edit = false
    },
    previousWeek(){
      this.isLoading=true
      this.getWeek(1)
      this.fetchList();
    },
    thisWeek(){
      this.isLoading=true
      this.getWeek(0)
      this.weekSelect='';
      this.fetchList();
    },
    nextWeek(){
      this.isLoading=true
      this.getWeek(-1)
      this.fetchList();
    },
    fetchList(){
      getList({startTime:this.times[0],endTime:this.times[6]}).then(resp=>{
        this.dataList = resp.data.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          return v
        })
      })
      this.isLoading=false;
    },
    getWeek(i,date) {
      let curDate=date?date:this.$moment().format('YYYY-MM-DD');
      let weekOfDay=this.$moment(curDate,'YYYY-MM-DD').isoWeekday();//计算今天是这周第几天
      let monday = this.$moment(curDate,'YYYY-MM-DD').subtract(weekOfDay + 7 * i - 1, 'days').format('YYYY-MM-DD');//周一日期
      let Tuesday = this.$moment(curDate,'YYYY-MM-DD').subtract(weekOfDay + 7 * i - 2, 'days').format('YYYY-MM-DD');//周二日期
      let Wednesday = this.$moment(curDate,'YYYY-MM-DD').subtract(weekOfDay + 7 * i - 3, 'days').format('YYYY-MM-DD');//周三日期
      let Thursday = this.$moment(curDate,'YYYY-MM-DD').subtract(weekOfDay + 7 * i - 4, 'days').format('YYYY-MM-DD');//周四日期
      let Friday  = this.$moment(curDate,'YYYY-MM-DD').subtract(weekOfDay + 7 * i - 5, 'days').format('YYYY-MM-DD');//周五日期
      let Saturday = this.$moment(curDate,'YYYY-MM-DD').subtract(weekOfDay + 7 * i - 6, 'days').format('YYYY-MM-DD');//周六日期
      let sunday = this.$moment(curDate,'YYYY-MM-DD').subtract(weekOfDay + 7 * (i - 1), 'days').format('YYYY-MM-DD');//周日日期
      this.times.length=0;
      this.times.push( monday,Tuesday,Wednesday,Thursday,Friday,Saturday ,sunday);

    },
    changeWeek(){
      this.getWeek(0,this.weekSelect);
      this.fetchList();
    },
    generateWeek(){

    },
    handlerSelect(val){
      console.log(val);
    }
  }
}
</script>

<style scoped lang="scss">
 .container{
   padding: 20px;
   .btn-container{
     margin-bottom: 10px;
   }
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
