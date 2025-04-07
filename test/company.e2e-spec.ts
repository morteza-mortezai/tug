import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;
  let createdCompanyId: number;
  let createdProductId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // Create a product to use in tests
    const productRes = await request(app.getHttpServer())
      .post('/product')
      .send({ name: 'Test Product', barcode: '123456', categoryId: 1 });
    // console.log('created product', productRes.body);
    if (productRes?.body?.id) {
      createdProductId = productRes.body.id;
    }

    expect(createdProductId).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /company → should create a company', async () => {
    const res = await request(app.getHttpServer())
      .post('/company')
      .send({
        name: 'Test Company',
        productId: createdProductId,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Company');
    expect(res.body.product.id).toBe(createdProductId);
    createdCompanyId = res.body.id;
  });

  it('GET /company → should return list of companies', async () => {
    const res = await request(app.getHttpServer()).get('/company').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('GET /company/:id → should return one company', async () => {
    const res = await request(app.getHttpServer())
      .get(`/company/${createdCompanyId}`)
      .expect(200);

    expect(res.body.id).toBe(createdCompanyId);
    expect(res.body.product.id).toBe(createdProductId);
  });

  it('PATCH /company/:id → should update the company', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/company/${createdCompanyId}`)
      .send({ name: 'Updated Company' })
      .expect(200);

    expect(res.body.name).toBe('Updated Company');
  });

  it('DELETE /company/:id → should soft delete the company', async () => {
    await request(app.getHttpServer())
      .delete(`/company/${createdCompanyId}`)
      .expect(200);
  });

  it('GET /company/:id → should return 404 for deleted company', async () => {
    await request(app.getHttpServer())
      .get(`/company/${createdCompanyId}`)
      .expect(404);
  });
});
