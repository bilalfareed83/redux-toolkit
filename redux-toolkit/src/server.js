import { Server, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,
    routes() {
      this.namespace = "api";

      this.get("number", (schema) => {
        return Math.ceil(Math.random() * 10);
      });
    },
  });

  return server;
}
