declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
        NODE_ENV: 'development' | 'test'| 'uat' | 'pre-production' | 'production' | 'disaster-recovery';
    }
}
