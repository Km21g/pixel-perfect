<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the app frontend-only and place external REST access behind typed resource modules with a mock-mode switch, because a separate team owns the backend contract.
- Preserve the repository's TanStack Start and TanStack Router architecture rather than replacing its framework, because the existing template and generated routes depend on it.
- Keep demo identity and mock session state in memory; never persist user data or credentials in browser storage, because production authentication is owned by the external API.
