# Roam.Fish Design System - Naturalist Theme

## Overview

The Roam.Fish design system has been updated to embrace a modern, sleek, naturalist aesthetic that moves away from neo-brutalism toward organic shapes, natural colors, and subtle elegance.

## Design Principles

- **Natural & Organic**: Inspired by nature with earth tones and flowing forms
- **Subtle Elegance**: Clean, minimal design with gentle shadows and rounded corners
- **Accessibility**: High contrast ratios and clear visual hierarchy
- **Modern**: Contemporary typography and smooth animations
- **Consistent**: Unified visual language across all components

## Color Palette

### Primary Colors
- **Emerald Green**: `emerald-600` to `emerald-500` - Primary actions, nature theme
- **Forest Green**: `#065f46` to `#047857` - Headers and accent elements
- **Earth Amber**: `amber-700` to `orange-600` - Secondary actions

### Neutral Colors
- **Slate**: `slate-50` to `slate-900` - Text, borders, and backgrounds
- **White**: `#ffffff` - Cards and clean backgrounds
- **Background**: Light gradient from `#f8fafc` to `#f1f5f9`

### Semantic Colors
- **Success**: `emerald-600`
- **Warning**: `amber-500`
- **Error**: `red-600`
- **Info**: `blue-600`

## Typography

### Font Stack
- Primary: `Inter` with font feature settings for improved readability
- Fallback: `system-ui`, `-apple-system`, `sans-serif`

### Typography Classes

#### Headers
```css
.nature-header
/* Large gradient headers with emerald gradient text */
/* Usage: Main page titles, hero sections */

.nature-subheader  
/* Medium headers for section titles */
/* Usage: Component titles, section headers */
```

#### Body Text
```css
.nature-body
/* Standard body text with optimal line height */
/* Usage: Descriptions, content paragraphs */
```

## Component Styles

### Buttons

#### Primary Button
```css
.nature-button
```
- **Usage**: Primary actions, CTAs, form submissions
- **Features**: Emerald gradient, hover scale, subtle shadows
- **States**: Default, hover, active, disabled

#### Secondary Button
```css
.nature-button-secondary
```
- **Usage**: Secondary actions, navigation
- **Features**: White background, border, hover effects
- **States**: Default, hover, active, disabled

#### Earth Button
```css
.nature-button-earth
```
- **Usage**: Special actions, warnings, earth-themed elements
- **Features**: Amber to orange gradient
- **States**: Default, hover, active, disabled

### Cards

#### Standard Card
```css
.nature-card
```
- **Usage**: Content containers, form sections
- **Features**: White background, rounded corners, subtle hover
- **Animation**: Gentle hover lift

#### Elevated Card
```css
.nature-card-elevated
```
- **Usage**: Important content, CTAs, highlighted sections
- **Features**: Enhanced shadow, gradient background
- **Animation**: Pronounced hover lift

#### Glass Card
```css
.nature-card-glass
```
- **Usage**: Overlays, modal content, floating elements
- **Features**: Backdrop blur, transparency, subtle border
- **Animation**: Smooth transitions

### Form Elements

#### Input Fields
```css
.nature-input
```
- **Usage**: Text inputs, selects, textareas
- **Features**: Rounded corners, focus states, subtle shadows
- **States**: Default, hover, focus, error

### Utility Classes

#### Backgrounds
```css
.nature-gradient-bg    /* Light green gradient background */
.nature-glass          /* Glass effect with backdrop blur */
```

#### Borders
```css
.nature-border         /* Subtle border with opacity */
```

#### Shadows
```css
.nature-shadow         /* Standard nature-themed shadow */
.nature-shadow-lg      /* Large nature-themed shadow */
```

## Layout Guidelines

### Spacing
- Use Tailwind's spacing scale: `gap-3`, `gap-6`, `mb-4`, `p-6`, etc.
- Cards typically use `p-6` for standard, `p-8` for elevated
- Consistent `gap-6` for grid layouts, `gap-3` for smaller elements

### Borders
- Rounded corners: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons
- Border colors: `border-slate-200` for light borders, `border-slate-300` for emphasis

### Icons
- Wrap icons in colored backgrounds: `bg-emerald-100 rounded-lg p-2`
- Icon sizes: `w-4 h-4` (buttons), `w-5 h-5` (cards), `w-6 h-6` (headers)
- Icon colors: `text-emerald-700` for primary, `text-slate-600` for secondary

## Migration from Neo-Brutalism

### Deprecated Classes (Legacy Support)
The following neo-brutalist classes are mapped to new naturalist classes:

```css
.neo-button → .nature-button
.neo-button-secondary → .nature-button-secondary  
.neo-card → .nature-card
.neo-input → .nature-input
.neo-header → .nature-header
.neo-subheader → .nature-subheader
```

### Updated Patterns

#### Before (Neo-Brutalist)
```jsx
<div className="neo-card bg-stone-50">
  <h2 className="neo-subheader mb-4 text-slate-800">Title</h2>
  <button className="neo-button">Action</button>
</div>
```

#### After (Naturalist)
```jsx
<div className="nature-card">
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-emerald-100 rounded-lg">
      <Icon className="w-5 h-5 text-emerald-700" />
    </div>
    <h2 className="nature-subheader text-slate-800">Title</h2>
  </div>
  <button className="nature-button">Action</button>
</div>
```

## Animation Guidelines

### Hover Effects
- **Scale**: `hover:scale-105` for subtle growth
- **Translate**: `hover:-translate-y-1` for gentle lift
- **Shadows**: Enhanced shadows on hover for depth

### Transitions
- **Duration**: `duration-200` for quick interactions, `duration-300` for smooth effects
- **Easing**: `ease-out` for natural feeling animations

### Focus States
- **Ring**: `focus:ring-2 focus:ring-emerald-500` for accessibility
- **Outline**: Always remove default outline and replace with ring

## Accessibility

### Color Contrast
- Text on white backgrounds meets WCAG AA standards
- Interactive elements have clear focus indicators
- Error states use sufficient color contrast

### Interactive Elements
- Minimum touch target size: 44px
- Clear focus indicators for keyboard navigation
- Disabled states clearly communicated

## Best Practices

### Component Composition
1. Use icon containers for visual consistency
2. Maintain consistent spacing between elements
3. Group related actions with proper spacing
4. Use semantic HTML elements

### Responsive Design
- Mobile-first approach with responsive utilities
- Flexible grid layouts: `grid md:grid-cols-2 lg:grid-cols-3`
- Responsive text sizing: `text-lg md:text-xl`

### Performance
- Use CSS custom properties for consistent theming
- Leverage Tailwind's utility classes for optimal CSS size
- Implement proper loading states and transitions

## Component Examples

### Card with Icon Header
```jsx
<div className="nature-card">
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-emerald-100 rounded-lg">
      <Settings className="w-5 h-5 text-emerald-700" />
    </div>
    <h2 className="nature-subheader text-slate-800">Settings</h2>
  </div>
  <div className="space-y-3">
    <button className="nature-button w-full">Primary Action</button>
    <button className="nature-button-secondary w-full">Secondary Action</button>
  </div>
</div>
```

### Form Section
```jsx
<div className="nature-card">
  <h3 className="nature-subheader mb-4">Form Title</h3>
  <div className="space-y-4">
    <div>
      <label className="block text-base font-medium mb-2 text-slate-700">
        Field Label
      </label>
      <input className="nature-input" placeholder="Enter value..." />
    </div>
    <button className="nature-button">Submit</button>
  </div>
</div>
```

This design system ensures a cohesive, modern, and accessible user experience across the entire Roam.Fish application.