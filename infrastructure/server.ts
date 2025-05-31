import { allSecrets } from "./secret";

export const server = new sst.aws.Function("Server", {
  url: true,
  handler: "app/server/index.handler",
  link: [...allSecrets],
});

export const outputs = {
  serverUrl: server.url,
};
