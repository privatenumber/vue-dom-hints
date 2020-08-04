import {createLocalVue, mount} from '@vue/test-utils';
import DomHints from '..';

let Foo;

beforeEach(() => {
	Foo = {
		__file: 'Foo.vue',
		name: 'Foo',
		render(h) {
			return h('div', ['foo']);
		},
	};
});

describe('hint attribute annotation', () => {

	test('use __file', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints);

		const wrapper = mount(Foo, {localVue});
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify([Foo.__file, 'App root']));
	});

	test('fallback to name if no __file', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints);

		delete Foo.__file;

		const wrapper = mount(Foo, {localVue});
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify([Foo.name, 'App root']));
	});

	test('custom annotation attribute', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, {attributeName: 'random-attribute'});

		const wrapper = mount(Foo, {localVue});
		expect(wrapper.vm.$el.getAttribute('random-attribute')).toBe(JSON.stringify([Foo.__file, 'App root']));
	});

	test('extended component', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, {attributeName: 'random-attribute'});

		const Bar = {
			// Seems like with extends, the `__file` property needs to be overwritten explicitly
			__file: 'Bar.vue',
			extends: Foo,
		};

		const wrapper = mount(Bar, {localVue});
		expect(wrapper.vm.$el.getAttribute('random-attribute')).toBe(JSON.stringify(['Bar.vue', 'App root']));
	});
});

describe('error cases', () => {
	test('handle name-less', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints);

		const wrapper = mount(Foo, {localVue});
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify(['Foo.vue', 'App root']));
	});
});
