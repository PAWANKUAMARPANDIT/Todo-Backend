import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signIn = async(req,res)=>{
        const {username,email,password} = req.body;
        if ([username,email,password].some((field) => typeof field === "string" && field.trim() === "")) {
            return res.status(400).send({ message: "All fields are required" });
        }
        try {
        const ExistingUser = await User.findOne({email});
        if(ExistingUser) return res.status(400).json({message:"User already exists with this email"});

        const newUser = new User({username,email,password});

        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_TOKEN_EXPIRY});

      return res.status(201).send({message:"User registered successfully",token});
        
        } catch (error) {
        console.error(error);
        return res.status(500).send({message:"Failed to register user"})  
        }
}


const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await existingUser.isPasswordValid(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
            sameSite: "Strict"
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in logIn:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export {signIn,logIn}