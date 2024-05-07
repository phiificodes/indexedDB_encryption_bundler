import crypto from 'crypto';

export function encryptionFnx(data,publickey){
    let encryptedData = crypto.publicEncrypt({
    key: publickey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256"
    }, 
    Buffer.from(data))

    return  encryptedData; 
};