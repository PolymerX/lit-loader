module.exports = {
	SCRIPT: `
export default class CounterElement {
	static get properties() { return {
		/* The total number of clicks you've done. */
		clicks: Number,
		/* The current value of the counter. */
		value: Number
	}};

	constructor() {
		super();
		this.clicks = 0;
		this.value = 0;
	}

	_onIncrement() {
		this.value++;
		this.clicks++;
		this.dispatchEvent(new CustomEvent('counter-incremented'));
	}

	_onDecrement() {
		this.value--;
		this.clicks++;
		this.dispatchEvent(new CustomEvent('counter-decremented'));
	}
}

window.customElements.define('counter-element', CounterElement);
`.replace(/\n/gi, ''),
	STYLE: `
@import './style.pcss';

span {
	width: 20px;
	display: flex;
	text-align: center;
	font-weight: bold;
}`.replace(/\n/gi, ''),
	TEMPLATE: `
<div>
	<p>
		Clicked: <span>\${props.clicks}</span> times.
		Value is <span>\${props.value}</span>.
		<button on-click="\${() => this._onIncrement()}" title="Add 1">+</button>
		<button on-click="\${() => this._onDecrement()}" title="Minus 1">-</button>
	</p>
</div>`.replace(/\n/gi, '')
}
