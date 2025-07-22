export function getApiProps() {
  let clientId: string
  if (import.meta.env.VITE_WORKOS_CLIENT_ID) {
    clientId = import.meta.env.VITE_WORKOS_CLIENT_ID
  } else {
    throw new Error('VITE_WORKOS_CLIENT_ID must be set')
  }

  const props: {
    clientId: string
    apiHostname?: string
    https?: boolean
    port?: number
    redirectUri?: string
  } = { clientId }

  if (import.meta.env.VITE_WORKOS_API_HOSTNAME) {
    props.apiHostname = import.meta.env.VITE_WORKOS_API_HOSTNAME
  }
  if (import.meta.env.VITE_WORKOS_API_HTTPS) {
    props.https = import.meta.env.VITE_WORKOS_API_HTTPS === 'true'
  }
  if (import.meta.env.VITE_WORKOS_API_PORT) {
    props.port = Number.parseInt(import.meta.env.VITE_WORKOS_API_PORT, 10)
  }

  if (import.meta.env.VITE_WORKOS_REDIRECT_URI) {
    props.redirectUri = import.meta.env.VITE_WORKOS_REDIRECT_URI
  }

  console.log('props', props)
  return props
}

export function getDevtools() {
  return import.meta.env.VITE_WORKOS_DEVTOOLS === 'true'
}
