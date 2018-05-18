const {parseFragment, serialize} = require('parse5');

const TYPES = ['style', 'script', 'template'];

module.exports = text => parseFragment(text)
	.childNodes
	.filter(node => TYPES.includes(node.nodeName))
	.reduce((acc, node) => {
		acc[node.nodeName] = {
			tag: node.nodeName,
			attrs: node.attrs,
			value: node.childNodes.length > 0 ? node.childNodes[0].value : serialize(node.content)
		};

		return acc;
	}, {});
