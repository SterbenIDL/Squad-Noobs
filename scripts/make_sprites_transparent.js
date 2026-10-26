import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const base = process.cwd();

const sprites = [
  {
    id: 'idan',
    src: path.join(base, 'src/assets/images/idan_fighter_sprite_1793055728191.jpg'),
    out: path.join(base, 'public/assets/sprites/idan_sprite.png')
  },
  {
    id: 'ivan',
    src: path.join(base, 'src/assets/images/ivan_fighter_sprite_1793055743221.jpg'),
    out: path.join(base, 'public/assets/sprites/ivan_sprite.png')
  },
  {
    id: 'philip',
    src: path.join(base, 'src/assets/images/philip_fighter_sprite_1793055755527.jpg'),
    out: path.join(base, 'public/assets/sprites/philip_sprite.png')
  },
  {
    id: 'roni',
    src: path.join(base, 'src/assets/images/roni_fighter_sprite_1793055768189.jpg'),
    out: path.join(base, 'public/assets/sprites/roni_sprite.png')
  }
];

fs.mkdirSync(path.join(base, 'public/assets/sprites'), { recursive: true });

async function processSprite(item) {
  const { data, info } = await sharp(item.src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  // Use flood fill BFS from the border (0,0) so we only remove external background,
  // without touching white text inside shirt or white reflections!
  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);
  const queue = [];

  function isWhitePixel(idx) {
    const r = data[idx * 4];
    const g = data[idx * 4 + 1];
    const b = data[idx * 4 + 2];
    // Almost white
    return r >= 236 && g >= 236 && b >= 236;
  }

  // Push all border pixels to queue if white
  for (let x = 0; x < width; x++) {
    const topIdx = 0 * width + x;
    const botIdx = (height - 1) * width + x;
    if (isWhitePixel(topIdx)) { queue.push(topIdx); visited[topIdx] = 1; isBg[topIdx] = 1; }
    if (isWhitePixel(botIdx)) { queue.push(botIdx); visited[botIdx] = 1; isBg[botIdx] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const leftIdx = y * width + 0;
    const rightIdx = y * width + (width - 1);
    if (!visited[leftIdx] && isWhitePixel(leftIdx)) { queue.push(leftIdx); visited[leftIdx] = 1; isBg[leftIdx] = 1; }
    if (!visited[rightIdx] && isWhitePixel(rightIdx)) { queue.push(rightIdx); visited[rightIdx] = 1; isBg[rightIdx] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cy > 0 ? (cy - 1) * width + cx : -1,
      cy < height - 1 ? (cy + 1) * width + cx : -1,
      cx > 0 ? cy * width + (cx - 1) : -1,
      cx < width - 1 ? cy * width + (cx + 1) : -1
    ];

    for (const n of neighbors) {
      if (n >= 0 && !visited[n]) {
        visited[n] = 1;
        if (isWhitePixel(n)) {
          isBg[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  // Now apply alpha:
  for (let i = 0; i < width * height; i++) {
    const offset = i * 4;
    if (isBg[i]) {
      data[offset + 3] = 0; // Completely transparent!
    } else {
      // Check if adjacent to background for soft anti-aliased edge
      const cx = i % width;
      const cy = Math.floor(i / width);
      let bgCount = 0;
      if (cy > 0 && isBg[(cy - 1) * width + cx]) bgCount++;
      if (cy < height - 1 && isBg[(cy + 1) * width + cx]) bgCount++;
      if (cx > 0 && isBg[cy * width + (cx - 1)]) bgCount++;
      if (cx < width - 1 && isBg[cy * width + (cx + 1)]) bgCount++;

      if (bgCount > 0) {
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        if (r > 215 && g > 215 && b > 215) {
          // Soft blend
          data[offset + 3] = Math.max(0, 255 - bgCount * 55);
        }
      }
    }
  }

  // Trim transparent borders and save
  await sharp(data, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ compressionLevel: 8 })
    .toFile(item.out);

  console.log(`Saved transparent sprite: ${item.out}`);
}

for (const s of sprites) {
  await processSprite(s);
}
console.log('All sprites processed successfully!');
