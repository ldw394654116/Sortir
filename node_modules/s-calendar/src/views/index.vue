<style lang="stylus">
  @import "../css/calendar.styl";
</style>

<template>
    <div class="view">
      <input type="text" v-model="items.picker1.value" class="default picker1" @click.stop="open($event,'picker1')">
      <input type="text" v-model="items.picker2.value" class="default picker2" @click.stop="open($event,'picker2')">
      <input type="text" v-model="items.picker3.value" class="default picker3" @click.stop="open($event,'picker3')">
      <calendar :type="type" v-on:hide="onHide" v-show="show" :curBegin="curBegin" :siteX="siteX" :siteY="siteY" :range="range"></calendar>
    </div>
</template>

<script>
import Calendar from "../components/calendar.vue"
export default {
    components: {
        Calendar
    },

    data() {
        return {
          type:"",
          show:false,
          value:"",
          curBegin:"",
          siteX:0,
          siteY:0,
          range:true,
          items:{
              picker1:{
                  value:"2016-08-21",
                  begin:"2016-08-21",
                  range:true
              },
              picker2:{
                  value:"2017-1-2",
                  begin:"2017-1-2",
                  range:false
              },
              picker3:{
                  value:"",
                  begin:"",
                  range:true
              }
            }
          }
        },
    computed: {

    },

    ready: function () {

    },
    watch:{
    },
    methods: {
      open(e,type) {
            var _self = this;
	            _self.siteX = e.target.offsetLeft-10;
	            _self.siteY = e.target.offsetTop + e.target.offsetHeight;
              _self.type=type;
              _self.curBegin=_self.items[type].begin;//开始时间
              _self.range=_self.items[type].range;//开始时间
              _self.show=true;
        },
        onHide:function(value,type){
            this.items[type].value = value;
            this.show=false;
        }
    }
}

</script>
