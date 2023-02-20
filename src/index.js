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

const tip = (attributeName) => {
	const code = 'color:#c58640; background:#222529; border:1px solid #3c3e42; font-family:monospace; padding:2px; border-radius:3px';
	console.info(
		`%c vue-dom-hints %c Inspect a component by selecting an element with the %c\`${attributeName}\`%c attribute and entering %c\`$0.__vue__\`%c in the console`,
		'background:#35495e; padding:2px; border-radius:3px; color:#fff',
		'',
		code,
		'',
		code,
		'',
	);
};

const DomHints = {
	install(Vue, {
		attributeName = '__vue__',
		vmsPropertyName = '__vms__',
		showDevtip = true,
	} = {}) {
		let notified = !showDevtip;

		Vue.mixin({
			mounted() {
				if (!notified) {
					tip(attributeName);
					notified = true;
				}

				const { $el, $options, $parent } = this;
				const name = (
					$options.__file
					|| $options.name
					|| $options._componentTag
					|| ($parent ? '<anonymous>' : '<App root>')
				);

				if (name) {
					const annotate = getAnnotation($el, attributeName);
					if (!annotate.includes(name)) {
						annotate.push(name);
					}

					setAnnotation($el, attributeName, annotate);
				}

				/**
				 * Vue.js adds the associated VM to the element's __vue__ property
				 * but doesn't provide a way to access all VMs associated with an element
				 *
				 * When a component uses another component as the root element
				 * a single DOM element can be associated with multiple VMs
				 */
				if (!$el[vmsPropertyName]) {
					$el[vmsPropertyName] = [];
				}
				$el[vmsPropertyName].push(this);
			},
		});
	},
};

export default DomHints;
