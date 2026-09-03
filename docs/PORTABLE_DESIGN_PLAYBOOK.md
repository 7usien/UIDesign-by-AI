# 📦 Portable Elite Landing Page System: Multi-Project Guide
> **How to use this Design Engineering System in ANY current or future project (Vite, Next.js, Remix, Astro, Nuxt, etc.)**

---

## 🚀 Quick Setup in Any New Project (Takes < 2 Minutes)

To enable this entire $100k+ agency design capability in a new repository:

### Step 1: Copy the `.agents` Directory
Copy the `.agents` folder from this project into the root of your new project:
```bash
# In your new project root:
cp -r /path/to/current-project/.agents .
```
This transfers both:
1. `.agents/skills/elite-landing-page-agent/SKILL.md` (The interactive co-design orchestrator)
2. `.agents/skills/ui-design-vault/SKILL.md` (The 9-library component and effect reference)

### Step 2: Copy the Knowledge Base
Copy the `docs/` folder or keep `docs/UI_DESIGN_KNOWLEDGE_BASE.md` inside your project for permanent reference.

### Step 3: Install Core Utility Packages (Optional / Recommended)
For maximum visual smoothness and interaction:
```bash
npm install lucide-react clsx tailwind-merge lenis gsap
```

---

## 🛠️ How to Prompt the Agent in Any Project

Whenever you open a new project with these skills, you can simply start by asking:

> *"I want to build an elite landing page using the elite-landing-page-agent skill."*

The AI will immediately launch the **5-Phase Discovery Routine**:
1. Ask your language preference (Arabic RTL / English LTR).
2. Ask your business domain and primary CTA goal.
3. Present tailored visual archetypes (Obsidian Plasma, Warm Editorial, Neo-Brutalist, Light Luxury).
4. Walk through each section (Hero, Bento, Interactive Demo, Testimonials, Pricing, Footer) and suggest the best components from Magic UI, Aceternity, HeroUI, etc.
5. Generate the complete, responsive, animated codebase.

---

## 🎨 Global Design Tokens Template (`index.css`)

Drop this into your project's `index.css` to instantly have the foundational glassmorphic & plasma styling:

```css
@import "tailwindcss";

@layer base {
  :root {
    --font-serif: 'Instrument Serif', Georgia, serif;
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Base Surfaces */
    --bg-primary: #09090b;
    --bg-surface: rgba(18, 18, 23, 0.65);
    
    /* Plasma Gradient Mask Border */
    --plasma-border: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(99, 102, 241, 0.35) 25%,
      rgba(168, 85, 247, 0.22) 50%,
      rgba(56, 189, 248, 0.3) 75%,
      rgba(255, 255, 255, 0.08) 100%
    );

    /* Glow Accents */
    --accent-emerald-glow: rgba(52, 211, 153, 0.45);
    --accent-cyan-glow: rgba(56, 189, 248, 0.4);
    --accent-indigo-core: #6366f1;
  }

  body {
    font-family: var(--font-sans);
    background-color: var(--bg-primary);
    color: #f4f4f5;
    overflow-x: hidden;
  }
}

/* Reusable Glassmorphism */
.liquid-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), 0 20px 40px -15px rgba(0, 0, 0, 0.6);
}

/* Plasma Gradient Border Mask */
.plasma-card {
  position: relative;
  background: rgba(14, 14, 19, 0.65);
  backdrop-filter: blur(24px) saturate(170%);
  border-radius: 1.25rem;
}

.plasma-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: var(--plasma-border);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
  opacity: 0.7;
}
```
