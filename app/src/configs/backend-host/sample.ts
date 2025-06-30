const backendHostSamples = [
  {
    name: "Localhost",
    host: "localhost",
    port: 3000,
    description: "Local development server",
  },
  {
    name: "Production",
    host: "api.example.com",
    port: 443,
    description: "Production API server",
  },
  {
    name: "Staging",
    host: "staging.example.com",
    port: 443,
    description: "Staging environment for testing",
  },
] as const;

export { backendHostSamples };
