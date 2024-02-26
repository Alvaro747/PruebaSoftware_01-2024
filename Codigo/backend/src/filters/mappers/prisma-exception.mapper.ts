import { HttpStatus } from '@nestjs/common';

export const errorMappings: Record<string, { status: number; message: string }> = {
  P2000: { status: HttpStatus.BAD_REQUEST, message: 'Input data is too long' },
  P2001: { status: HttpStatus.NO_CONTENT, message: 'Record does not exist' },
  P2002: { status: HttpStatus.CONFLICT, message: 'Reference data already exists' },
  P2003: { status: HttpStatus.BAD_REQUEST, message: 'Foreign key constraint failed' },
  P2025: {
    status: HttpStatus.BAD_REQUEST,
    message:
      'Operation failed because it depends on one or more records that were required but not found',
  },
};
