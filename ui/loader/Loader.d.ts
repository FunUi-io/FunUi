import * as React from 'react';
interface FunLoaderProps {
    funcss?: string;
    size?: number;
    fixed?: boolean;
    backdrop?: boolean;
    color?: string;
    variant?: 'simple' | 'duotone' | "circle";
}
export default function FunLoader({ funcss, size, fixed, backdrop, color, variant, ...rest }: FunLoaderProps): React.JSX.Element;
export {};
