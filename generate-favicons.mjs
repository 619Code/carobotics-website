import sharp from 'sharp';
import { writeFile } from 'fs/promises';

const source = 'public/apple-touch-icon.png';

// Generate 32x32 PNG
await sharp(source)
  .resize(32, 32)
  .png()
  .toFile('public/favicon-32x32.png');
console.log('Generated favicon-32x32.png');

// Generate buffers for ICO
const buf16 = await sharp(source).resize(16, 16).png().toBuffer();
const buf32 = await sharp(source).resize(32, 32).png().toBuffer();
const buf48 = await sharp(source).resize(48, 48).png().toBuffer();

// Create ICO file with embedded PNG data (modern ICO format)
function createIco(images) {
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * images.length;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4);

  const dirs = images.map(({ width, height, buffer }) => {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(width >= 256 ? 0 : width, 0);
    dir.writeUInt8(height >= 256 ? 0 : height, 1);
    dir.writeUInt8(0, 2); // color count (0 = true color)
    dir.writeUInt8(0, 3); // reserved
    dir.writeUInt16LE(1, 4); // planes
    dir.writeUInt16LE(32, 6); // bit depth
    dir.writeUInt32LE(buffer.length, 8);
    dir.writeUInt32LE(offset, 12);
    offset += buffer.length;
    return dir;
  });

  return Buffer.concat([header, ...dirs, ...images.map(i => i.buffer)]);
}

const icoBuffer = createIco([
  { width: 16, height: 16, buffer: buf16 },
  { width: 32, height: 32, buffer: buf32 },
  { width: 48, height: 48, buffer: buf48 },
]);

await writeFile('public/favicon.ico', icoBuffer);
console.log('Generated favicon.ico');
console.log('Done!');
