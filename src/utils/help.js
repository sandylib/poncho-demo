
export const regexStr = /^[\w+]{3,255}$/;
export const regexNum = /^[0-9]{3,255}$/;
export const regexAge = /^(?:[1-9]|120|1[0-9]|[2-9][0-9])$/;

export const getAge = (DOB) => {
    const today = new Date();
    const birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

export const delay = ms => new Promise(res => setTimeout(res, ms));