export interface CertificateData {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  order: number;
  isVisible: boolean;
}

export const certificatesData: CertificateData[] = [
  {
    id: '1',
    name: 'Full-Stack Web Development',
    issuer: 'freeCodeCamp',
    issueDate: new Date('2022-06-15'),
    credentialUrl: 'https://freecodecamp.org/certification/example',
    order: 1,
    isVisible: true
  },
  {
    id: '2',
    name: 'React - The Complete Guide',
    issuer: 'Udemy',
    issueDate: new Date('2022-03-20'),
    credentialUrl: 'https://udemy.com/certificate/example',
    order: 2,
    isVisible: true
  },
  {
    id: '3',
    name: 'Node.js Backend Development',
    issuer: 'Coursera',
    issueDate: new Date('2021-11-10'),
    credentialUrl: 'https://coursera.org/verify/example',
    order: 3,
    isVisible: true
  },
  {
    id: '4',
    name: 'Database Design & Management',
    issuer: 'LinkedIn Learning',
    issueDate: new Date('2021-08-05'),
    credentialUrl: 'https://linkedin.com/learning/certificates/example',
    order: 4,
    isVisible: true
  },
  {
    id: '5',
    name: 'Cybersecurity Fundamentals',
    issuer: 'Cisco Networking Academy',
    issueDate: new Date('2021-05-15'),
    credentialUrl: 'https://cisco.com/verify/example',
    order: 5,
    isVisible: true
  }
];
