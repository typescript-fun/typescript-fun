import nanoid from 'nanoid';
import { NanoID } from '../types';

export const createNanoID = () => NanoID.decode(nanoid());
