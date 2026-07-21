# Atlas project-centric patch

This overlay converts Atlas from independent category lists into a project-centred workspace.

## Apply

1. Commit or stash the existing repository.
2. Copy this overlay into the repository root, preserving paths.
3. Run `npm install`, `npm run typecheck`, and `npm run build`.
4. Start with `npm run dev` and create a project.

No secrets are included. Existing collections are not deleted. Existing unassigned records remain available to a later migration.
