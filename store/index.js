export const state=function () {
  return {
    nm:0,
    pepole:[],
    list:[
      {name:'ad',id:1},
      {name:"ad",id:2},
      {name:"ad",id:4},
      {name:"ad",id:67},
      {name:"adc",id:67},
    ]
  }
}

export const mutations ={
  num(state){
    state.nm=3
  },
  inconme(state,npc){
    state.play=npc.id
  },
  pepoles(state){
    state.pepole=[{
      name:'ls',
      age:26
    },
      {
        name:'lf',
        age:28
      }]
  }
}
export const actions={
  pepoles({commit}){
    setTimeout(function () {
      commit("pepoles")
    },5000)
  }
}
