export interface NFDRecord {
  name: string
  appID: number
  owner: string
  properties?: {
    verified?: Record<string, string>
    userDefined?: Record<string, string>
    internal?: Record<string, string>
  }
}
