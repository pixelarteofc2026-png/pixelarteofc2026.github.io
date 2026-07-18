import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Create company
  const company = await prisma.company.create({
    data: {
      name: 'Padaria do João',
      cnpj: '12.345.678/0001-90',
      email: 'contato@padariadojoao.com.br',
      phone: '(11) 3456-7890',
    },
  });

  console.log('✓ Empresa criada:', company.name);

  // Create users
  const hashedPassword = await bcryptjs.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
      companyId: company.id,
    },
  });

  const cashierUser = await prisma.user.create({
    data: {
      email: 'caixa@example.com',
      password: hashedPassword,
      name: 'Caixa',
      role: 'CASHIER',
      companyId: company.id,
    },
  });

  console.log('✓ Usuários criados');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Bebidas',
        companyId: company.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pães',
        companyId: company.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Doces',
        companyId: company.id,
      },
    }),
  ]);

  console.log('✓ Categorias criadas');

  // Create supplier
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Fornecedor Principal',
      cnpj: '98.765.432/0001-12',
      email: 'fornecedor@example.com',
      phone: '(11) 2345-6789',
      companyId: company.id,
    },
  });

  console.log('✓ Fornecedor criado');

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Café Premium',
        barcode: '123456789',
        sku: 'CAF-001',
        costPrice: 5,
        sellPrice: 15.5,
        stock: 100,
        minimumStock: 10,
        companyId: company.id,
        categoryId: categories[0].id,
        supplierId: supplier.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pão Francês',
        barcode: '987654321',
        sku: 'PAO-001',
        costPrice: 2,
        sellPrice: 8.0,
        stock: 150,
        minimumStock: 20,
        companyId: company.id,
        categoryId: categories[1].id,
        supplierId: supplier.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bolo de Chocolate',
        barcode: '555666777',
        sku: 'BOL-001',
        costPrice: 15,
        sellPrice: 35.0,
        stock: 25,
        minimumStock: 5,
        companyId: company.id,
        categoryId: categories[2].id,
        supplierId: supplier.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Suco Natural',
        barcode: '444333222',
        sku: 'SUC-001',
        costPrice: 3,
        sellPrice: 12.0,
        stock: 80,
        minimumStock: 15,
        companyId: company.id,
        categoryId: categories[0].id,
        supplierId: supplier.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Croissant',
        barcode: '111222333',
        sku: 'CRO-001',
        costPrice: 3.5,
        sellPrice: 10.0,
        stock: 60,
        minimumStock: 10,
        companyId: company.id,
        categoryId: categories[2].id,
        supplierId: supplier.id,
      },
    }),
  ]);

  console.log('✓ Produtos criados');

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'João Silva',
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999',
        email: 'joao@example.com',
        address: 'Rua A, 123',
        city: 'São Paulo',
        state: 'SP',
        companyId: company.id,
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Maria Santos',
        cpf: '987.654.321-00',
        phone: '(11) 98888-8888',
        email: 'maria@example.com',
        address: 'Avenida B, 456',
        city: 'São Paulo',
        state: 'SP',
        companyId: company.id,
      },
    }),
  ]);

  console.log('✓ Clientes criados');

  console.log('\n✅ Seed completado com sucesso!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('   Email: admin@example.com');
  console.log('   Senha: password123');
  console.log('   Papel: Administrador\n');
  console.log('   Email: caixa@example.com');
  console.log('   Senha: password123');
  console.log('   Papel: Caixa\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao fazer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
