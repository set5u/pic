export const rad = (w: number, h: number) => {
  const c = Array(w * h).fill(0);
  const r = Array(w * h).fill(0);
  loop: for (let i = 0; i < w * h; ) {
    const s = Math.floor(Math.random() * 2);
    const p = Math.floor(Math.random() * 3);
    for (let j = 0; j < p; j++) {
      c[i] = s;
      i++;
      if (i >= w * h) {
        break loop;
      }
    }
  }
  loop: for (let i = 0; i < w * h; ) {
    const s = Math.floor(Math.random() * 2);

    const p = Math.floor(Math.random() * 3);
    for (let j = 0; j < p; j++) {
      r[i] = s;
      i++;
      if (i >= w * h) {
        break loop;
      }
    }
  }
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      c[j * w + i] = c[j * w + i] ^ r[i * h + j];
    }
  }
  return c;
};

export const log = (w: number, d: number[]) => {
  console.log(string(w, d));
};

export const string = (w: number, d: number[]) => {
  const r: string[] = [];
  for (let i = 0; i < d.length; i++) {
    if (i % w === 0) {
      r.push("\n");
    }
    r.push(d[i] ? "■" : "□");
  }
  return r.join("").substring(1);
};

export type Board = [number[][], number[][], number[]];

export const create = (w: number, d: number[]): Board => {
  const r = d.map((v) => 0);
  const h = d.length / w;
  const o: number[][] = [];
  for (let i = 0; i < w; i++) {
    const q: number[] = [];
    o.push(q);
    let p = 0;
    for (let j = 0; j < h; j++) {
      if (d[j * w + i]) {
        p++;
      } else if (p) {
        q.push(p);
        p = 0;
      }
    }
    if (p) {
      q.push(p);
    }
  }
  const s: number[][] = [];
  for (let i = 0; i < h; i++) {
    const q: number[] = [];
    s.push(q);
    let p = 0;
    for (let j = 0; j < w; j++) {
      if (d[i * w + j]) {
        p++;
      } else if (p) {
        q.push(p);
        p = 0;
      }
    }
    if (p) {
      q.push(p);
    }
  }
  return [o, s, r];
};
export const match = (b: Board) => {};
export const solve = (b: Board) => {};
