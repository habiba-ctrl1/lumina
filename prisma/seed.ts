const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.event.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.contactMessage.deleteMany()

  // Seed Events
  const events = [
    { src: "/gallery_1.png", alt: "Luxury Table Setting", className: "col-span-1 row-span-2 h-[600px]" },
    { src: "/gallery_2.png", alt: "Outdoor Event Night", className: "col-span-1 row-span-1 h-[288px]" },
    { src: "/wedding.png", alt: "Luxury Wedding", className: "col-span-1 row-span-1 h-[288px]" },
    { src: "/corporate.png", alt: "Corporate Gala", className: "col-span-2 row-span-1 h-[400px]" },
  ]

  for (const event of events) {
    await prisma.event.create({
      data: event
    })
  }

  // Seed Testimonials
  const testimonials = [
    {
      quote: "Lumina transformed our vision into a reality that exceeded all expectations. Their attention to detail is unparalleled in the luxury event space.",
      author: "Eleanor Vance",
      role: "Bride",
      rating: 5
    },
    {
      quote: "The level of professionalism and the seamless execution of our annual gala left our stakeholders completely speechless. Truly a masterclass in event management.",
      author: "James Sterling",
      role: "CEO, Sterling Corp",
      rating: 5
    },
    {
      quote: "From the initial consultation to the final toast, every moment was orchestrated with grace and precision. Lumina doesn't just plan events; they craft legacies.",
      author: "Sophia Laurent",
      role: "Philanthropist",
      rating: 5
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
