declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}
type AnalyticsHandlerProps = {
    id: string;
};
export default function AnalyticsHandler({ id }: AnalyticsHandlerProps): null;
export {};
