export interface NFDRecord {
  name: string
  appID: number
  asaID?: number
  owner: string
  state?: string
  depositAccount?: string
  nfdAccount?: string
  properties?: {
    verified?: Record<string, string>
    userDefined?: Record<string, string>
    internal?: Record<string, string>
  }
}
