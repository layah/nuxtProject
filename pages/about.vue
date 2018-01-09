<template>
    <div>
      是否来自服务端渲染：{{msg | isTrue}}
      <p>{{$store.state.nm}}</p>
      <p>{{map}}</p>
      <p>{{list}}</p>
      <p>{{storDatas}}</p>
      <p>{{$store.state.play}}</p>
      <ul>
        <li v-for="item in pople">
          <span>姓名：{{item.name}}</span>
          <span>年龄：{{item.age}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { mapState } from 'vuex'
    export default {
        name: "about",
        layout:'two',
        data:function () {
          return {
            mn:10
          }
        },
        filters:{
          isTrue:function (value) {
            if (value){
              return "是";
            }
            else{
              return "否"
            }
          }
        },
        asyncData(context){
          context.store.commit("inconme",{
            id:168
          })
          return {msg:context.isServer}
        },
        fetch({store,context}){
          return  store.commit("num")
        },
        head(){
          return {
            title:'关于',
            meta:[
              { hid: 'description', name: 'description', content: '关于服务端渲染的例子' },
              {name: 'keywords', content: '关于服务端渲染的例子aq' }
            ]
          }
        },
      computed:mapState({
        map:function (state) {
            return state.nm+5;
          },
        list:"nm",
        storDatas:function (state) {
          return state.nm + this.mn
        },
        pople:function (state) {
         return state.pepole;
        }
      }),
      methods:{
        ...mapMutations([
          'num',
          'inconme'
        ]),
        ...mapMutations({
          add:'num'
        })
      },
      mounted:function () {
        this.add();
        this.inconme({id:200})
        this.$store.dispatch("pepoles");
      }
    }
</script>

<style scoped>

</style>
