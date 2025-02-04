/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET_KEY ,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
});

export const generateJwtToken = (email: string, password: string): string => {
  const payload = { email: email, password: password };
  
  return jwtService.sign(payload);
};

export const verifyJwtToken = (token: string): any => {
  try {
    return jwtService.verify(token);
  } catch (error) {
    return null; // Return null if verification fails
  }
};
