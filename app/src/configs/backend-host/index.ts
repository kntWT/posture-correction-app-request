export * from "./backendHost";

import { backendHosts } from "./backendHost";
type BackendHost = typeof backendHosts[number];
export type { BackendHost };