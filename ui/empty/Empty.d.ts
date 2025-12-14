import * as React from 'react';
interface EmptyProps {
    header?: React.ReactNode | String;
    title?: string | React.ReactNode;
    titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    content?: React.ReactNode;
    description?: string | React.ReactNode;
    descriptionSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    action?: React.ReactNode;
    ctaText?: string;
    ctaIcon?: React.ReactNode;
    ctaOnClick?: () => void;
    ctaBg?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    showCta?: boolean;
}
export default function Empty({ header, title, titleSize, content, description, descriptionSize, action, ctaText, ctaIcon, ctaOnClick, ctaBg, showCta, }: EmptyProps): React.JSX.Element;
export {};
