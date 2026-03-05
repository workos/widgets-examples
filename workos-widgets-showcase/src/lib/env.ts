export function getApiProps() {
  if (typeof process === "undefined") {
    throw new Error("getApiProps must be called in a Node.js environment");
  }

  const props: {
    apiHostname?: string;
    https?: boolean;
    port?: number;
  } = {};

  if (process.env.WORKOS_API_HOSTNAME) {
    props.apiHostname = process.env.WORKOS_API_HOSTNAME;
  }
  if (process.env.WORKOS_API_HTTPS) {
    props.https = process.env.WORKOS_API_HTTPS === "true";
  }
  if (process.env.WORKOS_API_PORT) {
    props.port = Number.parseInt(process.env.WORKOS_API_PORT, 10);
  }
  return props;
}
