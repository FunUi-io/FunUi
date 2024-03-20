interface VideoProps {
    src: string;
    autoPlay: boolean;
    onDuration?: (duration: number) => void;
}
export default function Video({ src, autoPlay, onDuration }: VideoProps): any;
export {};
