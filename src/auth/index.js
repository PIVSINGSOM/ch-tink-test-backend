const jwt = require('jsonwebtoken')  // ใช้งาน jwt module

 
// สร้าง middleware ฟังก์ชั่นสำหรับ verification token
const authorization = ((req, res, next) => {
        
    const authorization = req.headers['authorization'] // ดึงข้อมูล authorization ใน header

    
    // ถ้าไม่มีการส่งค่ามา ส่ง ข้อความ json พร้อม status 401 Unauthorized
    if(authorization===undefined) {
        return res.status(401).json({
            "status": 401,
            "message": "Unauthorized"
        })       
    }



    // ถ้ามีการส่งค่ามา แยกเอาเฉพาะค่า token จากที่ส่งมา 'Bearer xxxx' เราเอาเฉพาะ xxxx
    // แยกข้อความด้วยช่องว่างได้ array สองค่า เอา array key ตัวที่สองคือ 1 
    // array key เริ่มต้นที่ 0 จะเได้ key เท่ากับ 1 คือค่า xxxx ที่เป้น token
    const token = req.headers['authorization'].split(' ')[1]
  
    if(token===undefined) return res.status(401).json({ // หากไมมีค่า token
        "status": 401,
        "message": "Unauthorized"
    })   
    // ใช้ค่า privateKey เ็น buffer ค่าที่อ่านได้จากไฟล์ .env ในโฟลเดอร์ 
    const privateKey = process.env.TOKEN_SECRET
  
    // ทำการยืนยันความถูกต้องของ token
    jwt.verify(token, privateKey, function(error, decoded) {
        if(error){
            if(error.name=='TokenExpiredError'){ // Token หมดอายุ
                return res.status(404).json({ 
                    "status": 404,
                    "message": "TOKEN EXPIRED"
                })  
            }else{
                return res.status(401).json({ // หาก error ไม่ผ่าน ยืนยันตัวตนไม่ผ่าน
                    "status": 401,
                    "message": "Unauthorized"
                })  
            }
        }

        console.log(error)

        if(decoded === undefined ) return res.status(403).json({
            "status": 403,
            "message": "Forbidden"
        })   
        // ถ้าทุกอย่างผ่าน ทุกเงื่อนไข ก็ไปทำ middleware ฟังก์ชั่นในลำดับถัดไป
        req.body.decoded = decoded
        next()        
    })
})



module.exports =   authorization // ส่ง middleware ฟังก์ชั่นไปใช้งาน