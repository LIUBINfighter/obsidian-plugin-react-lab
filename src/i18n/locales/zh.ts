export default {
    translation:{
		"welcome": "欢迎来到Jay的React Lab!",
		"settings": {
			"title": "设置",
			"content": "你可以在右上角设置语言。"
		},
		"readme": {
			"features": {
				"title": "功能特性",
				"markdown": "完整的 Markdown 支持",
				"internalLinks": "Obsidian 内部链接支持",
				"math": "数学公式支持",
				"mermaid": "Mermaid 图表支持"
			},
			"content": `# {{welcome}}

## {{settings.title}}

{{settings.content}}

## {{readme.features.title}}

- {{readme.features.markdown}}
- {{readme.features.internalLinks}}
- {{readme.features.math}}
- {{readme.features.mermaid}}

### 内部链接示例

[[Idea Inbox]]

### 数学公式示例

$$
\\begin{align}
T(v) &= x_1T(u_1) + x_2 T(u_2) + \\ldots + x_n T(u_n) \\\\
&= (A_{11}x_1 + A_{12}x_2 + \\ldots + A_{1n}x_n,\\\\
& A_{21}x_1 + A_{22}x_2 + \\ldots + A_{2n}x_n,\\\\
&\\ldots \\\\
&A_{m1}x_1 + A_{m2}x_2 + \\ldots + A_{mn}x_n)
\\end{align}
$$

### Mermaid 示例

\`\`\`mermaid
graph LR
    A[开始] --> B{是否初始化?}
    B -->|是| C[加载设置]
    B -->|否| D[初始化设置]
    C --> E[渲染界面]
    D --> E
\`\`\`
`
		}
	}
};
