# Atlas empty modules complete patch

Adds real pages for the empty project folders shown in the supplied tree: activity, backlog, board, budgets, costs, finances, milestones, risks, roadmap, settings and table. It also adds explicit project APIs for milestones, risks, costs, budgets and work items.

This overlay assumes the existing Atlas helpers already present in the project-centric codebase: `requireUserId`, `getCollection`, `requireProject`, `routeError`, `nowIso`, and `serialize`.
