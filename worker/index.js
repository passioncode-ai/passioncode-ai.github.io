import release from '../switchboard/release.json' with { type: 'json' }

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.hostname === 'www.passioncode.ai') {
      url.hostname = 'passioncode.ai'
      return Response.redirect(url, 301)
    }
    const download = /^\/switchboard\/download\/(macos|windows)\/?$/.exec(url.pathname)
    if (download) {
      return new Response(null, {
        status: 302,
        headers: { Location: release.downloads[download[1]], 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }
      })
    }
    return env.ASSETS.fetch(request)
  }
}
