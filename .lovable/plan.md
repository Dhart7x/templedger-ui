# Global polish rollout plan

The reference (Client Live Snapshot) is approved. Rolling all 10 parts across 12 tabs touches ~9,000 lines. To preserve behavior and keep each change reviewable, I'll proceed in 4 batches over the next turns. After each batch you can spot-check and I'll adjust before moving on.

## Batch 1 — Critical issues you flagged (this turn)

1. **Client Payroll + Agency Payroll** — gate chips inline on a single row (flex, nowrap), worker row sub-line, numerals rule, header label shortening, row padding 16px.
2. **Client Schedule + Agency Schedule** — Part 8 grid density: left worker column max 150px, shift chips smaller, cell padding tighter, row height ~44px, no horizontal scroll.
3. **Client Temp-Perm** — worker cell collapsed to 2 lines max (name + meta), numerals rule, row padding 16px.

## Batch 2 — Workers + Bookings (next turn)

4. Client Workers + Agency Workers — worker row pattern, column widths, header shortening, numerals.
5. Client Bookings + Agency Bookings (AgencyNewOrder) — row pattern, filter prefixes, numerals, redundant sentence pruning.

## Batch 3 — Billing + Spend + Agencies (turn 3)

6. Client Billing — accordion row density, numerals, header shortening.
7. Client Spend Analysis — KPI numerals, chart label cleanup, filter prefixes.
8. Client Agencies — agency row pattern, numerals.

## Batch 4 — Permissions, Insights, Notifications (turn 4)

9. Client Permissions — typography pass only (mostly already done).
10. Client Insights — KPI numerals, row density.
11. Agency Notifications — typography pass only (mostly already done).
12. Final sweep: re-check Client Live Snapshot against any pattern drift introduced.

## Non-goals (unchanged)

- No state, handler, routing, filtering, sorting, or data-flow changes.
- No gradients, glow, or drop shadows.
- All existing modals, dropdowns, click behaviors preserved.

## Technical notes

- Gate chips fix: wrap chip row in `display: flex; flexWrap: 'nowrap'; gap: 6px; overflow: hidden` with chip `whiteSpace: 'nowrap'; fontSize: 10px; padding: '2px 6px'`. Shrink chip labels (e.g. "Approved" → "✓", "Pending" → "•").
- Schedule grid: switch worker column from `200px`/`220px` to `minmax(120px, 150px)`, shift chip from `padding: 8px` to `padding: 4px 6px`, font-size 10px, row min-height 44px, container `overflow: hidden`.
- Temp-Perm worker cell: stack `<div>{name}</div><div className="text-xs muted">{role} · {dept}</div>` only — drop tenure/site/start-date sub-lines into a single bullet-separated meta line.

Approve to start Batch 1, or tell me to reorder.
