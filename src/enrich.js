const j = require('jscodeshift');

const renderTemplate = templateString => `
	render() {
		return html\`${templateString}\`
	}
`.replace(/\t/gi, '');

const addLitReferences = source => j(source)
	.find(j.ExportDefaultDeclaration)
	.insertBefore('import {LitElement, html} from \'lit-element\'')
	.find(j.Identifier)
	.at(0)
	.forEach(item => j(item).replaceWith(`${item.node.name} extends LitElement`))
	.toSource();

const addRenderTemplate = (jsSource, templateString) => j(jsSource)
	.find(j.ClassDeclaration)
	.find(j.ClassBody)
	.find(j.MethodDefinition)
	.at(-1)
	.forEach(path => j(path).insertAfter(renderTemplate(templateString)))
	.toSource();

module.exports = (jsSource, templateString) =>
	addRenderTemplate(addLitReferences(jsSource), templateString);

