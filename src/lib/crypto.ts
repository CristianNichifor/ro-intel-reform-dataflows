const encoder = new TextEncoder()

export async function sha256Hex(data: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(data))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function hmacSign(key: string, data: string): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', keyMaterial, encoder.encode(data))
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const SSC_SIGNING_KEY = 'demo-ssc-signing-key'

export function canonicalize(obj: unknown): string {
  return JSON.stringify(obj, Object.keys(obj as Record<string, unknown>).sort())
}

export function shortHash(hash: string): string {
  return `${hash.slice(0, 10)}…`
}

export function uuid(): string {
  return crypto.randomUUID()
}
