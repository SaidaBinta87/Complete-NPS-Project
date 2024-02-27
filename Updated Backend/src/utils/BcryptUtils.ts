import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const slatRounds = 10;
    const hashPassword = await bcrypt.hash(password, slatRounds);
    return hashPassword;
}

// BcryptUtils.ts


export async function checkPassword(password: string, hashPassword: string): Promise<boolean> {
    try {
        const isCorrectPassword = await bcrypt.compare(password, hashPassword);
        return isCorrectPassword;
    } catch (error: any) {
        console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords: ' + error.message);
    }
}