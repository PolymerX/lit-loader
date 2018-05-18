import test from 'ava';
import m from '../src/parser';

import {SCRIPT, STYLE, TEMPLATE} from './fixtures/Element.lit';

test('Correctly parse content', t => {
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

	const {style, template, script} = m(content);
	t.is(style.value.replace(/\n/gi, ''), STYLE);
	t.is(template.value.replace(/\n/gi, ''), TEMPLATE);
	t.is(script.value.replace(/\n/gi, ''), SCRIPT);
});
