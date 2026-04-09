import algosdk from 'algosdk'

// NFD registry app ID on mainnet
const NFD_REGISTRY_APP_ID = 760937186

// ABI method for setting a user-defined field on an NFD
// Method signature: set(string,uint64,address,string)void
// Args: name (field name), nfdAppId, sender address, value
const SET_METHOD = new algosdk.ABIMethod({
  name: 'set',
  args: [
    { type: 'string', name: 'name' },
    { type: 'uint64', name: 'nfdAppId' },
    { type: 'address', name: 'sender' },
    { type: 'string', name: 'value' },
  ],
  returns: { type: 'void' },
})

export async function buildNFDUpdateTxns(
  nfdAppId: number,
  senderAddress: string,
  arc53CID: string,
  algodClient: algosdk.Algodv2,
): Promise<algosdk.Transaction[]> {
  const suggestedParams = await algodClient.getTransactionParams().do()

  const atc = new algosdk.AtomicTransactionComposer()

  atc.addMethodCall({
    appID: NFD_REGISTRY_APP_ID,
    method: SET_METHOD,
    methodArgs: [
      'arc53',
      BigInt(nfdAppId),
      senderAddress,
      `ipfs://${arc53CID}`,
    ],
    sender: senderAddress,
    suggestedParams: {
      ...suggestedParams,
      fee: BigInt(2000),
      flatFee: true,
    },
    signer: algosdk.makeEmptyTransactionSigner(),
    appForeignApps: [nfdAppId],
  })

  const txnGroup = atc.buildGroup()
  return txnGroup.map(t => t.txn)
}
