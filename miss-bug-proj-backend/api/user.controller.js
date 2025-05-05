
import bcrypt from 'bcrypt';
import { User } from '../schemes/user.js';




const SALT_ROUNDS = 10;

export async function getUsers(req,res) {
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).send({err: 'access denied'})
        }

        const users = await User.find().select('-passwordHash').lean();
        res.json(users)
    }catch(err){
        console.error(err, 'failed to get users')
        res.status(500).send({err: 'failed to get users'})

    }
}


export async function getUserById(req,res) {
    try{
        const {id} = req.params;
        if(req.user._id !== id && req.user.role !== 'admin'){
            return res.status(403).send({err: 'access denied'})
        }
        const user  = await User.findById(id).select('-passwordHash').lean()
        if(!user) return res.status(404).send({err: 'user not found'})
        res.json(user)
    }catch(err)
    {
        console.error(err, 'failed to get users')
        res.status(500).send({err: 'failed to get users'})

    }
       
}

export async function saveUsers(req,res) {
    try {
        const data = { ...req.body };
        // CREATE
        if (!data._id) {
            if (req.user._id !== id && req.user.role !== 'admin') {
            return res.status(403).send({ err: 'Only admin can create users' });
          }
          if (!data.password) {
            return res.status(400).send({ err: 'Password is required' });
          }
          const existing = await User.findOne({ email: data.email }).lean();
          if (existing) {
            return res.status(409).send({ err: 'Email already in use' });
          }
          const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
          const newUser = new User({
            email: data.email,
            fullname: data.fullname,
            passwordHash,
            role: data.role || 'user'
          });
          await newUser.save();
          const result = newUser.toObject();
          delete result.passwordHash;
          return res.status(201).json(result);
        }
        // UPDATE
        const existing = await User.findById(data._id)
        if(!existing) return res.status(404).send({err: 'user not found'}) 

            if (req.user.role === 'admin' && data.user) {   
                  return res.status(403).send({ err: 'Access denied' });}

        if(data.fullname) existing.fullname = data.fullname
        if(data.email) existing.email = data.email
        if(data.password) existing.passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)

        if(req.user.role === 'admin' && data.user) existing.role = data.role
        await existing.save()
        const result = existing.toObject()
        delete result.passwordHash
        res.json(result)
      } catch (err) {
        console.error('saveUser failed', err);
        res.status(500).send({ err: 'Failed to save user' });
      }
    }
    

    export async function deleteUser(req,res) {
        try{
            const {id} = req.params;
            if(req.user.role !== 'admin') res.status(403).send({err: 'access denied'})
            const user = await User.findById(id)
            if(!user) return res.status(404).send({err: 'user not found'})
            
            await User.findByIdAndDelete(id)
            res.json({msg: 'user deleted'})
        }catch (err) {
            console.error('deleteUser failed', err);
            res.status(500).send({ err: 'deleteUser failed' });}
    }
