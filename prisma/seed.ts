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
      quote: "Saudi Event Management transformed our vision into a reality that exceeded all expectations. Their attention to detail is unparalleled in the luxury event space.",
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
      quote: "From the initial consultation to the final toast, every moment was orchestrated with grace and precision. Saudi Event Management doesn't just plan events; they craft legacies.",
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

  // Seed Vendors
  const vendors = [
    { name: "Velvet Lens Photography", category: "Photography", price: 2500, location: "Riyadh", rating: 4.9 },
    { name: "Royal Banquet Catering", category: "Catering", price: 5000, location: "Jeddah", rating: 4.8 },
    { name: "Floral Elegance", category: "Decoration", price: 1500, location: "Dammam", rating: 5.0 },
    { name: "Grand Vision AV", category: "Audio/Visual", price: 3000, location: "Riyadh", rating: 4.7 },
  ]

  const createdVendors = []
  for (const vendor of vendors) {
    const v = await prisma.vendor.create({
      data: vendor
    })
    createdVendors.push(v)
  }

  // Seed Quotes
  const quotes = [
    { clientName: "Faisal Ahmed", clientEmail: "faisal@example.com", details: "Wedding photography for 300 guests", status: "Pending", vendorId: createdVendors[0].id },
    { clientName: "Sarah Khalid", clientEmail: "sarah@example.com", details: "Corporate dinner catering", status: "Approved", vendorId: createdVendors[1].id },
    { clientName: "Omar Hassan", clientEmail: "omar@example.com", details: "Full event decoration with floral theme", status: "Pending", vendorId: createdVendors[2].id },
  ]

  for (const quote of quotes) {
    await prisma.quote.create({
      data: quote
    })
  }

  console.log('Database seeded successfully with Events, Testimonials, Vendors, and Quotes!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
