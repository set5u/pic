<template>
<div>
  <table>
    <tbody>
      <tr>
        <td style="text-align:center;border-right: 1px solid black;border-bottom:1px solid black">/</td>
        <td v-for="a in b[0]" style="text-align:center;vertical-align: bottom;border-right: 1px solid black;border-bottom:1px solid black;width:2em">
          <template v-for="c in a">{{ c }}<br></template>
        </td>
      </tr>
      <tr v-for="(a,i) in b[1]">
        <td style="text-align:end;border-right: 1px solid black;border-bottom:1px solid black"><span style="padding-left:2em"></span><span v-for="c in a" style="padding-right:.3em">{{ c }}</span></td>
        <td v-for="j in b[0].length"style="border-right: 1px solid black;border-bottom:1px solid black;text-align:center" @click="b[2][(i)*w+(j-1)]?b[2][(i)*w+(j-1)]=0:b[2][(i)*w+(j-1)]=1" @click.right.prevent="b[2][(i)*w+(j-1)]?b[2][(i)*w+(j-1)]=0:b[2][(i)*w+(j-1)]=-1">{{ {"-1":"X",0:"",1:"V"}[b[2][(i)*w+(j-1)]] }}</td>
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
const s:number[][] = shallowReactive([])
const c = () => {
  s.push(b.value[2].slice())
}
const r = () => {
  b.value[2] = s.pop()!
}
</script>
