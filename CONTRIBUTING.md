# Contributing Guidelines

Thank you for considering contributing to our project! To maintain a consistent codebase, please follow these guidelines.

## Commit Messages

We use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for our commit messages. This helps us automate the release process and keep a clean commit history. Please use the following structure:

```
<type>: <subject>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring without adding features or fixing bugs
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

### Example

```
feat: add login functionality
```

```
fix: fix login redirect
```

```
docs: update login documentation
```

## Code Style

We use Prettier and ESLint to maintain code quality and consistency. Please ensure your code adheres to these tools before submitting a pull request.

### Prettier

Prettier is used to format our code. You can run it with:

```sh
npx prettier --write .
```
