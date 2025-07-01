interface UseHlsOptions {
    videoRef: React.RefObject<HTMLVideoElement>;
    src: string;
    autoPlay?: boolean;
    onLoaded?: () => void;
}
export declare function useHls({ videoRef, src, autoPlay, onLoaded }: UseHlsOptions): void;
export {};
