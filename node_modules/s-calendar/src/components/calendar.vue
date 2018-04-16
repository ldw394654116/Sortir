<style lang="stylus">
    @import "../css/calendar.styl";
</style>

<template>
    <div class="calendar" :style="{left:siteX + 'px',top:siteY + 'px'}">
        <div class="calendar-m">
            <i class="prev" @click="pre()"></i>
            <span>{{curYear}}-{{month(curMonth)}}-{{curDay}}</span>
            <i class="next" @click="next()"></i>
        </div>
        <div class="calendar-w">
            <span v-for="item in weeks" class="week">{{item}}</span>
        </div>
        <div class="calendar-d">
            <span v-for="(item,index) in dayList" class="week" style="display:block;">
                <span v-for="(days,indexTwo) in item" class="item" v-bind:class="{'cur-active': days.active,'disable':days.disabled}" @click="changeActive(index,indexTwo)">{{days.day}}</span>
            </span>
        </div>
    </div>
</template>

<script>



export default {
    name:"calendar",
    components: {

    },
    props:['type',"show","curBegin","siteX","siteY"],
    data() {
        return {
            curMonth:"",
            curM:"",
            preMonthDays:0,
            curDay:"",
            curYear:"",
            days:0,
            firstWeek:"",
            weeks: ['日','一','二','三','四','五','六'],
            months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            dayList:[],
            row:0,
            curX:0,
            curY:0
        }
    },

    computed: {

    },

    created: function () {

    },
    mounted:function(){
       var _self=this;
         _self.$nextTick(function() {
           _self.initCalendar("");
         })
    },
    watch: {
            "curBegin":"changeCurBegin"
       },
    methods: {
         changeCurBegin:function(curVal,oldVal){//监听日历变化
             this.initCalendar(curVal);
         },
        month:function(m){
          return m < 10 ? '0' + m : m
        },
        initCalendar:function(curVal){
          var date="";
            if (curVal!="") {
                date=new Date(curVal);
             }else{
               date=new Date();
             }
            //获取年月日
             this.curYear=date.getFullYear();
             this.curMonth=date.getMonth()+1;//实际月份，第几月
             this.curM=date.getMonth()+1;
             this.curDay=date.getDate();
             this.firstWeek=new Date(this.curYear,this.curMonth-1,1).getDay();//获取当月第一天周几,实际月份减1
             this.curX=Math.floor((this.firstWeek+this.curDay)/7);
             this.curY=(this.firstWeek+this.curDay)%7-1;
             this.renderCancledar(this.curMonth,this.curYear);
        },
        changeActive:function(x,y){
          var self=this;

          if (x<=0) {//如果是日历的第一行
             self.dayList[x][y].active=true;
             this.$emit("hide",self.curYear+"-"+self.curMonth+"-"+self.dayList[x][y].day,self.type);
             self.pre();
             return;
          }
          if (x>=self.row-1) {//如果是日历的最后一行

             self.dayList[x][y].active=true;
             this.$emit("hide",self.curYear+"-"+self.curMonth+"-"+self.dayList[x][y].day,self.type);
              self.next();
             return;
          }
          self.dayList[self.curX][self.curY].active=false;
          self.curX=x,
          self.curY=y;
          self.dayList[self.curX][self.curY].active=true;
          this.$emit("hide",self.curYear+"-"+self.curMonth+"-"+self.dayList[self.curX][self.curY].day,self.type);
        },
        pre:function(){
          if (this.curMonth == 1) {
             this.curMonth = 12;
             this.curYear = parseInt(this.curYear)- 1;
         } else {
             this.curMonth = parseInt(this.curMonth) - 1;
         }
          this.renderCancledar(this.curMonth,this.curYear);
        },
        next:function(){
        //   if (this.curMonth == 11) {
        //      this.curMonth = 12;
        //  } else
        if(this.curMonth == 12){
            this.curMonth = 1;
            this.curYear = parseInt(this.curYear)+1;
         }else {
          this.curMonth = parseInt(this.curMonth) + 1;
        }
        this.renderCancledar(this.curMonth,this.curYear);
      },
        renderCancledar:function(m,y){//将数组渲染到html中
          this.dayList=[];
          this.days=new Date(y,m,0).getDate();//获取当月的天数,实际月份减1
          this.preMonthDays=new Date(y,m-1,0).getDate();//获取上个月的天数
          this.firstWeek=new Date(y,m-1,1).getDay();//获取当月第一天周几
          this.row=Math.ceil((this.days+this.firstWeek)/7);//获取当月总天数一共几行
          //将本月时间按着顺序加入数组里面
          var list=[];
          for (var i = this.firstWeek,j=1; i <this.days+this.firstWeek; i++,j++) {
            if (i==(this.firstWeek+this.curDay-1) && m==this.curM) {
              list[i]={
                day:j,
                active:true,
                disabled:false
              };
            }else{
              list[i]={
                day:j,
                active:false,
                disabled:false
              };
            }
          }
          //将上月时间最后几天按着顺序加入数组里面
          for (var i = this.firstWeek-1,j=this.preMonthDays; i >=0; i--,j--) {
            list[i]={
              day:j,
              active:false,
              disabled:true
            };
          }
          //将下月时间最后几天按着顺序加入数组
          for (var i = this.days+this.firstWeek,j=1; i <this.row*7; i++,j++) {
            list[i]={
              day:j,
              active:false,
              disabled:true
            };
          }

          //将一维数组转换成二维数组
          var oneArr = [];
          for (var i = 1; i <= list.length; i++) {
              oneArr.push(list[i - 1]);
              if (i % 7 == 0) {
                this.dayList.push(oneArr);
                oneArr = [];
              }
          }
        }
    }
}

</script>
