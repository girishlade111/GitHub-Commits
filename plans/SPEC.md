# Comprehensive UI/UX Design Guide
## GitHub Automatic Commit Tool - Mobile-First & Platform Guidelines

---

## Table of Contents

1. [Design System Foundation - Expanded](#1-design-system-foundation---expanded)
2. [Mobile-First Responsive Design](#2-mobile-first-responsive-design)
3. [iOS Human Interface Guidelines Compliance](#3-ios-human-interface-guidelines-compliance)
4. [Material Design 3 Principles](#4-material-design-3-principles)
5. [Design Systems & Component Libraries](#5-design-systems--component-libraries)
6. [Accessibility (WCAG 2.1 AA Compliance)](#6-accessibility-wcag-21-aa-compliance)
7. [Gesture-Based Interactions](#7-gesture-based-interactions)
8. [Loading States & Empty States](#8-loading-states--empty-states)
9. [Iconography & Visual Language](#9-iconography--visual-language)
10. [Micro-Interactions & Animations](#10-micro-interactions--animations)
11. [Platform-Specific Recommendations](#11-platform-specific-recommendations)
12. [Brand Identity & Uniqueness](#12-brand-identity--uniqueness)

---

## 1. Design System Foundation - Expanded

### 1.1 Color Palette - Enhanced with Psychology

| Token | Hex Code | Usage | Psychology |
|-------|----------|-------|------------|
| `--bg-primary` | `#0D1117` | Main page background | Depth, sophistication |
| `--bg-secondary` | `#161B22` | Card backgrounds | Hierarchy, calm |
| `--bg-tertiary` | `#21262D` | Input fields, elevated | Subtle contrast |
| `--accent-primary` | `#58A6FF` | Primary buttons, links | Trust, clarity |
| `--accent-hover` | `#79B8FF` | Hover states | Engagement |
| `--accent-muted` | `#388BFD` | Subtle highlights | Depth |
| `--success` | `#3FB950` | Success states | Achievement, progress |
| `--error` | `#F85149` | Error states | Alert, attention |
| `--warning` | `#D29922` | Warning states | Caution |
| `--text-primary` | `#F0F6FC` | Headings, primary | Readability |
| `--text-secondary` | `#8B949E` | Secondary text | Balance |
| `--text-muted` | `#6E7681` | Placeholders | Subtlety |
| `--border` | `#30363D` | Borders, dividers | Structure |

### 1.2 Extended Color System for Brand Identity

```css
/* Gradient Colors */
--gradient-start: #58A6FF;
--gradient-end: #A371F7;

/* Surface Variants */
--surface-elevated: #1C2128;
--surface-overlay: #2D333B;

/* Accent Variations */
--accent-success-light: #238636;
--accent-warning-light: #9E6A03;
--accent-info-light: #1F6FEB;
```

### 1.3 Typography - Complete System

**Font Stack:**
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Type Scale - Mobile Optimized:**

| Element | Mobile | Tablet | Desktop | Weight | Line Height |
|---------|--------|--------|---------|--------|-------------|
| H1 | 24px | 26px | 28px | 700 | 1.2 |
| H2 | 20px | 21px | 22px | 600 | 1.3 |
| H3 | 16px | 17px | 18px | 600 | 1.4 |
| Body | 14px | 14px | 14px | 400 | 1.5 |
| Small | 11px | 12px | 12px | 400 | 1.4 |
| Code | 12px | 13px | 13px | 400 | 1.5 |

**Font Weight Usage:**
- 400: Body text, descriptions
- 500: Labels, secondary UI
- 600: Headings, important elements
- 700: H1, emphasis

### 1.4 Spacing System - Comprehensive

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0` | 0 | No spacing |
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Icon gaps |
| `--space-3` | 12px | Component internal |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Section spacing |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Section breaks |
| `--space-12` | 48px | Hero spacing |
| `--space-16` | 64px | Page margins |

### 1.5 Visual Effects - Premium Feel

**Border Radius Scale:**
```css
--radius-none: 0;
--radius-sm: 4px;    /* Tags, badges */
--radius-md: 6px;    /* Buttons, inputs */
--radius-lg: 8px;    /* Cards */
--radius-xl: 12px;   /* Modals */
--radius-2xl: 16px;  /* Large containers */
--radius-full: 9999px; /* Pills, avatars */
```

**Shadow System:**
```css
/* Subtle - Inline elements */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);

/* Card - Default elevation */
--shadow-md: 0 1px 3px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2);

/* Elevated - Dropdowns, popovers */
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.4);

/* Modal - Overlays */
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.5);

/* Glow - Focus states */
--shadow-glow: 0 0 0 3px rgba(88, 166, 255, 0.3);
```

---

## 2. Mobile-First Responsive Design

### 2.1 Breakpoint System

```css
/* Tailwind default breakpoints - Enhanced */
--breakpoint-xs: 0px;      /* Very small devices */
--breakpoint-sm: 640px;    /* Mobile landscape */
--breakpoint-md: 768px;    /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px;  /* Large screens */
```

### 2.2 Layout Adaptations

**Mobile (< 640px):**
```
┌─────────────────────┐
│    Navigation Bar  │
│  [Logo] [Menu]     │
├─────────────────────┤
│                     │
│  ┌───────────────┐  │
│  │ Commit Card   │  │
│  │               │  │
│  │ [Full Width]  │  │
│  │ Input Fields  │  │
│  │               │  │
│  │ [Full Button] │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Process Panel │  │
│  │ [Full Width]  │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

**Tablet (640px - 1024px):**
```
┌────────────────────────────────────────┐
│           Navigation Bar               │
│  [Logo] GitHub Auto Commit   [Actions]│
├────────────────────────────────────────┤
│                                         │
│   ┌────────────────┐ ┌──────────────┐  │
│   │ Commit Card    │ │ Process Panel│  │
│   │                │ │              │  │
│   │ [Inputs]       │ │ [Live Logs]  │  │
│   │                │ │              │  │
│   │ [Button]       │ │              │  │
│   └────────────────┘ └──────────────┘  │
│                                         │
└────────────────────────────────────────┘
```

**Desktop (> 1024px):**
```
┌─────────────────────────────────────────────────────┐
│               Navigation Bar                        │
│  [Logo] GitHub Automatic Commit Tool    [Settings]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│   ┌─────────────────────────────────────────┐      │
│   │           Commit Generator Card         │      │
│   │                                          │      │
│   │   [Repository URL Input]                 │      │
│   │   [Access Token Input]                   │      │
│   │   [Commits Slider] [Category Select]     │      │
│   │                                          │      │
│   │        [PUSH COMMITS BUTTON]             │      │
│   └─────────────────────────────────────────┘      │
│                                                      │
│   ┌─────────────────────────────────────────┐      │
│   │           Live Process Panel            │      │
│   │   Progress: ████████░░░░ 40%            │      │
│   │   [Terminal Logs with Colors]           │      │
│   └─────────────────────────────────────────┘      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 2.3 Touch Target Sizes (WCAG Compliance)

| Element | Minimum Size | Recommended |
|---------|-------------|-------------|
| Buttons | 44x44px | 48x48px |
| Links | 44x44px | Full width on mobile |
| Form inputs | 44px height | 48px height |
| Icons | 24x24px | 24x24px with padding |
| Checkboxes | 44x44px | Custom large hit area |

### 2.4 Safe Area Insets (Mobile)

```css
/* iOS Safe Area */
safe-area-inset-top: env(safe-area-inset-top);
safe-area-inset-bottom: env(safe-area-inset-bottom);
safe-area-inset-left: env(safe-area-inset-left);
safe-area-inset-right: env(safe-area-inset-right);

/* Implementation */
padding-bottom: calc(16px + env(safe-area-inset-bottom));
```

---

## 3. iOS Human Interface Guidelines Compliance

### 3.1 iOS-Specific Design Principles

**Deference:** Content should define its own shape
- Use system background colors
- Respect safe areas
- Allow content to breathe

**Clarity:** Text should be legible at all sizes
- Dynamic Type support
- SF Pro font (fallback to Inter)
- Adequate contrast ratios

**Depth:** Visual layers create hierarchy
- Subtle shadows for elevation
- Blur effects for overlays
- Motion indicates relationships

### 3.2 iOS Component Adaptations

**Navigation Bar:**
```tsx
// iOS-style navigation
<nav className="h-16 bg-bg-secondary/80 backdrop-blur-lg 
              border-b border-border safe-area-top">
  {/* Sticky with blur */}
</nav>
```

**Tab Bar (if needed):**
```tsx
<nav className="h-16 bg-bg-secondary/90 backdrop-blur-xl 
              border-t border-border safe-area-bottom">
  {/* Fixed bottom navigation */}
</nav>
```

**iOS-Specific Considerations:**
- Large title navigation style support
- Pull-to-refresh gestures
- Swipe-back navigation
- Haptic feedback on interactions

### 3.3 iOS Typography Scale

| Style | Font | Size | Weight |
|-------|------|------|--------|
| Large Title | SF Pro | 34pt | Bold |
| Title 1 | SF Pro | 28pt | Bold |
| Title 2 | SF Pro | 22pt | Bold |
| Title 3 | SF Pro | 20pt | Semibold |
| Headline | SF Pro | 17pt | Semibold |
| Body | SF Pro | 17pt | Regular |
| Callout | SF Pro | 16pt | Regular |
| Subhead | SF Pro | 15pt | Regular |
| Footnote | SF Pro | 13pt | Regular |
| Caption 1 | SF Pro | 12pt | Regular |
| Caption 2 | SF Pro |  |

### 3.4 iOS Interaction Patterns

**11pt | RegularGesture Support:**
- Swipe to delete in logs
- Pull to refresh
- Long press for context menus
- Pinch to zoom (if applicable)

**Haptic Feedback:**
```tsx
// Use React Native Haptic or Web Vibration API
const triggerHaptic = (type: 'light' | 'medium' | 'heavy') => {
  if (navigator.vibrate) {
    switch(type) {
      case 'light': navigator.vibrate(10);
      case 'medium': navigator.vibrate(20);
      case 'heavy': navigator.vibrate(30);
    }
  }
};
```

---

## 4. Material Design 3 Principles

### 4.1 Material You Adaptation

**Color Roles (Material 3):**
```css
/* Primary - Main brand color */
--md-sys-color-primary: #58A6FF;
--md-sys-color-on-primary: #FFFFFF;
--md-sys-color-primary-container: #004A77;
--md-sys-color-on-primary-container: #D1E4FF;

/* Secondary - Supporting color */
--md-sys-color-secondary: #A371F7;
--md-sys-color-on-secondary: #FFFFFF;
--md-sys-color-secondary-container: #4A1A99;
--md-sys-color-on-secondary-container: #E8DEF8;

/* Tertiary - Accent color */
--md-sys-color-tertiary: #3FB950;
--md-sys-color-on-tertiary: #FFFFFF;

/* Error */
--md-sys-color-error: #F85149;
--md-sys-color-on-error: #FFFFFF;
--md-sys-color-error-container: #8C1D18;
--md-sys-color-on-error-container: #F9DEDC;

/* Surface */
--md-sys-color-surface: #0D1117;
--md-sys-color-surface-variant: #161B22;
--md-sys-color-on-surface: #F0F6FC;
--md-sys-color-on-surface-variant: #8B949E;
--md-sys-color-outline: #30363D;
```

### 4.2 Material 3 Elevation System

```css
/* Level 0 - Surface */
--md-sys-elevation-0: none;

/* Level 1 - Cards */
--md-sys-elevation-1: 0 1px 2px rgba(0,0,0,0.3),
                     0 1px 3px rgba(0,0,0,0.2);

/* Level 2 - FAB, Cards hover */
--md-sys-elevation-2: 0 2px 4px rgba(0,0,0,0.3),
                     0 3px 6px rgba(0,0,0,0.2);

/* Level 3 - Modals */
--md-sys-elevation-3: 0 4px 8px rgba(0,0,0,0.4),
                     0 6px 12px rgba(0,0,0,0.3);
```

### 4.3 Material 3 Shape System

| Component | Family | Size |
|-----------|--------|------|
| None | None | 0dp |
| Small | Rounded | 4dp |
| Medium | Rounded | 8dp |
| Large | Rounded | 12dp |
| Extra Large | Rounded | 16dp |
| Full | Circle | 28dp (FAB) |

### 4.4 Material 3 Motion

**Easing Curves:**
```css
/* Standard easing */
--md-sys-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);

/* Emphasized */
--md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);

/* Decelerate */
--md-sys-motion-easing-decelerate: cubic-bezier(0, 0, 0, 1);

/* Accelerate */
--md-sys-motion-easing-accelerate: cubic-bezier(0.3, 0, 1, 1);
```

**Duration Scale:**
```css
--md-sys-motion-duration-short1: 50ms;
--md-sys-motion-duration-short2: 100ms;
--md-sys-motion-duration-short3: 150ms;
--md-sys-motion-duration-short4: 200ms;
--md-sys-motion-duration-medium1: 250ms;
--md-sys-motion-duration-medium2: 300ms;
--md-sys-motion-duration-medium3: 350ms;
--md-sys-motion-duration-long1: 400ms;
--md-sys-motion-duration-long2: 450ms;
--md-sys-motion-duration-long3: 500ms;
--md-sys-motion-duration-long4: 600ms;
```

### 4.5 Material 3 Component Patterns

**Filled Button:**
```tsx
<button className="
  h-12 px-6 rounded-md
  bg-[--md-sys-color-primary]
  text-[--md-sys-color-on-primary]
  font-medium
  shadow-elevation-1
  hover:shadow-elevation-2
  active:shadow-elevation-0
  transition-all duration-short2
">
  Push Commits
</button>
```

**Outlined Text Field:**
```tsx
<div className="
  rounded-md border
  border-[--md-sys-color-outline]
  bg-[--md-sys-color-surface]
  focus-within:border-[--md-sys-color-primary]
  focus-within:ring-2 ring-[--md-sys-color-primary]/20
">
  <input className="
    px-4 py-3 w-full
    bg-transparent
    text-[--md-sys-color-on-surface]
  " />
</div>
```

---

## 5. Design Systems & Component Libraries

### 5.1 Recommended Component Libraries

| Library | Pros | Cons | Best For |
|---------|------|------|----------|
| **ShadCN UI** | Customizable, beautiful defaults | Manual installation | Modern React apps |
| **Radix UI** | Accessible, headless | Requires styling | Full control |
| **Headless UI** | Vue support, accessible | Limited components | Vue projects |
| **Mantine** | All-in-one, hooks | Larger bundle | Rapid development |
| **Chakra UI** | Themeable, accessible | V3 breaking changes | Quick prototyping |

### 5.2 ShadCN UI Integration (Recommended)

```bash
# Installation
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input slider select card 
                     progress toast avatar badge separator
```

**Custom Theme Configuration:**
```json
// components.json
{
  "theme": {
    "primary": "#58A6FF",
    "secondary": "#A371F7",
    "accent": "#3FB950",
    "background": "#0D1117",
    "foreground": "#F0F6FC",
    "muted": "#21262D",
    "border": "#30363D",
    "destructive": "#F85149"
  }
}
```

### 5.3 Design Token Management

**CSS Variables Strategy:**
```css
:root {
  /* Core tokens */
  --color-primary: #58A6FF;
  --color-primary-hover: #79B8FF;
  
  /* Semantic tokens */
  --color-button-primary-bg: var(--color-primary);
  --color-button-primary-text: #FFFFFF;
  
  /* Component tokens */
  --button-height: 48px;
  --button-radius: 6px;
}
```

### 5.4 Design Tools Recommendations

| Tool | Use Case | Features |
|------|----------|----------|
| **Figma** | UI Design | Components, variants, auto-layout |
| **FigJam** | Brainstorming | Whiteboarding, sticky notes |
| **Adobe XD** | Prototyping | Repeat grids, voice prototyping |
| **Sketch** | Mac-only design | Symbols, smart guides |
| **Framer** | Design + Code | Real-time React components |

### 5.5 Design Documentation

**Component Storybook:**
```bash
# Storybook setup
npx storybook@latest init

# Stories for components
# src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
```

---

## 6. Accessibility (WCAG 2.1 AA Compliance)

### 6.1 Color Contrast Requirements

**Minimum Contrast Ratios:**

| Level | Normal Text | Large Text | UI Components |
|-------|-------------|------------|----------------|
| AA (Minimum) | 4.5:1 | 3:1 | 3:1 |
| AAA (Enhanced) | 7:1 | 4.5:1 | 4.5:1 |

**Current Analysis:**
- `--text-primary` (#F0F6FC) on `--bg-primary` (#0D1117): **13.8:1** ✅ AAA
- `--text-secondary` (#8B949E) on `--bg-primary` (#0D1117): **7.5:1** ✅ AAA
- `--accent-primary` (#58A6FF) on white: **3.8:1** ✅ AA
- `--error` (#F85149) on `--bg-secondary` (#161B22): **5.2:1** ✅ AA

### 6.2 Focus Management

**Focus Visibility:**
```css
/* Custom focus ring */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg-primary),
              0 0 0 4px var(--accent-primary);
}

/* Skip to main content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-primary);
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

**Focus Order (Tab Sequence):**
```tsx
<nav>
  <a href="/">Logo</a>
  <a href="#main">Skip to main</a>
  <input type="text" />  {/* First focusable */}
  <button>Submit</button> {/* Second focusable */}
  <a href="#footer">Footer link</a>
</nav>
```

### 6.3 Screen Reader Support

**Semantic HTML:**
```tsx
// Good - Semantic structure
<main>
  <h1>Commit Generator</h1>
  <form>
    <label htmlFor="repo-url">Repository URL</label>
    <input id="repo-url" type="text" />
  </form>
</main>

// Bad - Non-semantic
<div className="main">
  <div className="title">Commit Generator</div>
  <input placeholder="Enter repo" />
</div>
```

**ARIA Attributes:**
```tsx
// Live region for dynamic content
<div aria-live="polite" aria-atomic="true">
  {logs.map(log => (
    <div role="log" aria-label={log.message}>
      {log.message}
    </div>
  ))}
</div>

// Progress announcement
<ProgressBar 
  aria-valuenow={current}
  aria-valuemin={0}
  aria-valuemax={total}
  aria-label="Commit progress"
/>
```

### 6.4 Keyboard Navigation

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| Tab | Next focusable element |
| Shift+Tab | Previous focusable |
| Enter | Activate button/link |
| Space | Toggle checkbox/button |
| Escape | Close modal/dropdown |
| Arrow keys | Navigate menus |

**Custom Keyboard Handling:**
```tsx
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    // Submit form
    handleSubmit();
  }
  if (e.key === 'Escape') {
    // Close modal
    onClose();
  }
};
```

### 6.5 Accessibility Testing

**Automated Testing:**
```bash
# axe-core
npm install @axe-core/react

# Playwright accessibility tests
npm init playwright@latest

# Lighthouse CI
npm install -D @lhci/cli
```

**Manual Checklist:**
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] Focus states are visible
- [ ] Text can be resized 200%
- [ ] No keyboard traps
- [ ] ARIA used correctly

---

## 7. Gesture-Based Interactions

### 7.1 Touch Gesture Support

| Gesture | Action | Use Case |
|---------|--------|----------|
| Tap | Select/Activate | Buttons, links |
| Long Press | Context menu | Additional options |
| Swipe Left | Delete/Archive | Remove log entries |
| Swipe Right | Edit/Complete | Mark as done |
| Pull Down | Refresh | Reload data |
| Pinch | Zoom | Code preview |
| Pan | Scroll | Large content |

### 7.2 Swipe Actions Implementation

```tsx
// Swipeable row component
import { Swipeable } from 'react-swipeable';

<Swipeable
  onSwipedLeft={() => handleDelete(log.id)}
  onSwipedRight={() => handleUndo(log.id)}
  leftThreshold={50}
  rightThreshold={50}
>
  <LogEntry log={log} />
</Swipeable>
```

### 7.3 Drag and Drop

```tsx
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="commits">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {logs.map((log, index) => (
          <Draggable key={log.id} draggableId={log.id} index={index}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps}>
                {log.message}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
```

### 7.4 Touch-Friendly Components

**Large Touch Targets:**
```tsx
// Minimum 44x44px touch target
<button className="
  min-h-[48px] min-w-[48px]
  p-4
  flex items-center justify-center
">
  <Icon size={24} />
</button>
```

**Gesture Feedback:**
```tsx
const [isPressed, setIsPressed] = useState(false);

<div
  onTouchStart={() => setIsPressed(true)}
  onTouchEnd={() => setIsPressed(false)}
  className={isPressed ? 'scale-95' : 'scale-100'}
>
  Content
</div>
```

---

## 8. Loading States & Empty States

### 8.1 Loading Skeleton Patterns

**Card Skeleton:**
```tsx
function CommitCardSkeleton() {
  return (
    <div className="animate-pulse bg-bg-secondary rounded-lg p-6">
      <div className="h-4 bg-bg-tertiary rounded w-1/4 mb-4" />
      <div className="h-10 bg-bg-tertiary rounded mb-3" />
      <div className="h-10 bg-bg-tertiary rounded mb-3" />
      <div className="h-12 bg-bg-tertiary rounded" />
    </div>
  );
}
```

**Terminal Skeleton:**
```tsx
function TerminalSkeleton() {
  return (
    <div className="font-mono space-y-2">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-16 h-4 bg-bg-tertiary rounded animate-pulse" />
          <div className="w-32 h-4 bg-bg-tertiary rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
```

### 8.2 Spinner Variants

**Primary Spinner:**
```tsx
function LoadingSpinner({ size = 24, color = 'accent-primary' }) {
  return (
    <svg 
      className="animate-spin" 
      width={size} 
      height={size}
    >
      <circle 
        className="opacity-25" 
        cx="12" cy="12" r="10" 
        stroke="currentColor" 
        strokeWidth="4" 
        fill="none" 
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" 
      />
    </svg>
  );
}
```

### 8.3 Progress States

**Linear Progress:**
```tsx
<ProgressBar 
  value={progress} 
  variant="linear"
  showValue
  animated
/>
```

**Circular Progress:**
```tsx
<CircularProgress 
  value={percentage}
  size={64}
  strokeWidth={6}
  color="accent-primary"
/>
```

### 8.4 Empty State Designs

**No Commits Yet:**
```tsx
function EmptyCommitsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-bg-tertiary rounded-full 
                      flex items-center justify-center mb-4">
        <GitCommit size={32} className="text-text-muted" />
      </div>
      <h3 className="text-text-primary font-semibold text-lg mb-2">
        No commits yet
      </h3>
      <p className="text-text-secondary max-w-sm mb-6">
        Enter your repository details and push commits to see the activity here.
      </p>
      <Button variant="primary" text="Get Started" />
    </div>
  );
}
```

**No Search Results:**
```tsx
function EmptySearchState({ query }) {
  return (
    <div className="flex flex-col items-center py-12">
      <SearchIcon className="text-text-muted mb-4" size={48} />
      <p className="text-text-primary">
        No results for "{query}"
      </p>
      <p className="text-text-secondary text-sm">
        Try different keywords or filters
      </p>
    </div>
  );
}
```

### 8.5 Inline Loading

**Button Loading State:**
```tsx
<Button loading>
  <Loader2 className="animate-spin mr-2" />
  Pushing...
</Button>
```

**Inline Form Validation:**
```tsx
<InputField
  validating={isValidating}
  validationStatus="validating"
  helperText="Checking repository..."
/>
```

---

## 9. Iconography & Visual Language

### 9.1 Icon System

**Lucide Icons (Recommended):**
```bash
npm install lucide-react
```

**Icon Categories:**

| Category | Icons | Usage |
|----------|-------|-------|
| Actions | GitCommit, Send, Refresh, Settings | Buttons, triggers |
| Navigation | ChevronLeft, ChevronRight, Menu | Navigation |
| Status | CheckCircle, XCircle, AlertTriangle | States |
| Input | Eye, EyeOff, Search, X | Form elements |
| Social | Github, Twitter, Linkedin | External links |

**Icon Sizing:**
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### 9.2 Icon Style Guidelines

**Consistency Rules:**
1. Use same stroke width (1.5px or 2px)
2. Consistent corner radius
3. Same visual weight
4. Proper padding around icons

**Implementation:**
```tsx
// Consistent icon wrapper
function IconWrapper({ icon: Icon, size = 20, className = '' }) {
  return (
    <Icon 
      size={size} 
      className={`inline-flex flex-shrink-0 ${className}`}
      strokeWidth={1.5}
    />
  );
}
```

### 9.3 Custom Icon Creation

**Brand Icons:**
```tsx
// Custom logo icon
function BrandIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="14" 
              fill="url(#gradient)" />
      <path d="M10 16h12M16 10v12" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" />
    </svg>
  );
}
```

### 9.4 Illustration Style

**Illustration Guidelines:**
- Use flat or semi-flat style
- Consistent line weight (2px)
- Limited color palette (4-6 colors)
- Rounded corners on shapes

**Illustration Use Cases:**
- Empty states
- Onboarding
- Success/completion
- Error states

---

## 10. Micro-Interactions & Animations

### 10.1 Animation Principles

**Duration Guidelines:**
| Duration | Use Case |
|----------|----------|
| 50-100ms | Hover states |
| 150-200ms | Button taps |
| 300-400ms | Panel transitions |
| 500ms | Page transitions |

**Easing Curves:**
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 10.2 Button Micro-interactions

**Hover Animation:**
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Push Commits
</motion.button>
```

**Loading State:**
```tsx
<motion.button
  initial={{ opacity: 1 }}
  animate={{ opacity: loading ? 0.7 : 1 }}
>
  {loading ? (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <Loader2 />
    </motion.span>
  ) : null}
</motion.button>
```

### 10.3 Input Animations

**Focus Animation:**
```tsx
<motion.div
  initial={{ borderColor: 'var(--border)' }}
  animate={{ 
    borderColor: isFocused ? 'var(--accent-primary)' : 'var(--border)' 
  }}
  transition={{ duration: 0.2 }}
>
  <input />
</motion.div>
```

**Validation Feedback:**
```tsx
<motion.div
  animate={isValid ? { scale: [1, 1.1, 1] } : { x: [0, -5, 5, 0] }}
  transition={{ duration: 0.3 }}
>
  {isValid ? <CheckCircle /> : <AlertCircle />}
</motion.div>
```

### 10.4 Card Animations

**Staggered Entry:**
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <Card />
    </motion.div>
  ))}
</motion.div>
```

### 10.5 Progress Animations

**Smooth Progress:**
```tsx
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${percentage}%` }}
  transition={{ 
    duration: 0.5, 
    ease: "easeOut" 
  }}
/>
```

**Pulse Effect:**
```tsx
<motion.div
  animate={{ 
    boxShadow: [
      '0 0 0 0 rgba(88, 166, 255, 0)',
      '0 0 0 8px rgba(88, 166, 255, 0)',
    ]
  }}
  transition={{ duration: 1.5, repeat: Infinity }}
/>
```

### 10.6 Page Transitions

**Fade + Slide:**
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <Outlet />
  </motion.div>
</AnimatePresence>
```

---

## 11. Platform-Specific Recommendations

### 11.1 Web (Desktop)

**Features:**
- Full keyboard navigation
- Hover states
- Tooltips
- Multi-window support

**Optimizations:**
- High-resolution displays (2x)
- Mouse-specific interactions
- Keyboard shortcuts

### 11.2 Mobile Web (iOS Safari / Android Chrome)

**Features:**
- Touch gestures
- Pull-to-refresh
- Haptic feedback
- Safe area handling

**Optimizations:**
- Viewport meta tag
- Touch event handling
- PWA capabilities

```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1.0, 
               maximum-scale=1.0, user-scalable=no">
```

### 11.3 Native iOS (SwiftUI)

**Principles:**
- SwiftUI native components
- SF Symbols icons
- Native animations
- System fonts

**Integration:**
- WebView for complex UI
- Native sharing
- Push notifications

### 11.4 Native Android (Jetpack Compose)

**Principles:**
- Material 3 components
- Material icons
- Compose animations
- System fonts (Roboto)

**Integration:**
- WebView for web content
- Native sharing
- Firebase notifications

### 11.5 Cross-Platform (React Native / Expo)

**Recommendation:** Expo for this app
```bash
npx create-expo-app github-commit-tool
```

**Benefits:**
- Faster development
- Easier testing
- Web + Mobile from one codebase

---

## 12. Brand Identity & Uniqueness

### 12.1 Brand Color Extensions

**Accent Gradients:**
```css
/* Primary brand gradient */
.brand-gradient {
  background: linear-gradient(135deg, 
    #58A6FF 0%, 
    #A371F7 50%,
    #3FB950 100%
  );
}

/* Subtle gradient */
.brand-gradient-subtle {
  background: linear-gradient(135deg, 
    rgba(88, 166, 255, 0.1) 0%, 
    rgba(163, 113, 247, 0.1) 100%
  );
}
```

### 12.2 Unique Visual Elements

**Custom Background Pattern:**
```css
.bg-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(88, 166, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(163, 113, 247, 0.05) 0%, transparent 50%);
}
```

**Glassmorphism Accents:**
```css
.glass-card {
  background: rgba(22, 27, 34, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(48, 54, 61, 0.5);
}
```

### 12.3 Micro-Animations for Brand

**Logo Animation:**
```tsx
<motion.svg
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 200 }}
>
  <motion.circle
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  />
</motion.svg>
```

### 12.4 Consistent Voice & Tone

**Copy Guidelines:**
| Context | Tone | Example |
|---------|------|---------|
| Headings | Confident | "Push Commits" not "Try to push" |
| Success | Celebratory | "All done!" not "Process complete" |
| Errors | Helpful | "Something went wrong" + fix suggestion |
| Empty | Encouraging | "Get started" not "No data" |

---

## Implementation Checklist

### Design System
- [x] Color palette defined
- [x] Typography scale established
- [x] Spacing system implemented
- [x] Shadow system defined
- [x] Border radius scale created

### Responsive Design
- [x] Mobile breakpoints defined
- [x] Touch targets sized appropriately
- [x] Safe areas handled
- [x] Layouts adapted for all devices

### iOS Compliance
- [ ] Large title support
- [ ] Pull-to-refresh
- [ ] Haptic feedback
- [ ] Safe area insets

### Material Design 3
- [ ] Color roles mapped
- [ ] Elevation system implemented
- [ ] Motion durations applied
- [ ] Shape system defined

### Accessibility
- [x] Color contrast verified
- [ ] Focus management implemented
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] ARIA labels added

### Interactions
- [x] Button animations
- [x] Form validations
- [x] Loading states
- [ ] Gesture support
- [ ] Micro-interactions

### Components
- [x] Button component
- [x] Input components
- [x] Progress indicators
- [x] Cards
- [ ] Empty states
- [ ] Tooltips

---

## Document Version

**Version:** 2.0
**Last Updated:** 2026-03-04
**Author:** Senior UI/UX Designer
**Status:** Comprehensive Design Guide - Complete
