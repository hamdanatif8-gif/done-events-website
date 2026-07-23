export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const response = await env.ASSETS.fetch(request)

    if (
      (url.pathname === '/' || response.status === 404) &&
      request.method === 'GET' &&
      request.headers.get('accept')?.includes('text/html')
    ) {
      url.pathname = '/index.html'
      return env.ASSETS.fetch(new Request(url, request))
    }

    return response
  },
}
