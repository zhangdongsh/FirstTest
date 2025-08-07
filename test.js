'use client'

import { Markdown, ThemeProvider } from "@lobehub/ui";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemedMarkdownProps {
    children: string;
}

export default function ThemedMarkdown({ children }: ThemedMarkdownProps) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // 在服务端渲染或组件未挂载时，返回简单的markdown渲染
    if (!mounted) {
        return (
            <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap">{children}</pre>
            </div>
        );
    }
    
    try {
        return (
            <ThemeProvider themeMode={resolvedTheme as any}>
                <Markdown>
                    {children}
                </Markdown>
            </ThemeProvider>
        );
    } catch (error) {
        console.error('ThemedMarkdown rendering error:', error);
        // 如果@lobehub/ui组件出错，回退到简单的markdown显示
        return (
            <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap">{children}</pre>
            </div>
        );
    }
}
