const getAnnotation = ($element, attributeName) => {
	let annotation;
	if ($element.nodeType === 1) {
		// Element node
		annotation = $element.getAttribute(attributeName);
	} else if ($element.nodeType === 8) {
		// Comment node
		annotation = $element.textContent;
	}

	return annotation ? JSON.parse(annotation) : [];
};

const setAnnotation = ($element, attributeName, annotation) => {
	annotation = JSON.stringify(annotation);

	if ($element.nodeType === 1) {
		// Element node
		$element.setAttribute(attributeName, annotation);
	} else if ($element.nodeType === 8) {
		// Comment node
		$element.textContent = annotation;
	}
};

const DomHints = {
	install(Vue, {attributeName = '__vue__'} = {}) {
		let notified = false;

		Vue.mixin({
			mounted() {
				if (!notified) {
					console.info(`[vue-dom-hints] 💁‍♀️ Inspect an element with the \`${attributeName}\` attribute and enter \`$0.__vue__\` in your console to inspect the view model`);
					notified = true;
				}

				const {$el} = this;
				let name = this.$options.__file || this.$options.name;

				if (!name && !this.$parent) {
					name = 'App root';
				}

				if (name) {
					const annotate = getAnnotation($el, attributeName);
					if (!annotate.includes(name)) {
						annotate.push(name);
					}

					setAnnotation($el, attributeName, annotate);
				}
			},
		});
	},
};

export default DomHints;
