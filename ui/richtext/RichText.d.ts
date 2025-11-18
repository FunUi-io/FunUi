import React from 'react';
interface RichTextProps {
    value: string;
    onChange: (content: string) => void;
    showEmojis?: boolean;
    placeholder?: string;
    afterEmoji?: React.ReactNode;
    funcss?: string;
    modules?: any;
    theme?: 'bubble' | 'snow';
    fontFamily?: string;
    maxValue?: number;
}
declare const RichText: React.FC<RichTextProps>;
export default RichText;
