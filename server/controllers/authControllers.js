const {google} = require('googleapis')
const UserModel = require('../models/UserModel')
const {redisClient} = require('../sessions/RedisStore')

const schoolMap = {
    'bce': 'scope',
    'bds': 'scope',
    'bkt': 'scope',
    'bci': 'scope',
    'bcb': 'scope',
    'bit': 'site',
    'bec': 'sense',
    'bee': 'select',
    'bme': 'smec',
}

// Create Google OAuth2 Client
const OAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
)

// To authenticate user with Google
const authenticateUser = async (req,res) => {
    
    // get ID token (credential) sent by client
    const {token} = req.body

    try{
        // Verify the credential with google
        const ticket = await OAuth2Client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        // get user details
        const GoogleUser = ticket.getPayload()

        let userExists = await UserModel.findOne({'regNo': `${GoogleUser.family_name}`})
        if(!userExists){
            // Create new user document
            const User = new UserModel({
                regNo: GoogleUser.family_name,
                class: Number(GoogleUser.family_name.slice(0,2)),
                school: schoolMap[GoogleUser.family_name.slice(2,5).toLowerCase()],
                name: GoogleUser.given_name,
                email: GoogleUser.email,
                admin: false
            })
            await User.save()
            userExists = User
        }      

        // create session for user
        req.session.regenerate((err) => {
            if(err) console.error(err)

            req.session.user = {
                regNo: userExists.regNo,
                class: userExists.class,
                name: userExists.name,
                school: userExists.school,
            }
            res.status(200).send('Authorized')
        })
    }
    catch(error) {
        console.error(error.message)
        res.status(401).send('An error occurred when trying to authenticate user.')
    }
}

// To authorize user by checking session
const authorizeUser = async (req,res) => {
    if(req.session.user){
        const user = await UserModel.findOne({'regNo': `${req.session.user.regNo}`})
        if(user.admin) req.session.user.admin = true
        res.status(200).send(req.session.user)
    }
    else res.status(403).send('Unauthorized')
}


// For logging out the user, destroy session
const logout = (req,res) => {
    req?.session.destroy((err) => {
        if(err) next(err)
        res.clearCookie('connect.sid')
        res.status(200).send('User logged out.')
    })
}

module.exports = {authenticateUser, authorizeUser, logout}