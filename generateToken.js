import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const payload = { id: 123, nom: 'Nada' };  // données que tu veux mettre dans le token
const secret = process.env.JWT_SECRET;     // ta clé secrète depuis .env

const token = jwt.sign(payload, secret, { expiresIn: '1h' });  // token valide 1 heure

console.log('Token JWT généré:', token);
