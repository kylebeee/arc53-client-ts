export interface IPFSMetaData {
    mime: string
    integrity: string;
}

export async function getIPFSMetaData(url: string): Promise<IPFSMetaData> {
    url = url.replace('ipfs://', '');
    const response = await fetch(`https://ipfs.algonode.xyz/ipfs/${url}`);
    const mime = response.headers.get('Content-Type')!;

    const fileBuffer = await response.arrayBuffer();
    const fileSha256 = await crypto.subtle.digest('SHA-256', fileBuffer);
    const fileSha256Base64  = Buffer.from(fileSha256).toString('base64');
    const integrity = `sha256-${fileSha256Base64}`;

    return { mime, integrity };
}
