import jwt from 'jsonwebtoken'

const JWT_SECRET = 'missBugSecretKey'

export function requireAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(401).send('missing token')

        try{
            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded
            next()
        }catch(err){
            return res.status(403).send('invaild token')
        }
}