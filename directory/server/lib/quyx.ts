import QuyxSdk from '@quyx/ts';

const QUYX_SECRET_KEY = process.env.QUYX_SECRET_KEY;
console.log('QUYX_SECRET_KEY:', QUYX_SECRET_KEY);
if (!QUYX_SECRET_KEY) throw new Error('QUYX_SECRET_KEY not set in .env');

const quyx = new QuyxSdk({ sk: QUYX_SECRET_KEY });

export default quyx;
