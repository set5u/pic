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
    r.push(d[i] === 1 ? "■" : "□");
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
export const sliceX = (b: Board, x: number) => {
  return Array.from({ length: b[1].length }).map(
    (_, j) => b[2][j * b[0].length + x]
  );
};
export const sliceY = (b: Board, y: number) => {
  return Array.from({ length: b[0].length }).map(
    (_, j) => b[2][y * b[0].length + j]
  );
};
export const first = (b: number[], n: number[]): number[] | null => {
  let p = 0;
  const r: number[] = [];
  for (let i = 0; i < n.length; i++, p++) {
    let f = -1;
    for (let j = 0; j < n[i]; j++, p++) {
      if (b[p] === -1) {
        f = j;
        break;
      }
    }
    if (f === -1) {
      r.push(p - n[i]);
    } else {
      i--;
    }
  }
  if (p > b.length + 1) {
    return null;
  }
  return r;
};

export const next = (b: number[], r: number[], n: number[]): boolean => {
  for (let i = 0; i < n.length; i++) {
    r[n.length - i - 1]++;
    const p = first(b.slice(r[n.length - i - 1]), n.slice(n.length - i - 1));
    if (p) {
      const q = r[n.length - i - 1];
      p.forEach((v, j) => (r[n.length - i - 1 + j] = v + q));
      return false;
    }
  }
  return true;
};
export const match = (b: number[], n: number[]) => {
  const r = first(b, n);
  if (!r) {
    return null;
  }
  const e = n.map(() => -1);
  while (true) {
    for (let i = 0; i < n.length; i++) {
      let f = false;
      for (let j = 0; j < n[i]; j++) {
        if (b[r[i] + j] !== 1) {
          f = true;
          break;
        }
      }
      f ||= (b[r[i] - 1] ?? -1) !== -1;
      f ||= (b[r[i] + n[i]] ?? -1) !== -1;
      if (!f && e[i] === -1 && !e.includes(r[i])) {
        e[i] = r[i];
      }
    }

    if (next(b, r, n)) {
      break;
    }
  }
  return e;
};
export const solve = (b: Board, cb?: (i: number) => void) => {
  let p = 0;
  const q = part(b);
  if (!q) {
    return false;
  }
  while (b[2].includes(0) && p < b[2].length) {
    const i = b[2].indexOf(0, p);
    if (i === -1) {
      break;
    }
    const c = b[2].slice();
    c[i] = 1;
    const r = part([b[0], b[1], c]);
    if (r) {
      p = i + 1;
    } else {
      b[2][i] = -1;
    }
    const a = b[2].toString();
    part(b);
    if (a !== b[2].toString()) {
      cb?.(p);
      p = 0;
    }
  }
  return true;
};
export const part = (b: Board) => {
  let updated = true;
  while (updated && b[2].some((v) => v === 0)) {
    updated = false;
    for (let i = 0; i < b[0].length; i++) {
      const l = line(sliceX(b, i), b[0][i]);
      if (l) {
        for (let j = 0; j < l.length; j++) {
          if (b[2][j * b[0].length + i] !== l[j]) {
            updated = true;
            b[2][j * b[0].length + i] = l[j];
          }
        }
      } else {
        return false;
      }
    }
    for (let i = 0; i < b[1].length; i++) {
      const l = line(sliceY(b, i), b[1][i]);
      if (l) {
        for (let j = 0; j < l.length; j++) {
          if (b[2][i * b[0].length + j] !== l[j]) {
            updated = true;
            b[2][i * b[0].length + j] = l[j];
          }
        }
      } else {
        return false;
      }
    }
  }
  return true;
};
export const line = (b: number[], n: number[]) => {
  const r = first(b, n);
  if (!r) {
    return false;
  }
  const e = b.map(() => -2);
  while (true) {
    const c = expand(r, n, b.length);
    if (!c.some((v, i) => b[i] === 1 && v === -1)) {
      c.forEach((v, i) => {
        if (e[i] === -2 || v === e[i]) {
          e[i] = v;
        } else {
          e[i] = 0;
        }
      });
    }
    if (next(b, r, n)) {
      return e[0] === -2 ? false : e;
    }
  }
};
export const expand = (r: number[], n: number[], w: number) => {
  const e = Array(w).fill(-1);
  for (let i = 0; i < n.length; i++) {
    const c = n[i];
    const d = r[i];
    for (let j = 0; j < c; j++) {
      e[d + j] = 1;
    }
  }
  return e;
};
export const fix = (w: number, d: number[], cb?: (i: number) => void) => {
  while (true) {
    const l = create(w, d);
    solve(l);
    const s = l[2].map((v, i) => (v === 0 ? i : -1)).filter((v) => v !== -1);
    if (!s.length) {
      return;
    }
    const o = Math.floor(Math.random() * s.length);
    cb?.(s[o]);
    d[s[o]] = 1;
  }
};
