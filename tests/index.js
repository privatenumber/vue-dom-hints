import 'jsdom-global/register.js';
import { describe, expect } from 'manten';
import { createLocalVue, mount } from '@vue/test-utils';
import { spyOn } from 'tinyspy';
import DomHints from '../src/index.js';

const componentFixture = () => ({
	__file: 'App.vue',
	name: 'App',
	render: h => h('div', ['App']),
});

describe('attribute annotation', ({ test }) => {
	test('use __file', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const App = componentFixture();
		const wrapper = mount(App, { localVue });
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify([App.__file, '<App root>']));
	});

	test('fallback to name if no __file', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const App = componentFixture();
		delete App.__file;

		const wrapper = mount(App, { localVue });
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify([App.name, '<App root>']));
	});

	test('custom annotation attribute', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, {
			showDevtip: false,
			attributeName: 'random-attribute',
		});

		const App = componentFixture();
		const wrapper = mount(App, { localVue });
		expect(wrapper.vm.$el.getAttribute('random-attribute')).toBe(JSON.stringify([App.__file, '<App root>']));
	});

	test('extended component', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, {
			showDevtip: false,
			attributeName: 'random-attribute',
		});

		const App = componentFixture();
		const Bar = {
			// Seems like with extends, the `__file` property needs to be overwritten explicitly
			__file: 'Bar.vue',
			extends: App,
		};

		const wrapper = mount(Bar, { localVue });
		expect(wrapper.vm.$el.getAttribute('random-attribute')).toBe(JSON.stringify(['Bar.vue', '<App root>']));
	});
});

describe('VMs property', ({ test }) => {
	test('__vms__ to contain references', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const App = componentFixture();
		const wrapper = mount(App, { localVue });
		expect(wrapper.vm.$el.__vms__).toStrictEqual([wrapper.vm, wrapper.vm.$parent]);
	});

	test('property name to be configurable', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, {
			showDevtip: false,
			vmsPropertyName: 'randomProperty',
		});

		const App = componentFixture();
		const wrapper = mount(App, { localVue });
		expect(wrapper.vm.$el.randomProperty).toStrictEqual([wrapper.vm, wrapper.vm.$parent]);
	});
});

describe('showDevtip', ({ test }) => {
	test('show devtip', () => {
		const spy = spyOn(global.console, 'info', () => {});
		const localVue = createLocalVue();
		localVue.use(DomHints);

		const App = componentFixture();
		mount(App, { localVue });
		expect(spy.called).toBe(true);
		spy.restore();
	});

	test('turn off devtip', () => {
		const spy = spyOn(global.console, 'info');
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const App = componentFixture();
		mount(App, { localVue });
		expect(spy.called).toBe(false);
		spy.restore();
	});
});

describe('error cases', ({ test }) => {
	test('handle name-less', () => {
		const localVue = createLocalVue();
		localVue.use(DomHints, { showDevtip: false });

		const App = componentFixture();
		const wrapper = mount(App, { localVue });
		expect(wrapper.vm.$el.getAttribute('__vue__')).toBe(JSON.stringify(['App.vue', '<App root>']));
	});
});
