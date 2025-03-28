import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub flavored markdown (tables, strikethrough)
import remarkMath from "remark-math"; // Math support
import rehypeKatex from "rehype-katex"; // Render LaTeX math
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting
import "./../assets/katex/katex.min.css"; // Styles for LaTeX
import "./../assets/highlight.js/styles/github-dark.min.css";

const MarkdownRenderer = ({ content }: { content: string | undefined }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        code({ node, inline, className, children, ...props }) {
          return !inline ? (
            <pre>
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code {...props}>{children}</code>
          );
        },
      }}
    />
  );
};

export default MarkdownRenderer;
