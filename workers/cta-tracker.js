const ALLOWED_EVENTS = new Set(['create_pdf', 'copy_link', 'prepare_email']);
const ALLOWED_ORIGIN = 'https://bebroggi.it';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    'Vary': 'Origin'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== 'POST' || origin !== ALLOWED_ORIGIN) {
      return new Response(null, { status: 404, headers });
    }

    let data;
    try {
      data = await request.json();
    } catch (error) {
      return new Response(null, { status: 400, headers });
    }
    if (!data || !ALLOWED_EVENTS.has(data.event)) {
      return new Response(null, { status: 400, headers });
    }

    // Solo dimensioni aggregate: CTA e Paese. Non registrare email, URL con query o IP.
    env.CTA.writeDataPoint({
      blobs: [data.event, request.cf?.country || 'XX'],
      doubles: [1],
      indexes: ['rentbuy-cta-v1']
    });
    return new Response(null, { status: 204, headers });
  }
};
