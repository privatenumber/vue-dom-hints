import { createLocalVue, mount } from '@vue/test-utils';
import DomHints from '..';

let Foo;

beforeEach(() => {
	Foo = {
		render(h) {
			return h('div', ['foo']);
		}
	};
});

test('hint attribute annotation', () => {
	const localVue = createLocalVue();
	localVue.use(DomHints);

	Foo.name = `component${Math.random()}`;

	const wrapper = mount(Foo, { localVue });
	expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify([Foo.name, 'App root']));
});

test('custom annotation attribute', () => {
	const localVue = createLocalVue();
	localVue.use(DomHints, { attributeName: 'random-attribute' });

	Foo.name = `component${Math.random()}`;

	const wrapper = mount(Foo, { localVue });
	expect(wrapper.vm.$el.getAttribute('random-attribute')).toBe(JSON.stringify([Foo.name, 'App root']));
});

describe('error cases', () => {
	test('handle name-less', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints);

		const wrapper = mount(Foo, { localVue });
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify(['App root']));
	});
});
