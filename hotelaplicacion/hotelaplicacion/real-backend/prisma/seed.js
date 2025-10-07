const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main(){
  const hash = (p) => bcrypt.hash(p,10);
  await prisma.user.upsert({
    where: { email: "admin@demo.cl" }, update: {},
    create: { name:"Admin Demo", email:"admin@demo.cl", password: await hash("Demo*123"), role:"ADMIN" }
  });
  await prisma.user.upsert({
    where: { email: "cliente@demo.cl" }, update: {},
    create: { name:"Cliente Demo", email:"cliente@demo.cl", password: await hash("Demo*123"), role:"CLIENT" }
  });
  if(await prisma.room.count()===0){
    await prisma.room.createMany({ data:[
      { hotelName:"Pacific Reef", roomNumber:"101", type:"Standard", capacity:2, price:95, status:"ACTIVE" },
      { hotelName:"Pacific Reef", roomNumber:"201", type:"Deluxe", capacity:2, price:140, status:"ACTIVE" },
      { hotelName:"Pacific Reef", roomNumber:"301", type:"Suite", capacity:4, price:220, status:"ACTIVE" }
    ]});
  }
  console.log("Seed OK");
}
main().finally(()=>prisma.$disconnect());
