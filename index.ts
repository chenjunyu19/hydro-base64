import { Context } from 'hydrooj';

function assign(dest, src) {
    for (const prop in src) {
        if (!(prop in dest)) {
            dest[prop] = src[prop];
        }
    }
}

export async function apply(ctx: Context) {
    ctx.on('handler/before', (h) => {
        if (h.request.headers['x-hydro-encoding'] === 'base64') {
            const payload = JSON.parse(Buffer.from(h.request.body.encodedBody, 'base64').toString());
            assign(h.request.body, payload);
            assign(h.args, payload);
        }
    });
}
