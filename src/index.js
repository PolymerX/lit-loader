const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

const debug = require('./debug');
const parser = require('./parser');
const enrich = require('./enrich');

module.exports = async function (source) {
	const cb = this.async();

	const {style, template, script} = parser(source);
	const isPostCSSEnable = style.attrs.find(item => item.name === 'lang') || {};
	const css = isPostCSSEnable.value === 'postcss' ? await postcssrc()
		.then(({plugins, options}) =>
			postcss(plugins).process(style.value, {...options, from: this.resourcePath}))
		.then(res => res.css)
		.catch(error => cb(error)) : style.value;

	const templateString = `<style>${css}</style>${template.value}`;
	const enriched = enrich(script.value, templateString);

	debug(enriched);

	return cb(null, enriched);
};
