# 🤝 Contributing to Portfolio

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on ideas, not individuals
- Report issues privately if they involve security

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork on GitHub (button in top-right)

# Clone your fork
git clone https://github.com/YOUR_USERNAME/Thiago-Selma-Portfolio.git
cd Thiago-Selma-Portfolio

# Add upstream remote
git remote add upstream https://github.com/thiagopeteanselma/Thiago-Selma-Portfolio.git
```

### 2. Create Feature Branch

```bash
# Sync with latest upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name

# Branch naming conventions:
# feature/short-description    # New feature
# fix/short-description        # Bug fix
# docs/short-description       # Documentation
# refactor/short-description   # Code refactor
```

### 3. Make Changes

See project structure in [README.md](README.md) for file organization.

**Guidelines:**
- Follow existing code style
- Add comments for complex logic
- Keep commits atomic (one feature per commit)
- Test changes locally

---

## 📝 Commit Guidelines

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style (formatting, no logic change)
- `refactor` - Code restructuring
- `perf` - Performance improvement
- `test` - Tests
- `chore` - Build, dependencies, tooling

**Examples:**

```bash
# Good
git commit -m "feat(i18n): add Spanish language support"
git commit -m "fix(theme): light theme button not working on mobile"
git commit -m "docs: update setup instructions"
git commit -m "refactor(modules): extract Sanitizer utility"
git commit -m "perf: optimize JSON loading with caching"

# Avoid
git commit -m "fix stuff"
git commit -m "update"
git commit -m "asdf"
```

### Commit Best Practices

- **One feature per commit** - Easier to review and revert if needed
- **Write clear messages** - Explain what AND why
- **Reference issues** - `Closes #123` in commit body
- **Small, focused commits** - Easier to understand history

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting PR, test:

- [ ] Language switching (PT → EN → ES)
- [ ] Theme toggling (Light ↔ Dark)
- [ ] localStorage persistence (refresh page)
- [ ] All sections render correctly
- [ ] Social links open in new tabs
- [ ] Email button opens modal
- [ ] No console errors (F12)
- [ ] Mobile responsiveness (DevTools mobile view)
- [ ] Keyboard navigation (Tab key)

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Testing for Accessibility

- Test with keyboard only (no mouse)
- Test with screen reader (NVDA or JAWS)
- Check color contrast (use WebAIM Contrast Checker)
- Verify focus indicators visible

---

## 📤 Submitting a Pull Request

### Before Submitting

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests locally**
   - Open `index.html` in browser
   - Perform manual testing checklist above
   - Check DevTools console for errors

3. **Clean up commits**
   ```bash
   git log --oneline  # Review commits
   ```

### Submit PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**
   - Base: `thiagopeteanselma/Thiago-Selma-Portfolio` (main)
   - Compare: `YOUR_USERNAME/Thiago-Selma-Portfolio` (your-feature-branch)
   - Click "Create pull request"

3. **PR Title & Description**

   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Related Issues
   Closes #123

   ## Testing
   - [ ] Tested on Chrome
   - [ ] Tested on Firefox
   - [ ] Tested on mobile
   - [ ] No console errors

   ## Changes
   - Added feature X
   - Fixed bug Y
   - Updated documentation Z
   ```

4. **Respond to Review Comments**
   - Be professional and open to feedback
   - Ask clarifying questions if needed
   - Make requested changes
   - Push additional commits to same branch

---

## 🐛 Reporting Bugs

### Create Issue

1. **Check existing issues** - Avoid duplicates
2. **Use issue template** (if available)
3. **Provide details:**
   - What you expected
   - What actually happened
   - Steps to reproduce
   - Browser/OS/version
   - Screenshots/videos

### Example Bug Report

```markdown
## Bug: Theme toggle not working on Safari

### Description
The light/dark theme toggle button doesn't switch themes on Safari 14.

### Expected Behavior
Clicking the theme button should switch between light and dark themes.

### Actual Behavior
Button click has no effect. Console shows no errors.

### Steps to Reproduce
1. Open portfolio in Safari 14
2. Click the theme toggle button (☀/☾)
3. Theme doesn't change

### Screenshots
[Attach screenshot showing issue]

### Environment
- Browser: Safari 14.1.2
- OS: macOS 11.5
- Device: MacBook Pro 2019
```

---

## 💡 Feature Requests

### Create Feature Request

1. **Title** - Concise description
2. **Problem** - What problem does it solve?
3. **Solution** - How would you implement it?
4. **Alternatives** - Other approaches considered?

### Example Feature Request

```markdown
## Feature: Dark mode scheduled for automatic switching

### Problem
Users need to manually switch between themes. Many modern apps automatically switch based on system time.

### Solution
Add a "Scheduled" option to theme settings that switches to dark mode at sunset and light mode at sunrise (based on browser geolocation or user input time).

### Alternatives
- Let users set fixed times (e.g., 6 PM - 6 AM)
- Follow system theme automatically (already done in v1.0)

### Additional Context
[Links to similar implementations, mockups, etc.]
```

---

## 📚 Documentation Guidelines

### Adding to README.md

Follow existing structure:
- Use clear headings (h1, h2, h3)
- Include code examples with syntax highlighting
- Add badges for status/versions
- Keep language simple and clear

### Code Comments

```javascript
// Good: Explains WHY, not WHAT
// Use IIFE to create namespace and prevent global pollution
const MyModule = (() => {
  return { /* ... */ };
})();

// Bad: Obvious from code
// Create const called MyModule
const MyModule = (() => {
  return { /* ... */ };
})();
```

### JSDoc Format

```javascript
/**
 * Renders timeline with experience items
 * 
 * @param {Array} experiences - Array of experience objects
 * @param {string} lang - Language code (pt, en, es)
 * @returns {void}
 * 
 * @example
 * Timeline.render(data.experiences.pt, 'pt');
 */
const render = (experiences, lang) => {
  // Implementation
};
```

---

## 🎨 Code Style

### JavaScript

```javascript
// Use const by default, let if reassigning, avoid var
const DEFAULT_THEME = 'dark';
let currentTheme = DEFAULT_THEME;

// Use arrow functions
const add = (a, b) => a + b;

// Use template literals
const message = `Hello, ${name}!`;

// Use async/await
const loadData = async () => {
  try {
    const data = await fetch('/api/data');
    return await data.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Module Pattern (IIFE)
const MyModule = (() => {
  // Private variables
  const privateVar = 'private';
  
  // Private functions
  const privateFunction = () => { /* ... */ };
  
  // Public API
  return {
    publicMethod: () => { /* ... */ }
  };
})();

// Use destructuring
const { name, email } = user;
const [first, ...rest] = array;

// Use spread operator
const newArray = [...oldArray, newItem];
const merged = { ...obj1, ...obj2 };

// Use default parameters
const greet = (name = 'Guest') => `Hello, ${name}!`;
```

### CSS

```css
/* Use CSS variables for theme colors */
:root {
  --color-bg: #0d1117;
  --color-text: #c9d1d9;
}

.theme-light {
  --color-bg: #f6f8fa;
  --color-text: #24292f;
}

/* Use CSS Grid and Flexbox */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Mobile-first approach */
.card {
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    width: 50%;
  }
}
```

### HTML

```html
<!-- Use semantic HTML5 elements -->
<header role="banner">
  <nav role="navigation">
    <button aria-label="Toggle menu">Menu</button>
  </nav>
</header>

<main role="main">
  <section id="content">
    <article>
      <h1>Title</h1>
      <p>Content</p>
    </article>
  </section>
</main>

<footer role="contentinfo">
  <p>&copy; 2024</p>
</footer>
```

---

## ✅ Checklist Before Submitting PR

- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers
- [ ] Tested on mobile
- [ ] Commit messages follow convention
- [ ] Updated relevant documentation
- [ ] No unnecessary files added
- [ ] Ready for production

---

## 🎯 Priorities for Contributions

### High Priority
- Bug fixes (especially security-related)
- Performance improvements
- Accessibility enhancements
- Documentation improvements

### Medium Priority
- New features aligned with roadmap
- Code refactoring for maintainability
- Test coverage improvements

### Low Priority
- Cosmetic changes
- Style updates without functional value
- Nice-to-have features

---

## 💬 Questions or Need Help?

- **Issues:** Use GitHub Issues for bugs and features
- **Discussions:** Use GitHub Discussions for questions
- **Email:** [thiagopetean@gmail.com](mailto:thiagopetean@gmail.com)
- **LinkedIn:** [thiagopeteanselma](https://www.linkedin.com/in/thiagopeteanselma)

---

## 📞 Contact

- **Author:** Thiago Petean Selma
- **Email:** thiagopetean@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/thiagopeteanselma

---

**Thank you for contributing! 🙏**

<div align="center">

*Every contribution, big or small, helps improve this project.*

</div>
