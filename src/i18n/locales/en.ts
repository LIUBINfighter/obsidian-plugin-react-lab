export default {
    translation: {
		"welcome": "Welcome",
		"settings": {
			"title": "Settings",
			"content": "You can change the language in the top right corner."  // 更新这一行
		},
		"readme": {
			"features": {
				"title": "Features",
				"markdown": "Full Markdown Support",
				"internalLinks": "Obsidian Internal Links Support",
				"math": "Math Formula Support",
				"mermaid": "Mermaid Diagram Support"
			},
			"content": `# {{welcome}}

## {{settings.title}}

{{settings.content}}

## {{readme.features.title}}

- {{readme.features.markdown}}
- {{readme.features.internalLinks}}
- {{readme.features.math}}
- {{readme.features.mermaid}}

### Internal Links Demo

[[Idea Inbox]]

### Math Formula Demo

$$
\\begin{align}
T(v) &= x_1T(u_1) + x_2 T(u_2) + \\ldots + x_n T(u_n) \\\\
&= (A_{11}x_1 + A_{12}x_2 + \\ldots + A_{1n}x_n,\\\\
& A_{21}x_1 + A_{22}x_2 + \\ldots + A_{2n}x_n,\\\\
&\\ldots \\\\
&A_{m1}x_1 + A_{m2}x_2 + \\ldots + A_{mn}x_n)
\\end{align}
$$

### Mermaid Demo

\`\`\`mermaid
graph LR
    A[Start] --> B{Initialized?}
    B -->|Yes| C[Load Settings]
    B -->|No| D[Init Settings]
    C --> E[Render UI]
    D --> E
\`\`\`
`
		}
	}
};
