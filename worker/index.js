export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.hostname === 'www.passioncode.ai') {
      url.hostname = 'passioncode.ai'
      return Response.redirect(url, 301)
    }

    return env.ASSETS.fetch(request)
  }
}
