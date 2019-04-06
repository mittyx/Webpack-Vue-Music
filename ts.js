const fs = require('fs')
const Koa = require("koa")
var path = require('path')
const staticCache = require("koa-static-cache")
const app = new Koa()


app.use((ctx) => {
  let extName = path.extname(ctx.url),
      extName = extName ? extName.slice(1) : 'unknown';
	if(extName === "css") {
		ctx.type = "text/css"
	}
});

app.listen(80, () => {
  console.log('server is starting at port 80')
})

app.use(staticCache(path.join(__dirname, 'dist'), {
  maxAge: 365 * 24 * 60 * 60
}))