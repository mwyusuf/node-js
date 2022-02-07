import { readFile, writeFile } from 'fs/promises';

let template = await readFile(new URL('./template.html', import.meta.url), 'utf-8');

const data = {
    title: 'Yusuf Coba File System',
    body: 'This is body yusuf html',
};
  
for (const [key, val] of Object.entries(data)) {
    template = template.replace(`{${key}}`, val)
}

await writeFile(new URL('./index.html', import.meta.url), template);

console.log(template);
