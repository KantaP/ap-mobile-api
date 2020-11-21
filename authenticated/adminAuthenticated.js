var token = require('./token');

module.exports = (req , res , next) => {
    try {
        const bearerToken = req.headers['authorization'] || '';
        if(!bearerToken) res.status(401).send('ไม่มีสิทธิ์ในการเข้าถึง');
        const webToken = bearerToken.split(' ')[1];
        const decoded = token.decodeWebToken(webToken);
        console.log(decoded);
        if(decoded.role !== "admin") {
            return res.status(401).send('ไม่มีสิทธิ์ในการเข้าถึง');
        } 
        req.user = decoded;
        next();
    }catch(error) {
        return res.status(400).send('เกิดข้อผิดพลาดในการใช้งาน')
    }
}