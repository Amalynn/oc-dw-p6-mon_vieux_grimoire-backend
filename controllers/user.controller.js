const User = require('../models/User');
const bcrypt = require('bcrypt');

const isValidEmail = (email) => {    
    const emailRegex = /[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/;
    return emailRegex.test(email);
};

/**
 * Register a new user
 * @route POT /api/auth/signup
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

exports.login = (req, res,next) => {
    res.status(200).json({message: "Utilisateur connecté"})
};