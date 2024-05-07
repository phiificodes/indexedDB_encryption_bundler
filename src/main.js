import { openIndexedDB } from './indexedDB';
import { publicKey, privateKey } from './keys';
import { encryptionFnx } from './encryptFnx';
import {decryptionFnx } from './decryptFnx'


module.exports = function(){
    let run = openIndexedDB();
    let encryptedData = encryptionFnx('Jesus',publicKey)
    let cipherText = encryptedData.toString('base64');
    console.log('Cipher text:', cipherText);


    let decipheredText = decryptionFnx(encryptedData, privateKey).toString()
    console.log('Decipher text:', decipheredText);
}


         





