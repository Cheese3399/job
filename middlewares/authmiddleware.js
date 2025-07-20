import JWt from "jsonwebtoken"

const userAuth = async (req,res,next) => {
     const authHeader = req.headers.authorization;
     if(!authHeader || !authHeader.startsWith('Bearer')){
        next('Auth Failed')
     }
     const token = authHeader.split(" ")[1]
     try {
        const payload = JWt.verify(token, process.env.JWt_SECRET)
        req.user = {userId: payload.userId}
        next()
     } catch (error) {
        next('Auth Failed')
     }
}

export default userAuth