import { Experience } from './experience';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  profileImg?: string;
  coverImg?: string;
  jobTitle?: string;
  jobAndEducation?: string;
  address?: string;
  about?: string;
  expriences?: Experience[];
  skills?: string[];
  connectionIds?: number[];
}
