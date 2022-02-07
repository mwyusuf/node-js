import { readFile } from 'fs/promises';

readFile(new URL('app.mj', import.meta.url), 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Ini tidak error');
    }
});