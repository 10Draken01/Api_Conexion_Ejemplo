import mongoose, {Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definimos la interfaz de Usuario
export interface IUser {
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definimos el esquema de usuario
const UserSchema = new Schema<IUser, Model<IUser & Document>>({
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true}
})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    
    // Aqui agregamos logica para encriptar la contraseña
    this.password = await bcrypt.hash(this.password, 10);

    // Continuamos con el guardado
    next();
})

// Metodo para comparar contraseñas
UserSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}
export const UserModel = mongoose.model('User', UserSchema);