import jwt_decode from 'jwt-decode';

function fromTokentoDate (token){
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
}
export default fromTokentoDate;