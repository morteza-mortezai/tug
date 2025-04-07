import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { Category } from '../src/product/entities/category.entity';
import { Subcategory } from '../src/product/entities/subcategory.entity';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let createdCategoryId: number;
  let createdSubcategoryId: number;
  let createdProductId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const categoryRepository = app.get(getRepositoryToken(Category));
    const subcategoryRepository = app.get(getRepositoryToken(Subcategory));

    const testCategory = categoryRepository.create({ name: 'Test Category' });
    await categoryRepository.save(testCategory);

    createdCategoryId = testCategory.id;

    const testSubcategory = subcategoryRepository.create({
      name: 'Test Subcategory',
      category: testCategory,
    });
    await subcategoryRepository.save(testSubcategory);
    createdSubcategoryId = testSubcategory.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /product creates a product', async () => {
    const createProductDto = {
      name: 'Test Product',
      barcode: '123456',
      categoryId: createdCategoryId,
      subcategoryId: createdSubcategoryId,
    };

    const res = await request(app.getHttpServer())
      .post('/product')
      .send(createProductDto)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(createProductDto.name);
    expect(res.body.barcode).toEqual(createProductDto.barcode);
    expect(res.body.category).toBeDefined();
    expect(res.body.category.id).toEqual(createdCategoryId);
    expect(res.body.subCategory).toBeDefined();
    expect(res.body.subCategory.id).toEqual(createdSubcategoryId);

    createdProductId = res.body.id;
  });

  it('GET /product retrieves all products', async () => {
    const res = await request(app.getHttpServer()).get('/product').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    // Optionally, check that the created product is in the list:
    const product = res.body.find((p) => p.id === createdProductId);
    expect(product).toBeDefined();
  });

  it('GET /product/:id retrieves a product by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/product/${createdProductId}`)
      .expect(200);

    expect(res.body.id).toEqual(createdProductId);
    expect(res.body.category.id).toEqual(createdCategoryId);
  });

  it('GET /product/barcode/:barcode retrieves a product by barcode', async () => {
    const res = await request(app.getHttpServer())
      .get(`/product/barcode/123456`)
      .expect(200);

    expect(res.body.barcode).toEqual('123456');
  });

  it('PATCH /product/:id updates a product', async () => {
    const updateDto = { name: 'Updated Product' };
    const res = await request(app.getHttpServer())
      .patch(`/product/${createdProductId}`)
      .send(updateDto)
      .expect(200);

    expect(res.body.name).toEqual('Updated Product');
  });

  it('DELETE /product/:id deletes a product', async () => {
    await request(app.getHttpServer())
      .delete(`/product/${createdProductId}`)
      .expect(200);
  });

  it('GET /product/:id returns 404 after deletion', async () => {
    await request(app.getHttpServer())
      .get(`/product/${createdProductId}`)
      .expect(404);
  });
});
