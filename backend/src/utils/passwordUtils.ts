
//generate salt
export const generateSalt = (length = 10):Uint8Array => {
    const salt = new Uint8Array(length);
    crypto.getRandomValues(salt);
    return salt;
}

//hash password
export const hashPassword = async (password:string, salt:Uint8Array):Promise<Uint8Array> => {

    const passwordBytes = new TextEncoder().encode(password);

    //saltedPassword
    const saltedPassword = new Uint8Array(salt.length + password.length);
    saltedPassword.set(salt);
    saltedPassword.set(passwordBytes, salt.length);

    //hash the salted password
    const hashBuffer = await crypto.subtle.digest('SHA-256',saltedPassword);

    return new Uint8Array(hashBuffer);
}


export const uint8ArrayToBase64 = (arr:Uint8Array):string => {
    return  btoa(String.fromCharCode(...arr));
}


export const base64ToUnit8Array = (base64:string):Uint8Array => {
    return  Uint8Array.from(atob(base64), (c)=>c.charCodeAt(0));
}

//btoa => converts a string into base64 encoded string
//atob => converts a base64 encoded string into a string