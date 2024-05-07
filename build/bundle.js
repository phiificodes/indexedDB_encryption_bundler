'use strict';

function openIndexedDB() {
    return new Promise((resolve, reject) => {
        //request a connection to indexedDB database 
        const request = window.indexedDB.open('customerDatabase', 1);

        request.onerror = function(event) {
            reject('Failed to open IndexedDB: ' + event.target.errorCode);
        };

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const customerObjStr = db.createObjectStore('customers', { keyPath: 'ssn' });
            customerObjStr.createIndex('name', ['name'], {unique: false });
            customerObjStr.createIndex('age', ['age'], {unique:false});
            customerObjStr.createIndex('email',['email'], {unique: true});
        }; 
        
        request.onsuccess = function(event) {
            resolve(event.target.result);
           // console.log('IndexedDB is iniatialized and connected succefully');
            
            const db = event.target.result; //assign results of indexedDB database connection to a variable db
            
            //create a transaction on objectStore of indexedDB created 
            //transaction to store data on objectStore
            const transactionOnCustomers = db.transaction('customers', 'readwrite');
            
                       
            // This is what our customer data looks like.
            const customerData = [
                        { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
                        { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
                      ];
            
           /* customerData.forEach((customer) => {
                    encryptData(customer.name);
            }) */  
            console.log(customerData.at(0));   
            customerData.forEach((customer) => {
                        const request = (transactionOnCustomers.objectStore('customers')).add(customer);
                        request.onsuccess = (event) => {
                          //event.target.result === customer.ssn;
                        };          
                    });

            transactionOnCustomers.oncomplete = function () {
                db.close();
            };  

        };
        
    });
}

var crypto = {};

const {publicKey, privateKey} = crypto.generateKeyPairSync(
    'rsa', {modulusLength: 2048}
    );

function encryptionFnx(data,publickey){
    let encryptedData = crypto.publicEncrypt({
    key: publickey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256"
    }, 
    Buffer.from(data));

    return  encryptedData; 
}

function decryptionFnx(data, privateKey){
    let decryptedData = crypto.privateDecrypt({
        key:privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, data);

    return decryptedData;
}

module.exports = function(){
    openIndexedDB();
    let encryptedData = encryptionFnx('Jesus',publicKey);
    let cipherText = encryptedData.toString('base64');
    console.log('Cipher text:', cipherText);


    let decipheredText = decryptionFnx(encryptedData, privateKey).toString();
    console.log('Decipher text:', decipheredText);
};
