import { NextResponse } from 'next/server';
import { certificatesData } from '../../data/certificatesData';

export async function GET() {
  const certificates = certificatesData.map(cert => ({
    id: cert.id,
    title: cert.name,
    issuer: cert.issuer,
    date: cert.issueDate.toISOString(),
    description: `Certificate in ${cert.name}`,
    url: cert.credentialUrl,
    order: cert.order
  }));

  return NextResponse.json(certificates);
}
