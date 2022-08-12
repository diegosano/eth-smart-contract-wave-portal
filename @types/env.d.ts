declare namespace NodeJS {
  interface ProcessEnv {
    readonly STAGING_QUICKNODE_KEY: string;
    readonly PROD_QUICKNODE_KEY: string;
    readonly PRIVATE_KEY: string;
  }
}