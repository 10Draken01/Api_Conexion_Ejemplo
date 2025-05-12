import { Request, Response } from "express";
import { UserModel, IUser } from '../models/user.model';
import { generateToken } from "../utils/jwt";
import mongoose from "mongoose";

async function validateEmail(email: string){
    return await UserModel.findOne({ email });
}

export const registerUser = async (req: Request, res: Response): Promise<any> => {
    try{
        const { email, password } = req.body;

        if( await validateEmail(email) ) return res.status(400).json({ error: 'Email ya existe' })

        const newUser = new UserModel({ email: email, password: password });
        const savedUser = await newUser.save();
        if( !savedUser ) return res.status(400).json({ error: 'Error al guardar el usuario' })
        const token = generateToken(savedUser._id.toString());
        
        res.status(200).json({ message: 'Usuario registrado con exito', token:token });

    } catch(error){
        res.status(500).json({error: (error as Error).message})
    }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try{
        const { email, password } = req.body;
        
        const user = await validateEmail(email)
        if( !(user) ) return res.status(400).json({ error: 'Email no existe' })
        
        const isMatch = await user.comparePassword(password);
        if( !isMatch ) return res.status(400).json({ error: 'Contraseña incorrecta' });

        const token = generateToken(user._id.toString());
        res.status(200).json({ message: 'Usuario logueado con exito', token:token });

    } catch(error){
        res.status(500).json({ error: (error as Error).message})
    }
};