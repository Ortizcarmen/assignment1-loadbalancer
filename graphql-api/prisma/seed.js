const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const author1 = await prisma.author.create({
    data: {
      name: 'Gabriel García Márquez',
      nationality: 'Colombiana',
      birthYear: 1927,
      bio: 'Premio Nobel de Literatura 1982, maestro del realismo mágico.',
    },
  })

  const author2 = await prisma.author.create({
    data: {
      name: 'Jorge Luis Borges',
      nationality: 'Argentina',
      birthYear: 1899,
      bio: 'Escritor y poeta argentino, figura central de la literatura en español.',
    },
  })

  await prisma.book.createMany({
    data: [
      {
        title: 'Cien años de soledad',
        genre: 'Realismo mágico',
        publishedYear: 1967,
        pages: 417,
        summary: 'La historia de la familia Buendía a lo largo de siete generaciones.',
        available: true,
        authorId: author1.id,
      },
      {
        title: 'El amor en los tiempos del cólera',
        genre: 'Romance',
        publishedYear: 1985,
        pages: 348,
        summary: 'Una historia de amor que espera más de cincuenta años.',
        available: true,
        authorId: author1.id,
      },
      {
        title: 'Ficciones',
        genre: 'Fantástico',
        publishedYear: 1944,
        pages: 224,
        summary: 'Cuentos que exploran laberintos, bibliotecas y universos paralelos.',
        available: false,
        authorId: author2.id,
      },
      {
        title: 'El Aleph',
        genre: 'Fantástico',
        publishedYear: 1949,
        pages: 195,
        summary: 'Cuentos que exploran el infinito, los espejos y la identidad.',
        available: true,
        authorId: author2.id,
      },
    ],
  })

  console.log('✅ Datos creados correctamente')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
