<template>
 <div class="content-box-one">
   <div>
     <div class="titleDiv">vuex使用</div>
     <el-collapse v-model="activeName" accordion>
       <el-collapse-item title="state" name="1">
         <div>Vuex 使用单一状态树，一个对象就包含了全部的应用层级状态，而且每个应用将仅仅包含一个 store 实例；</div>
         <div>可以从计算属性中获取或直接绑定：</div>
         <code>
           computed: {
           count () {
           return store.state.count
           }
           }
           or
           <span v-pre>{{this.$store.state.count}}</span>
         </code>
         <div>当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余,可以使用 mapState 辅助函数帮助我们生成计算属性</div>
         <code>
           computed: mapState({
           count: state => state.count,
           countAlias: 'count',
           countPlusLocalState (state) {
           return state.count + this.localCount
           }
           })
         </code>
         <div>
           当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
         </div>
         <div>
           computed: mapState([
           // 映射 this.count 为 store.state.count
           'count'
           ])
         </div>
       </el-collapse-item>
       <el-collapse-item title="getter" name="2">
         <div>getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算；</div>
         <code>state: {
           todos: [
           { id: 1, text: '...', done: true },
           { id: 2, text: '...', done: false }
           ]
           },
           getters: {
           doneTodos: state => {
           return state.todos.filter(todo => todo.done)
           }
           }</code>
         <div>使用方法 <code>{{this.$store.getters.doneTodos}}</code></div>
       </el-collapse-item>
       <el-collapse-item title="mutation" name="3">
         <div>更改 Vuex 的 store 中的状态的唯一方法是提交 mutation;</div>
         <div>
           <code>
             const store = new Vuex.Store({
             state: {
             count: 1
             },
             mutations: {
             increment (state) {
             state.count++
             }
             }
             })
           </code>
         </div>
         <div>使用放法 <code>store.commit('increment',arg1,arg2,arg……)</code></div>
         <div>需要注意：mutation 必须是同步函数（因为当 mutation 触发的时候，回调函数还没有被调用）</div>
       </el-collapse-item>
       <el-collapse-item title="action " name="4">
         <div>提交的是 mutation，而不是直接变更状态,而且可以是异步操作；</div>
         <div>使用:
           <code>const store = new Vuex.Store({
             state: {
             count: 0
             },
             mutations: {
             increment (state) {
             state.count++
             }
             },
             actions: {
             increment (context) {
             context.commit('increment',arg1,arg2,arg……)
             }
             }
             })</code>
         </div>
         <div>触发action:store.dispatch('increment') or this.$store.dispatch('increment')(主要在组件中这样使用)</div>
         <div></div>
       </el-collapse-item>
       <el-collapse-item title="module " name="5">
         <div>由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿；</div>
         <div>为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：</div>
         <div>使用:

             <div>
               <code>
               const moduleA = {
               state: { ... },
               mutations: { ... },
               actions: { ... },
               getters: { ... }
               }
               </code>

             </div>
             <div>
               <code>
                 const moduleB = {
                 state: { ... },
                 mutations: { ... },
                 actions: { ... },
                 getters: { ... }
                 }
               </code>

             </div>
           <div>store.state.a // -> moduleA 的状态</div>
           <div>store.state.b // -> moduleB 的状态</div>
         </div>
         <div>触发action:store.dispatch('increment') or this.$store.dispatch('increment')(主要在组件中这样使用)</div>
         <div></div>
       </el-collapse-item>
     </el-collapse>
   </div>
   <div class="titleDiv">组件化需要注意</div>
   <el-collapse v-model="activeName" accordion>
     <el-collapse-item title="组件内部data" name="6">
       <div>组件内部使用data需要注意的是：和根实例方式不同，组件内使用data不是对象而是一个函数返回一个对象</div>
     </el-collapse-item>
     <el-collapse-item title="props(通信)" name="7">
       <div>如果传入的参数是动态的，需要在组件内部使用computed计算获得，否则容易造成数据改变不触发视图的更新</div>
       <div>需要通信的时候有俩个方式：a、$on和$emit,事件驱动的方式获得参数；b、使用vuex分发（参考上用法）</div>
       <div>编写通用组件时，组件内prop建议采用props类型检测机制,以对象的形式,例如：</div>
       <div>props:{name:{type:String,default:'layah'}}</div>
       <div>props验证有四个通用属性：1、type（参数类型）2、default(默认值)3、required （强制指定类型）4、validator（自定义验证函数）</div>
     </el-collapse-item>
     <el-collapse-item title="slot----插槽" name="8">
       <div>建议在编写通用组件时使用，可以扩展组件内容，易于编辑；</div>
       <div> 具名插槽：<code><slot name="someone"></slot></code></div>
     </el-collapse-item>
     <el-collapse-item title="show or if" name="9">
       <div>对于高开销的组件渲染建议使用show指定，减少dom的渲染开销；比如弹窗等</div>
       <div>if适用于在条件限制，确实不用渲染不用加载的情况下</div>
     </el-collapse-item>
     <el-collapse-item title="组件内style" name="10">
       <div>页面组件编写css时建议写在响应的页面组件内，以syle标签包裹，如果该样式只限于本页面，请在style标签上家scope标记</div>
       <div>得益于webpack模块打包的机制，使用插件可以从js中提取css样式单独打包，建议组件内只写少量个性样式，通用样式建议外部引入</div>
     </el-collapse-item>
   </el-collapse>
   <div class="titleDiv">服务端渲染</div>
   <el-collapse v-model="activeName" accordion>
     <el-collapse-item title="关于项目配置及结构" name="11">
       <div>请按照现有目录开发；</div>
       <div>pages目录放页面；components存在公用组件（弹窗之类）会根据页面结构生成相应路由，省去手动配置的麻烦；plugins:存放第三方插件；statics:存放不用webpack处理打包的静态资源；</div>
       <div>assets:存在需要webpack打包预处理的文件（scss等）；layouts：存放页面布局形式；middleware:存放中间件（每次路由变更都执行，如：鉴权）；store:存放页面vuex状态模块</div>
       <div>nuxt.config,js为配置文件，建议不要乱动（如果你会）否则项目容出错</div>
       <div>.nuxt目录是部署文件，内部包含服务端渲染配置及打包后的文件结构</div>
     </el-collapse-item>
   </el-collapse>
 </div>
</template>

<script>
    export default {
        asyncData() {
          return new Promise((resolve) => {
            setTimeout(function () {
              resolve({})
            }, 2000)
          })
        },
        name: "api",
        data(){
          return {
            title:'api文档',
            activeName: '-1'
          }
        },
      head () {
          return {
            title:this.title,
            meta :[
              { hid: 'description', name: 'description', content: '基于vue全家桶及服务端渲染的API文档' }
            ]
          }
      }
    }
</script>
<style scoped>
  .content-box-one{
    width: 1200px;
    margin: 0 auto;
  }
  .titleDiv{
    padding: 15px 0 ;
    font-size: 18px;
    font-weight: 900;
    color: #333;
    text-align: center;
    background: #f8f8f8;
  }
  .el-collapse-item__header {
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
  }
</style>
