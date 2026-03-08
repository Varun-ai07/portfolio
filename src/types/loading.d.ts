export {};

declare global {
    interface Window {
        loadingProgress: {
            current: number;
            stages: Record<string, { weight: number; done: boolean }>;
            updateProgress: (stage: string) => void;
            calculate: () => void;
            render: () => void;
            complete: () => void;
        };
    }
}
