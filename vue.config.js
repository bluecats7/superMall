const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	chainWebpack: (config)=>{
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('assets',resolve('src/assets'))
			.set('components',resolve('src/components'))
			.set('views',resolve('src/views'))
			.set('router',resolve('src/router'))
      .set('common',resolve('src/common'))
      .set('network',resolve('src/network'))
	}
}