import { cp } from 'node:fs/promises';

await cp('dist', '../davet', { recursive: true });
