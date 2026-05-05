import { NextResponse } from 'next/server';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Jerome Portfolio API',
    version: '1.0.0',
    description: 'Swagger documentation for the portfolio projects API.',
  },
  servers: [{ url: '/' }],
  paths: {
    '/api/projects': {
      get: {
        summary: 'Get projects',
        description: 'Returns the portfolio project data.',
        responses: {
          '200': {
            description: 'A list of projects.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Project',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Project: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'HitamoSpace @UR (Event Platform)' },
          description: { type: 'string', example: 'A high-availability event management and ticketing system.' },
          image: { type: 'string', example: '/hitamoSpace.png' },
          tags: {
            type: 'array',
            items: { type: 'string' },
            example: ['React', 'Next.js', 'Prisma', 'MongoDB', 'WebRTC'],
          },
          highlights: {
            type: 'array',
            items: { type: 'string' },
            example: ['Successfully scaled to support 25K+ attendees.', 'Implemented QR code verification.'],
          },
          demoLink: { type: 'string', example: 'https://hitamospace.ur.ac.rw/' },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
