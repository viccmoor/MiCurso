import { vars } from 'nativewind';

export const themes = {
	light: vars({
		'--color-bg': '#FFFFFF',
		'--color-primary-default': '#A9B5DF',
		'--color-primary': '#A9B5DF',
		'--color-secondary-default': '#2D336B',
		'--color-secondary': '#2D336B',
		'--color-schedule-block': '#F1F1F1',
		'--color-days-text': '#1E1E1E',
		'--color-modules-text': '#1E1E1E',
		'--color-text-default': '#1E1E1E',
		'--bg-modal-input': '#FAFAFA',
		'--text-modal-placeholder': '#858585',
		'--text-modal-focus': '#1E1E1E',
	}),
	dark: vars({
		'--color-bg': '#1E1E1E',
		'--color-primary-default': '#2D336B',
		'--color-primary': '#2D336B',
		'--color-secondary-default': '#A9B5DF',
		'--color-secondary': '#A9B5DF',
		'--color-schedule-block': '#131313',
		'--color-days-text': '#F1F1F1',
		'--color-modules-text': '#F1F1F1',
		'--color-text-default': '#F1F1F1',
		'--bg-modal-input': '#131313',
		'--text-modal-placeholder': '#858585',
		'--text-modal-focus': '#FFFFFF',
	}),
};