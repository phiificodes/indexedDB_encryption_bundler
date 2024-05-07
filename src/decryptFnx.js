import crypto from 'crypto';

export function decryptionFnx(data, privateKey){
    let decryptedData = crypto.privateDecrypt({
        key:privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, data)

    return decryptedData;
}
