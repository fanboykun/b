import { defineConfig, generators, servers } from "arri";

export default defineConfig({
  server: servers.goServer(),
  // register client generators here
  generators: [
    generators.typescriptClient({
      clientName: "RpcClient",
      outputFile: "./rpc_client.gen.ts",
    }),
  ],
});
