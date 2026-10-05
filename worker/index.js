import release from '../switchboard/release.json' with { type: 'json' }
import fabric from '../fabric/release.json' with { type: 'json' }
import inbox from '../inbox/release.json' with { type: 'json' }
import dashboards from '../dashboards/release.json' with { type: 'json' }

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
    const fabricDownload = /^\/fabric\/download\/(macos)\/?$/.exec(url.pathname)
    if (fabricDownload) {
      return new Response(null, {
        status: 302,
        headers: { Location: fabric.downloads[fabricDownload[1]], 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }
      })
    }
    const inboxDownload = /^\/inbox\/download\/(macos)\/?$/.exec(url.pathname)
    if (inboxDownload) {
      return new Response(null, {
        status: 302,
        headers: { Location: inbox.downloads[inboxDownload[1]], 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }
      })
    }
    const dashboardsDownload = /^\/dashboards\/download\/(macos)\/?$/.exec(url.pathname)
    if (dashboardsDownload) {
      return new Response(null, {
        status: 302,
        headers: { Location: dashboards.downloads[dashboardsDownload[1]], 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }
      })
    }
    return env.ASSETS.fetch(request)
  }
}
