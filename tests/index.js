import 'jsdom-global/register.js';
import { describe, expect } from 'manten';
import { createLocalVue, mount } from '@vue/test-utils';
import { spyOn } from 'tinyspy';
import DomHints from '../src/index.js';

const componentFixture = () => ({
	__file: 'Foo.vue',
	name: 'Foo',
	render: h => h('div', ['foo']),
});

describe('hint attribute annotation', ({ test }) => {
	test('use __file', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const Foo = componentFixture();
		const wrapper = mount(Foo, { localVue });
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify([Foo.__file, 'App root']));
	});

	test('fallback to name if no __file', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const Foo = componentFixture();
		delete Foo.__file;

		const wrapper = mount(Foo, { localVue });
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify([Foo.name, 'App root']));
	});

	test('custom annotation attribute', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, {
			showDevtip: false,
			attributeName: 'random-attribute',
		});

		const Foo = componentFixture();
		const wrapper = mount(Foo, { localVue });
		expect(wrapper.vm.$el.getAttribute('random-attribute')).toBe(JSON.stringify([Foo.__file, 'App root']));
	});

	test('extended component', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, {
			showDevtip: false,
			attributeName: 'random-attribute',
		});

		const Foo = componentFixture();
		const Bar = {
			// Seems like with extends, the `__file` property needs to be overwritten explicitly
			__file: 'Bar.vue',
			extends: Foo,
		};

		const wrapper = mount(Bar, { localVue });
		expect(wrapper.vm.$el.getAttribute('random-attribute')).toBe(JSON.stringify(['Bar.vue', 'App root']));
	});
});

describe('showDevtip', ({ test }) => {
	test('show devtip', () => {
		const spy = spyOn(global.console, 'info', () => {});
		const localVue = createLocalVue();
		localVue.use(DomHints);

		const Foo = componentFixture();
		mount(Foo, { localVue });
		expect(spy.called).toBe(true);
		spy.restore();
	});

	test('turn off devtip', () => {
		const spy = spyOn(global.console, 'info');
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const Foo = componentFixture();
		mount(Foo, { localVue });
		expect(spy.called).toBe(false);
		spy.restore();
	});
});

describe('error cases', ({ test }) => {
	test('handle name-less', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const Foo = componentFixture();
		const wrapper = mount(Foo, { localVue });
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify(['Foo.vue', 'App root']));
	});
});
