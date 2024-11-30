<template>
<div>
  <table>
    <tbody>
      <tr>
        <td style="text-align:center;border-right: 1px solid black;border-bottom:1px solid black">/</td>
        <td v-for="(a,i) in b[0]" :style="sx[i].value ?sx[i].value.every(v=>v!==-1)&&{color:'gray'}: {color:'red'}" style="text-align:center;vertical-align: bottom;border-right: 1px solid black;border-bottom:1px solid black;width:2em">
          <span v-for="(c,j) in a" :style="(sx[i].value?.[j]??-1)===-1?{}:{textDecoration:'line-through'}">{{ c }}<br></span>
        </td>
      </tr>
      <tr v-for="(a,i) in b[1]" style="height:2em">
        <td :style="sy[i].value ?sy[i].value.every(v=>v!==-1)&&{color:'gray'}: {color:'red'}" style="text-align:end;border-right: 1px solid black;border-bottom:1px solid black"><span style="padding-left:2em"></span><span v-for="(c,j) in a" :style="(sy[i].value?.[j]??-1)===-1?{}:{textDecoration:'line-through'}" style="padding-right:.3em">{{ c }}</span></td>
        <td v-for="j in b[0].length" :style="b[2][(i)*w+(j-1)]===1?{backgroundColor:'black'}:{}"style="border-right: 1px solid black;border-bottom:1px solid black;text-align:center" @click="b[2][(i)*w+(j-1)]?b[2][(i)*w+(j-1)]=0:b[2][(i)*w+(j-1)]=1" @click.right.prevent="b[2][(i)*w+(j-1)]?b[2][(i)*w+(j-1)]=0:b[2][(i)*w+(j-1)]=-1">{{ {"-1":"X",0:"",1:""}[b[2][(i)*w+(j-1)]] }}</td>
      </tr>
    </tbody>
  </table>
  <button @click="c">C</button>
  <button v-if="s.length" @click="r">R</button>
</div>
</template>

<script setup lang="ts">
// const s = 15
const w = 20
const h = 15
const d = rad(w, h)
log(w, d)
const b = ref(create(w, d))
const rb = create(w, d)
const a = () => {
  rb[2].forEach((v,i)=>b.value[2][i]=v)
}
for (let i = 0; i < w * h; i++){
  watchEffect(() => {
    rb[2][i] = b.value[2][i]
  })
}
const s:number[][] = shallowReactive([])
const c = () => {
  s.push(b.value[2].slice())
}
const r = () => {
  b.value[2] = s.pop()!
}
const sx:Ref<number[]|null>[] = []
for (let i = 0; i < rb[0].length; i++){
  sx.push(computed(()=>match(sliceX(b.value,i),rb[0][i])))
}
const sy:Ref<number[]|null>[] = []
for (let i = 0; i < rb[1].length; i++){
  sy.push(computed(()=>match(sliceY(b.value,i),rb[1][i])))
}
part(rb)
a()
</script>
