/**
 * Static map of component → system token definitions for non-colour tokens.
 * Derived from the factory's system token JSON files (packages/tokens/src/system/).
 *
 * Each entry specifies which alias tier the token references and its default value.
 */

export type AliasTier = 'spacing' | 'sizing' | 'radius' | 'border-width' | 'opacity' | 'font-size' | 'font-weight' | 'colour';

export interface SystemTokenDef {
  token: string;
  alias: AliasTier;
  default: string;
}

export const SYSTEM_TOKENS: Record<string, SystemTokenDef[]> = {
  button: [
    { token: 'button-radius', alias: 'radius', default: 'md' },
    { token: 'button-border-width', alias: 'border-width', default: 'thin' },
    { token: 'button-gap', alias: 'spacing', default: 'sm' },
    { token: 'button-loading-opacity', alias: 'opacity', default: '70' },
    { token: 'button-sm-padding-x', alias: 'spacing', default: 'md' },
    { token: 'button-sm-padding-y', alias: 'spacing', default: 'xs' },
    { token: 'button-sm-font-size', alias: 'font-size', default: 'sm' },
    { token: 'button-sm-height', alias: 'sizing', default: 'md' },
    { token: 'button-md-padding-x', alias: 'spacing', default: 'lg' },
    { token: 'button-md-padding-y', alias: 'spacing', default: 'sm' },
    { token: 'button-md-font-size', alias: 'font-size', default: 'base' },
    { token: 'button-md-height', alias: 'sizing', default: 'lg' },
    { token: 'button-lg-padding-x', alias: 'spacing', default: 'xl' },
    { token: 'button-lg-padding-y', alias: 'spacing', default: 'md' },
    { token: 'button-lg-font-size', alias: 'font-size', default: 'lg' },
    { token: 'button-lg-height', alias: 'sizing', default: 'xl' },
  ],
  input: [
    { token: 'input-radius', alias: 'radius', default: 'md' },
    { token: 'input-padding-x', alias: 'spacing', default: 'md' },
    { token: 'input-padding-y', alias: 'spacing', default: 'sm' },
    { token: 'input-font-size', alias: 'font-size', default: 'base' },
    { token: 'input-border-width', alias: 'border-width', default: 'thin' },
    { token: 'input-gap', alias: 'spacing', default: 'xs' },
  ],
  badge: [
    { token: 'badge-radius', alias: 'radius', default: 'full' },
    { token: 'badge-sm-padding-x', alias: 'spacing', default: 'sm' },
    { token: 'badge-sm-padding-y', alias: 'spacing', default: 'none' },
    { token: 'badge-sm-font-size', alias: 'font-size', default: 'xs' },
    { token: 'badge-md-padding-x', alias: 'spacing', default: 'md' },
    { token: 'badge-md-padding-y', alias: 'spacing', default: 'xs' },
    { token: 'badge-md-font-size', alias: 'font-size', default: 'sm' },
    { token: 'badge-lg-padding-x', alias: 'spacing', default: 'lg' },
    { token: 'badge-lg-padding-y', alias: 'spacing', default: 'xs' },
    { token: 'badge-lg-font-size', alias: 'font-size', default: 'base' },
  ],
  checkbox: [
    { token: 'checkbox-size', alias: 'sizing', default: 'xs' },
    { token: 'checkbox-radius', alias: 'radius', default: 'sm' },
    { token: 'checkbox-border-width', alias: 'border-width', default: 'thin' },
    { token: 'checkbox-gap', alias: 'spacing', default: 'sm' },
  ],
  radio: [
    { token: 'radio-size', alias: 'sizing', default: 'xs' },
    { token: 'radio-radius', alias: 'radius', default: 'full' },
    { token: 'radio-border-width', alias: 'border-width', default: 'thin' },
    { token: 'radio-group-gap', alias: 'spacing', default: 'md' },
    { token: 'radio-gap', alias: 'spacing', default: 'sm' },
  ],
  toggle: [
    { token: 'toggle-track-radius', alias: 'radius', default: 'full' },
    { token: 'toggle-track-border-width', alias: 'border-width', default: 'none' },
    { token: 'toggle-track-height-sm', alias: 'sizing', default: 'xs' },
    { token: 'toggle-track-height-md', alias: 'sizing', default: 'sm' },
    { token: 'toggle-track-width-sm', alias: 'sizing', default: 'md' },
    { token: 'toggle-thumb-size-sm', alias: 'sizing', default: '2xs' },
    { token: 'toggle-thumb-size-md', alias: 'sizing', default: 'xs' },
    { token: 'toggle-thumb-radius', alias: 'radius', default: 'full' },
    { token: 'toggle-gap', alias: 'spacing', default: 'sm' },
  ],
  select: [
    { token: 'select-trigger-radius', alias: 'radius', default: 'md' },
    { token: 'select-trigger-padding-x', alias: 'spacing', default: 'md' },
    { token: 'select-trigger-padding-y', alias: 'spacing', default: 'sm' },
    { token: 'select-trigger-font-size', alias: 'font-size', default: 'base' },
    { token: 'select-trigger-border-width', alias: 'border-width', default: 'thin' },
    { token: 'select-trigger-min-height', alias: 'sizing', default: 'lg' },
    { token: 'select-listbox-radius', alias: 'radius', default: 'md' },
    { token: 'select-listbox-border-width', alias: 'border-width', default: 'thin' },
    { token: 'select-listbox-padding-y', alias: 'spacing', default: 'xs' },
    { token: 'select-option-padding-x', alias: 'spacing', default: 'md' },
    { token: 'select-option-padding-y', alias: 'spacing', default: 'sm' },
    { token: 'select-option-radius', alias: 'radius', default: 'sm' },
    { token: 'select-gap', alias: 'spacing', default: 'xs' },
  ],
  textarea: [
    { token: 'textarea-radius', alias: 'radius', default: 'md' },
    { token: 'textarea-padding-x', alias: 'spacing', default: 'md' },
    { token: 'textarea-padding-y', alias: 'spacing', default: 'sm' },
    { token: 'textarea-font-size', alias: 'font-size', default: 'base' },
    { token: 'textarea-border-width', alias: 'border-width', default: 'thin' },
    { token: 'textarea-gap', alias: 'spacing', default: 'xs' },
  ],
  alert: [
    { token: 'alert-radius', alias: 'radius', default: 'md' },
    { token: 'alert-padding-x', alias: 'spacing', default: 'lg' },
    { token: 'alert-padding-y', alias: 'spacing', default: 'md' },
    { token: 'alert-border-width', alias: 'border-width', default: 'thin' },
  ],
  accordion: [
    { token: 'accordion-border-width', alias: 'border-width', default: 'thin' },
    { token: 'accordion-trigger-padding-x', alias: 'spacing', default: 'lg' },
    { token: 'accordion-trigger-padding-y', alias: 'spacing', default: 'md' },
    { token: 'accordion-trigger-font-size', alias: 'font-size', default: 'base' },
    { token: 'accordion-panel-padding-x', alias: 'spacing', default: 'lg' },
    { token: 'accordion-panel-padding-y', alias: 'spacing', default: 'md' },
    { token: 'accordion-indicator-size', alias: 'sizing', default: 'xs' },
  ],
  separator: [
    { token: 'separator-thickness', alias: 'border-width', default: 'thin' },
    { token: 'separator-spacing', alias: 'spacing', default: 'lg' },
  ],
  box: [
    { token: 'box-border-width', alias: 'border-width', default: 'thin' },
    { token: 'box-radius-none', alias: 'radius', default: 'none' },
    { token: 'box-radius-sm', alias: 'radius', default: 'sm' },
    { token: 'box-radius-md', alias: 'radius', default: 'md' },
    { token: 'box-radius-lg', alias: 'radius', default: 'lg' },
    { token: 'box-padding-sm', alias: 'spacing', default: 'sm' },
    { token: 'box-padding-md', alias: 'spacing', default: 'lg' },
    { token: 'box-padding-lg', alias: 'spacing', default: '2xl' },
  ],
  section: [
    { token: 'section-padding-sm', alias: 'spacing', default: 'lg' },
    { token: 'section-padding-md', alias: 'spacing', default: '2xl' },
    { token: 'section-padding-lg', alias: 'spacing', default: '3xl' },
    { token: 'section-padding-xl', alias: 'spacing', default: '4xl' },
  ],
  wrapper: [
    { token: 'wrapper-padding-x-sm', alias: 'spacing', default: 'sm' },
    { token: 'wrapper-padding-x-md', alias: 'spacing', default: 'md' },
    { token: 'wrapper-padding-x-lg', alias: 'spacing', default: 'lg' },
    { token: 'wrapper-padding-x-xl', alias: 'spacing', default: 'xl' },
  ],
  focus: [
    { token: 'focus-ring-width', alias: 'border-width', default: 'thick' },
    { token: 'focus-ring-offset', alias: 'spacing', default: 'xs' },
  ],
  progress: [
    { token: 'progress-radius', alias: 'radius', default: 'full' },
  ],
};

/** All available alias values per tier */
export const ALIAS_OPTIONS: Record<AliasTier, string[]> = {
  spacing: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
  sizing: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
  radius: ['none', 'sm', 'md', 'lg', 'full'],
  'border-width': ['none', 'thin', 'thick'],
  opacity: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100'],
  'font-size': ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'],
  'font-weight': ['regular', 'medium', 'semibold', 'bold'],
  colour: [
    'primary', 'primary-hover', 'primary-active', 'on-primary',
    'surface-default', 'surface-muted', 'surface-raised',
    'on-surface-default', 'on-surface-muted',
    'border-default', 'border-strong', 'border-focus',
    'danger', 'danger-surface', 'on-danger', 'on-danger-surface',
    'success', 'success-surface', 'on-success', 'on-success-surface',
    'warning', 'warning-surface', 'on-warning', 'on-warning-surface',
    'info', 'info-surface', 'on-info', 'on-info-surface',
    'disabled', 'on-disabled',
    'transparent', 'backdrop',
  ],
};

/**
 * System-level colour token definitions grouped by component.
 * Derived from the factory's system colour token map.
 */
export const SYSTEM_COLOUR_TOKENS: Record<string, SystemTokenDef[]> = {
  text: [
    { token: 'text-body-color', alias: 'colour', default: 'on-surface-default' },
    { token: 'text-muted-color', alias: 'colour', default: 'on-surface-muted' },
    { token: 'text-display-color', alias: 'colour', default: 'on-surface-default' },
    { token: 'text-heading-color', alias: 'colour', default: 'on-surface-default' },
  ],
  alert: [
    { token: 'alert-info-surface', alias: 'colour', default: 'info-surface' },
    { token: 'alert-info-on-surface', alias: 'colour', default: 'on-info-surface' },
    { token: 'alert-info-border', alias: 'colour', default: 'info' },
    { token: 'alert-success-surface', alias: 'colour', default: 'success-surface' },
    { token: 'alert-success-on-surface', alias: 'colour', default: 'on-success-surface' },
    { token: 'alert-success-border', alias: 'colour', default: 'success' },
    { token: 'alert-warning-surface', alias: 'colour', default: 'warning-surface' },
    { token: 'alert-warning-on-surface', alias: 'colour', default: 'on-warning-surface' },
    { token: 'alert-warning-border', alias: 'colour', default: 'warning' },
    { token: 'alert-danger-surface', alias: 'colour', default: 'danger-surface' },
    { token: 'alert-danger-on-surface', alias: 'colour', default: 'on-danger-surface' },
    { token: 'alert-danger-border', alias: 'colour', default: 'danger' },
  ],
  avatar: [
    { token: 'avatar-neutral-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'avatar-neutral-on-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'avatar-primary-surface', alias: 'colour', default: 'primary' },
    { token: 'avatar-primary-on-surface', alias: 'colour', default: 'on-primary' },
  ],
  badge: [
    { token: 'badge-neutral-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'badge-neutral-on-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'badge-success-surface', alias: 'colour', default: 'success-surface' },
    { token: 'badge-success-on-surface', alias: 'colour', default: 'on-success-surface' },
    { token: 'badge-warning-surface', alias: 'colour', default: 'warning-surface' },
    { token: 'badge-warning-on-surface', alias: 'colour', default: 'on-warning-surface' },
    { token: 'badge-danger-surface', alias: 'colour', default: 'danger-surface' },
    { token: 'badge-danger-on-surface', alias: 'colour', default: 'on-danger-surface' },
    { token: 'badge-info-surface', alias: 'colour', default: 'info-surface' },
    { token: 'badge-info-on-surface', alias: 'colour', default: 'on-info-surface' },
  ],
  box: [
    { token: 'box-surface', alias: 'colour', default: 'surface-default' },
    { token: 'box-border', alias: 'colour', default: 'border-default' },
  ],
  button: [
    { token: 'button-primary-surface-default', alias: 'colour', default: 'primary' },
    { token: 'button-primary-surface-hover', alias: 'colour', default: 'primary-hover' },
    { token: 'button-primary-surface-active', alias: 'colour', default: 'primary-active' },
    { token: 'button-primary-on-surface-default', alias: 'colour', default: 'on-primary' },
    { token: 'button-primary-on-surface-hover', alias: 'colour', default: 'on-primary' },
    { token: 'button-primary-on-surface-active', alias: 'colour', default: 'on-primary' },
    { token: 'button-secondary-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'button-secondary-surface-hover', alias: 'colour', default: 'surface-muted' },
    { token: 'button-secondary-surface-active', alias: 'colour', default: 'surface-muted' },
    { token: 'button-secondary-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'button-secondary-on-surface-hover', alias: 'colour', default: 'on-surface-default' },
    { token: 'button-secondary-on-surface-active', alias: 'colour', default: 'on-surface-default' },
    { token: 'button-secondary-border-default', alias: 'colour', default: 'border-default' },
    { token: 'button-secondary-border-hover', alias: 'colour', default: 'border-strong' },
    { token: 'button-secondary-border-active', alias: 'colour', default: 'border-strong' },
    { token: 'button-ghost-surface-hover', alias: 'colour', default: 'surface-muted' },
    { token: 'button-ghost-surface-active', alias: 'colour', default: 'surface-muted' },
    { token: 'button-ghost-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'button-ghost-on-surface-hover', alias: 'colour', default: 'on-surface-default' },
    { token: 'button-ghost-on-surface-active', alias: 'colour', default: 'on-surface-default' },
    { token: 'button-disabled-surface', alias: 'colour', default: 'disabled' },
    { token: 'button-disabled-on-surface', alias: 'colour', default: 'on-disabled' },
  ],
  checkbox: [
    { token: 'checkbox-border-default', alias: 'colour', default: 'border-default' },
    { token: 'checkbox-border-hover', alias: 'colour', default: 'border-strong' },
    { token: 'checkbox-border-error', alias: 'colour', default: 'danger' },
    { token: 'checkbox-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'checkbox-border-checked', alias: 'colour', default: 'primary' },
    { token: 'checkbox-surface-checked', alias: 'colour', default: 'primary' },
    { token: 'checkbox-on-surface-checked', alias: 'colour', default: 'on-primary' },
    { token: 'checkbox-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'checkbox-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
  ],
  focus: [
    { token: 'focus-ring-color', alias: 'colour', default: 'border-focus' },
  ],
  input: [
    { token: 'input-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'input-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'input-on-surface-placeholder', alias: 'colour', default: 'on-surface-muted' },
    { token: 'input-border-default', alias: 'colour', default: 'border-default' },
    { token: 'input-border-hover', alias: 'colour', default: 'border-strong' },
    { token: 'input-border-focus', alias: 'colour', default: 'border-focus' },
    { token: 'input-border-error', alias: 'colour', default: 'danger' },
    { token: 'input-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'input-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
  ],
  progress: [
    { token: 'progress-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'progress-bar-surface', alias: 'colour', default: 'primary' },
  ],
  select: [
    { token: 'select-trigger-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'select-trigger-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'select-trigger-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'select-trigger-on-surface-placeholder', alias: 'colour', default: 'on-surface-muted' },
    { token: 'select-trigger-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
    { token: 'select-trigger-border-default', alias: 'colour', default: 'border-default' },
    { token: 'select-trigger-border-hover', alias: 'colour', default: 'border-strong' },
    { token: 'select-trigger-border-focus', alias: 'colour', default: 'border-focus' },
    { token: 'select-trigger-border-error', alias: 'colour', default: 'danger' },
    { token: 'select-listbox-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'select-listbox-border', alias: 'colour', default: 'border-default' },
    { token: 'select-option-surface-active', alias: 'colour', default: 'surface-muted' },
    { token: 'select-option-surface-selected', alias: 'colour', default: 'surface-muted' },
    { token: 'select-option-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'select-option-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
  ],
  separator: [
    { token: 'separator-color', alias: 'colour', default: 'border-default' },
  ],
  skeleton: [
    { token: 'skeleton-surface', alias: 'colour', default: 'surface-muted' },
  ],
  textarea: [
    { token: 'textarea-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'textarea-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'textarea-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'textarea-on-surface-placeholder', alias: 'colour', default: 'on-surface-muted' },
    { token: 'textarea-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
    { token: 'textarea-border-default', alias: 'colour', default: 'border-default' },
    { token: 'textarea-border-hover', alias: 'colour', default: 'border-strong' },
    { token: 'textarea-border-focus', alias: 'colour', default: 'border-focus' },
    { token: 'textarea-border-error', alias: 'colour', default: 'danger' },
  ],
  toggle: [
    { token: 'toggle-track-surface-default', alias: 'colour', default: 'border-default' },
    { token: 'toggle-track-surface-checked', alias: 'colour', default: 'primary' },
    { token: 'toggle-track-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'toggle-track-border-default', alias: 'colour', default: 'border-default' },
    { token: 'toggle-track-border-checked', alias: 'colour', default: 'primary' },
    { token: 'toggle-track-border-disabled', alias: 'colour', default: 'disabled' },
    { token: 'toggle-thumb-surface-default', alias: 'colour', default: 'surface-raised' },
    { token: 'toggle-thumb-surface-disabled', alias: 'colour', default: 'on-disabled' },
  ],
  accordion: [
    { token: 'accordion-border-color', alias: 'colour', default: 'border-default' },
    { token: 'accordion-trigger-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'accordion-trigger-on-surface-hover', alias: 'colour', default: 'on-surface-default' },
    { token: 'accordion-trigger-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
    { token: 'accordion-trigger-surface-default', alias: 'colour', default: 'transparent' },
    { token: 'accordion-trigger-surface-hover', alias: 'colour', default: 'surface-muted' },
    { token: 'accordion-trigger-surface-disabled', alias: 'colour', default: 'transparent' },
    { token: 'accordion-indicator-color', alias: 'colour', default: 'on-surface-muted' },
  ],
  breadcrumb: [
    { token: 'breadcrumb-color-default', alias: 'colour', default: 'on-surface-muted' },
    { token: 'breadcrumb-color-current', alias: 'colour', default: 'on-surface-default' },
    { token: 'breadcrumb-color-separator', alias: 'colour', default: 'on-surface-muted' },
  ],
  link: [
    { token: 'link-color-default', alias: 'colour', default: 'primary' },
    { token: 'link-color-hover', alias: 'colour', default: 'primary-hover' },
    { token: 'link-color-active', alias: 'colour', default: 'primary-active' },
    { token: 'link-color-visited', alias: 'colour', default: 'primary' },
  ],
  radio: [
    { token: 'radio-border-default', alias: 'colour', default: 'border-default' },
    { token: 'radio-border-hover', alias: 'colour', default: 'border-strong' },
    { token: 'radio-border-error', alias: 'colour', default: 'danger' },
    { token: 'radio-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'radio-border-checked', alias: 'colour', default: 'primary' },
    { token: 'radio-surface-checked', alias: 'colour', default: 'primary' },
    { token: 'radio-on-surface-checked', alias: 'colour', default: 'on-primary' },
    { token: 'radio-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'radio-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
  ],
  slider: [
    { token: 'slider-track-surface-default', alias: 'colour', default: 'surface-muted' },
    { token: 'slider-track-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'slider-fill-surface-default', alias: 'colour', default: 'primary' },
    { token: 'slider-fill-surface-disabled', alias: 'colour', default: 'on-disabled' },
    { token: 'slider-thumb-surface-default', alias: 'colour', default: 'surface-raised' },
    { token: 'slider-thumb-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'slider-thumb-border-default', alias: 'colour', default: 'primary' },
    { token: 'slider-thumb-border-disabled', alias: 'colour', default: 'on-disabled' },
  ],
  tabs: [
    { token: 'tabs-list-border-color', alias: 'colour', default: 'border-default' },
    { token: 'tabs-tab-on-surface-default', alias: 'colour', default: 'on-surface-muted' },
    { token: 'tabs-tab-on-surface-selected', alias: 'colour', default: 'primary' },
    { token: 'tabs-tab-on-surface-hover', alias: 'colour', default: 'on-surface-default' },
    { token: 'tabs-tab-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
    { token: 'tabs-tab-surface-default', alias: 'colour', default: 'transparent' },
    { token: 'tabs-tab-surface-hover', alias: 'colour', default: 'surface-muted' },
    { token: 'tabs-tab-indicator-color', alias: 'colour', default: 'primary' },
  ],
  dialog: [
    { token: 'dialog-backdrop-color', alias: 'colour', default: 'backdrop' },
    { token: 'dialog-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'dialog-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  drawer: [
    { token: 'drawer-backdrop-color', alias: 'colour', default: 'backdrop' },
    { token: 'drawer-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'drawer-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  dropdown: [
    { token: 'dropdown-content-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'dropdown-content-border', alias: 'colour', default: 'border-default' },
    { token: 'dropdown-item-surface-default', alias: 'colour', default: 'transparent' },
    { token: 'dropdown-item-surface-active', alias: 'colour', default: 'primary' },
    { token: 'dropdown-item-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'dropdown-item-on-surface-active', alias: 'colour', default: 'on-primary' },
    { token: 'dropdown-item-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
    { token: 'dropdown-separator-color', alias: 'colour', default: 'border-default' },
    { token: 'dropdown-label-color', alias: 'colour', default: 'on-surface-muted' },
  ],
  pagination: [
    { token: 'pagination-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'pagination-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'pagination-border-default', alias: 'colour', default: 'border-default' },
    { token: 'pagination-surface-hover', alias: 'colour', default: 'surface-muted' },
    { token: 'pagination-on-surface-hover', alias: 'colour', default: 'on-surface-default' },
    { token: 'pagination-border-hover', alias: 'colour', default: 'border-strong' },
    { token: 'pagination-surface-current', alias: 'colour', default: 'primary' },
    { token: 'pagination-on-surface-current', alias: 'colour', default: 'on-primary' },
    { token: 'pagination-border-current', alias: 'colour', default: 'primary' },
    { token: 'pagination-surface-disabled', alias: 'colour', default: 'disabled' },
    { token: 'pagination-on-surface-disabled', alias: 'colour', default: 'on-disabled' },
  ],
  popover: [
    { token: 'popover-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'popover-on-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'popover-border', alias: 'colour', default: 'border-default' },
  ],
  table: [
    { token: 'table-border-color', alias: 'colour', default: 'border-default' },
    { token: 'table-header-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'table-header-on-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'table-cell-on-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'table-striped-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'table-caption-color', alias: 'colour', default: 'on-surface-muted' },
  ],
  toast: [
    { token: 'toast-info-surface', alias: 'colour', default: 'info-surface' },
    { token: 'toast-info-on-surface', alias: 'colour', default: 'on-info-surface' },
    { token: 'toast-info-border', alias: 'colour', default: 'info' },
    { token: 'toast-success-surface', alias: 'colour', default: 'success-surface' },
    { token: 'toast-success-on-surface', alias: 'colour', default: 'on-success-surface' },
    { token: 'toast-success-border', alias: 'colour', default: 'success' },
    { token: 'toast-warning-surface', alias: 'colour', default: 'warning-surface' },
    { token: 'toast-warning-on-surface', alias: 'colour', default: 'on-warning-surface' },
    { token: 'toast-warning-border', alias: 'colour', default: 'warning' },
    { token: 'toast-danger-surface', alias: 'colour', default: 'danger-surface' },
    { token: 'toast-danger-on-surface', alias: 'colour', default: 'on-danger-surface' },
    { token: 'toast-danger-border', alias: 'colour', default: 'danger' },
    { token: 'toast-dismiss-color', alias: 'colour', default: 'on-surface-muted' },
  ],
  tooltip: [
    { token: 'tooltip-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'tooltip-on-surface', alias: 'colour', default: 'surface-default' },
  ],
  page: [
    { token: 'page-surface', alias: 'colour', default: 'surface-default' },
    { token: 'page-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
};

/**
 * Curated subset of SYSTEM_COLOUR_TOKENS: default-state surface and on-surface
 * tokens only. Used by the Component Editor to offer lightweight colour overrides
 * without exposing every state variant.
 */
export const SYSTEM_SURFACE_TOKENS: Record<string, SystemTokenDef[]> = {
  page: [
    { token: 'page-surface', alias: 'colour', default: 'surface-default' },
    { token: 'page-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  text: [
    { token: 'text-body-color', alias: 'colour', default: 'on-surface-default' },
    { token: 'text-muted-color', alias: 'colour', default: 'on-surface-muted' },
    { token: 'text-heading-color', alias: 'colour', default: 'on-surface-default' },
    { token: 'text-display-color', alias: 'colour', default: 'on-surface-default' },
  ],
  box: [
    { token: 'box-surface', alias: 'colour', default: 'surface-default' },
  ],
  input: [
    { token: 'input-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'input-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'input-on-surface-placeholder', alias: 'colour', default: 'on-surface-muted' },
  ],
  textarea: [
    { token: 'textarea-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'textarea-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'textarea-on-surface-placeholder', alias: 'colour', default: 'on-surface-muted' },
  ],
  select: [
    { token: 'select-trigger-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'select-trigger-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'select-trigger-on-surface-placeholder', alias: 'colour', default: 'on-surface-muted' },
    { token: 'select-listbox-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'select-option-on-surface-default', alias: 'colour', default: 'on-surface-default' },
  ],
  checkbox: [
    { token: 'checkbox-surface-default', alias: 'colour', default: 'surface-default' },
  ],
  radio: [
    { token: 'radio-surface-default', alias: 'colour', default: 'surface-default' },
  ],
  toggle: [
    { token: 'toggle-track-surface-default', alias: 'colour', default: 'border-default' },
    { token: 'toggle-thumb-surface-default', alias: 'colour', default: 'surface-raised' },
  ],
  button: [
    { token: 'button-primary-surface-default', alias: 'colour', default: 'primary' },
    { token: 'button-primary-on-surface-default', alias: 'colour', default: 'on-primary' },
    { token: 'button-secondary-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'button-secondary-on-surface-default', alias: 'colour', default: 'on-surface-default' },
    { token: 'button-secondary-border-default', alias: 'colour', default: 'border-default' },
    { token: 'button-ghost-on-surface-default', alias: 'colour', default: 'on-surface-default' },
  ],
  badge: [
    { token: 'badge-neutral-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'badge-neutral-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  accordion: [
    { token: 'accordion-trigger-surface-default', alias: 'colour', default: 'transparent' },
    { token: 'accordion-trigger-on-surface-default', alias: 'colour', default: 'on-surface-default' },
  ],
  separator: [
    { token: 'separator-color', alias: 'colour', default: 'border-default' },
  ],
  skeleton: [
    { token: 'skeleton-surface', alias: 'colour', default: 'surface-muted' },
  ],
  focus: [
    { token: 'focus-ring-color', alias: 'colour', default: 'border-focus' },
  ],
  progress: [
    { token: 'progress-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'progress-bar-surface', alias: 'colour', default: 'primary' },
  ],
  dialog: [
    { token: 'dialog-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'dialog-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  drawer: [
    { token: 'drawer-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'drawer-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  dropdown: [
    { token: 'dropdown-content-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'dropdown-item-on-surface-default', alias: 'colour', default: 'on-surface-default' },
  ],
  popover: [
    { token: 'popover-surface', alias: 'colour', default: 'surface-raised' },
    { token: 'popover-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  tooltip: [
    { token: 'tooltip-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'tooltip-on-surface', alias: 'colour', default: 'surface-default' },
  ],
  breadcrumb: [
    { token: 'breadcrumb-color-default', alias: 'colour', default: 'on-surface-muted' },
    { token: 'breadcrumb-color-current', alias: 'colour', default: 'on-surface-default' },
  ],
  link: [
    { token: 'link-color-default', alias: 'colour', default: 'primary' },
  ],
  tabs: [
    { token: 'tabs-tab-surface-default', alias: 'colour', default: 'transparent' },
    { token: 'tabs-tab-on-surface-default', alias: 'colour', default: 'on-surface-muted' },
  ],
  table: [
    { token: 'table-header-surface', alias: 'colour', default: 'surface-muted' },
    { token: 'table-header-on-surface', alias: 'colour', default: 'on-surface-default' },
    { token: 'table-cell-on-surface', alias: 'colour', default: 'on-surface-default' },
  ],
  pagination: [
    { token: 'pagination-surface-default', alias: 'colour', default: 'surface-default' },
    { token: 'pagination-on-surface-default', alias: 'colour', default: 'on-surface-default' },
  ],
  slider: [
    { token: 'slider-track-surface-default', alias: 'colour', default: 'surface-muted' },
    { token: 'slider-fill-surface-default', alias: 'colour', default: 'primary' },
    { token: 'slider-thumb-surface-default', alias: 'colour', default: 'surface-raised' },
  ],
};

/**
 * Reconstruct the flat system-colour-token → alias-colour-token map
 * for the CSS generator's default emission loop.
 */
export function buildColourTokenMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const defs of Object.values(SYSTEM_COLOUR_TOKENS)) {
    for (const def of defs) {
      map[`--${def.token}`] = `--color-${def.default}`;
    }
  }
  return map;
}
