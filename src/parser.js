const {parseFragment} = require('parse5');
const Serializer = require('parse5/lib/serializer');

const TYPES = ['style', 'script', 'template'];

module.exports = text => {
	// don't change >, <, &, " to html entities in this context
	const coreEscape = Serializer.escapeString;
	Serializer.escapeString = str => str;

	const parsed = parseFragment(text)
		.childNodes
		.filter(node => TYPES.includes(node.nodeName))
		.reduce((acc, node) => {
			const serializer = new Serializer(node.content);
			acc[node.nodeName] = {
				tag: node.nodeName,
				attrs: node.attrs,
				value: node.childNodes.length > 0 ? node.childNodes[0].value : serializer.serialize()
			};
			return acc;
		}, {});

	// restore entity escaping in case it's needed elsewhere
	Serializer.escapeString = coreEscape;

	return parsed;
};
