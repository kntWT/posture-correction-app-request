/**
 * NOTE
 * baseUrl: tailscaleでVPN接続したホストを想定しているので，nginxでプロキシの設定をする
 */
const backendHostSamples = [
  {
    name: "Localhost",
    baseUrl: "/api/1",
    description: "Local development server",
  },
  {
    name: "Production",
    baseUrl: "/api/2",
    description: "Production API server",
  },
  {
    name: "Staging",
    baseUrl: "/api/staging",
    description: "Staging environment for testing",
  },
] as const;

export { backendHostSamples };
