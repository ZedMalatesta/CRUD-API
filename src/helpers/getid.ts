
export const getIdFromUrl = (url:string):string => {
    let arrayOfPath = url.split("/");
    console.log(arrayOfPath);
    if(arrayOfPath.length!==4||arrayOfPath[1]!=="api"||arrayOfPath[2]!=="users") return '';
    else return arrayOfPath[3];
};

