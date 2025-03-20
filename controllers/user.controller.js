const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Validate the email format
 * @param {string} email -  An email to validate
 * @return boolean   
 */
const isValidEmail = (email) => {    
    const emailRegex = /[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/;
    return emailRegex.test(email);
};

/**
 * Register a new user
 * @route POST /api/auth/signup
 * @access Public  
 */
exports.signup = async (req, res) => {
    try {

        let {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email ou mot de passe invalides"})
        } 

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Format d'email invalide." });
        }
        
        const hash = await bcrypt.hash(password, 10) ;

        const user = new User({
            email: email,
            password: hash
        });

        const saveUser = await user.save() ;

        if(saveUser) {
            return res.status(201).json({message: "Utilisateur crée !"})
        } else {
            return res.status(400).json({message: "Echec de la création du compte utilisateur"})
        }           
        
    } catch (error) {
        res.status(500).json({error})
    }            
};

/**
 * Login a user
 * @route POST /api/auth/login
 * @access Public  
 */
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}) ;
    
        if(!user) {
            return res.status(401).json({message: "Email ou mot de passe incorrect"})
        }

        const match = await bcrypt.compare(req.body.password, user.password) ;

        if(!match) {
            return res.status(401).json({message: "Email ou mot de passe incorrect"})
        }
        
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                {userId: user._id},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
            )
        });               
        
    } catch (error) {
        res.status(500).json({error})
    }   
};