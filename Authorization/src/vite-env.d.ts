interface ImportMetaEnv {
    VITE_BASE_URL: string;
    readonly BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}