import test from 'ava';
import parser from '../src/parser';
import m from '../src/enrich';

import {SCRIPT, STYLE, TEMPLATE} from './fixtures/Element.lit';

test('Correctly enrich', t => {
	const content = `
<style>
${STYLE}
</style>
<template>
${TEMPLATE}
</template>
<script>
${SCRIPT}
</script>
`;

	const {style, template, script} = parser(content);
	const enriched = m(script.value, `<style>${style.value}</style>${template.value}`);

	t.true(enriched.includes('import {LitElement, html} from \'@polymer/lit-element\''), 'Includes import LitElement');
	t.true(enriched.includes('CounterElement extends LitElement {'), 'Includes extends LitElement');
	t.true(enriched.includes('_render(props)'), 'Includes render function');
	t.true(enriched.includes('return html`'), 'Includes return html function');
});
