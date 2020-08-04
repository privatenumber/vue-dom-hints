/*
todo:
- attr name to be passed in as option
*/

const getAnnotation = ($el) => {
	let annotation;
	if ($el.nodeType === 1) {
		annotation = $el.getAttribute('__vue__');
	}

	// Comment
	else if ($el.nodeType === 8) {
		annotation = $el.textContent;
	}

	return annotation ? JSON.parse(annotation) : [];
};

const setAnnotation = ($el, annotation) => {
	annotation = JSON.stringify(annotation);

	if ($el.nodeType === 1) {
		$el.setAttribute('__vue__', annotation);
	}

	// Comment
	else if ($el.nodeType === 8) {
		$el.textContent = annotation;
	}
};

export default {
	install(Vue, options) {
		Vue.mixin({
			mounted() {
				const { $el } = this;
				let name = this.$options.__file || this.$options.name;

				if (!name && !this.$parent) {
					name = 'App root';
				}

				if (name) {
					const annotate = getAnnotation($el);
					if (!annotate.includes(name)) {
						annotate.push(name);
					}
					setAnnotation($el, annotate);
				}
			}
		});
	}
};
