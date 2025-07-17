import React from 'react';
import 'quill/dist/quill.bubble.css';
interface RichTextProps {
    /** The HTML content of the editor */
    value: string;
    showEmojis: boolean;
    /** Function triggered when the editor content changes */
    onChange: (content: string) => void;
    /** Placeholder shown when editor is empty */
    placeholder?: string;
    /** Optional ReactNode to be rendered after the emoji dropdown */
    afterEmoji?: React.ReactNode;
    /** Extra class names for container styling */
    funcss?: string;
}
declare const RichText: React.FC<RichTextProps>;
export default RichText;
