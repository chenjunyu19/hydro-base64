import { Context } from 'hydrooj';

export async function apply(ctx: Context) {
    ctx.on('handler/before', (h) => {
        if (h.request.headers['x-hydro-encoding'] === 'base64') {
            const payload = JSON.parse(Buffer.from(h.request.body.encodedBody, 'base64').toString());
            h.request.body = { ...payload, ...h.request.body };
            h.args = { ...payload, ...h.args };
        }
    });
}
