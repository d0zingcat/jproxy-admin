import CryptoJS from 'crypto-js';

let key = localStorage.getItem('key');
if (!key) {
  key = CryptoJS.MD5(Date.now().toString()).toString();
  localStorage.setItem('key', key);
}
const KEY = CryptoJS.enc.Utf8.parse(key);

export const aesEncrypt = (plaintext: string) => {
  const ciphertext = CryptoJS.AES.encrypt(plaintext, KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  return ciphertext;
};

export const aesDecrypt = (ciphertext: string) => {
  const plaintext = CryptoJS.AES.decrypt(ciphertext, KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
  return plaintext;
};

export const md5 = (ciphertext: string) => {
  return CryptoJS.MD5(ciphertext).toString().toUpperCase();
};
