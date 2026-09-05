# Responsive and RTL Craft

## Design responsive states

- Recompose hierarchy for mobile; do not merely stack desktop columns.
- Keep the promise, primary proof, and CTA discoverable early.
- Preserve intentional tension and rhythm at smaller widths without overflow or tiny metadata.
- Use fluid type with bounded sizes, readable line length, stable media aspect ratios, and touch targets of at least 44 by 44 CSS pixels.
- Test at wide desktop, laptop, 390px mobile, and 360px mobile widths.

## Design Arabic independently

- Use an Arabic typeface with appropriate weight, proportions, and diacritics support.
- Set direction at the document or locale-region level and use logical CSS properties.
- Reconsider composition, alignment, reading order, directional icons, timelines, and asymmetric emphasis for RTL.
- Test mixed Arabic/Latin copy, email addresses, numbers, currency, punctuation, and line wrapping.
- Preserve meaning and hierarchy rather than mirroring every decorative element.
- Keep locale changes from discarding form or interaction state.

Arabic is not approved when it is merely translated text inside an English composition.
