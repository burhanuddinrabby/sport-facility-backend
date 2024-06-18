import bcrypt from 'bcrypt';


export const isPasswordMatched = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const matchedPassword = await bcrypt.compare(plainPassword, hashedPassword)
    return matchedPassword
}