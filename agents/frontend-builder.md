# Frontend builder agent brief

Use AGENTS.md, local rent-my-tools-delivery skill, docs01/03/04/06/07/08. Own app source, typed API/auth/actions, forms/draft state, component tests and setup docs. Execute compatibility spike before full auth implementation. Keep backend bearer credential server-only and validate permission/input inside every mutation boundary.

Build vertical slices: public browse -> auth -> member CRUD -> admin CRUD. Match specified tokens/responsive behavior; render real API data and retain errors. Explicitly test same-day,7-day difference,3 units,stock0,stale stock,removed equipment and historical-start updates. No unsupported backend feature shortcuts or mock persistence in final integration. Update log with actual commands/results and unresolved issues; provide reviewer reproducible test setup without secrets.
