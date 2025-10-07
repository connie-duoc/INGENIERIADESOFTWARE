require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "change_me";

// middleware auth
function auth(req,res,next){
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if(!token) return res.status(401).json({ok:false,error:"No token"});
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){ return res.status(401).json({ok:false,error:"Token inválido"}); }
}

// === Auth ===
app.post("/api/auth/login", async (req,res)=>{
  const {email,password} = req.body || {};
  const user = await prisma.user.findUnique({ where:{ email }});
  if(!user) return res.status(400).json({ok:false,error:"Usuario/clave inválidos"});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(400).json({ok:false,error:"Usuario/clave inválidos"});
  const token = jwt.sign({ id:user.id, role:user.role }, JWT_SECRET, { expiresIn:"12h" });
  res.json({ ok:true, token, role:user.role, user:{ id:user.id, name:user.name, email:user.email }});
});

// === Users (registro) ===
app.post("/api/users", async (req,res)=>{
  try{
    const { name,email,password,role="CLIENT" } = req.body || {};
    const exists = await prisma.user.findUnique({ where:{ email }});
    if(exists) return res.status(400).json({ok:false,error:"Email ya existe"});
    const hash = await bcrypt.hash(password,10);
    const u = await prisma.user.create({ data:{ name,email,password:hash,role }});
    res.json({ ok:true, user:{ id:u.id, name:u.name, email:u.email, role:u.role }});
  }catch(e){ console.error(e); res.status(500).json({ok:false,error:"Error creando usuario"}); }
});

// === Items (usaremos rooms como catálogo) ===
app.get("/api/items", async (req,res)=>{
  const rooms = await prisma.room.findMany({ where:{ status:"ACTIVE" }, orderBy:[{price:"asc"}]});
  const items = rooms.map(r=>({
    id:r.id, name:`${r.hotelName} · Hab ${r.roomNumber}`, type:r.type, capacity:r.capacity, price:r.price
  }));
  res.json(items);
});

// === Reservas ===
app.get("/api/reservations", auth, async (req,res)=>{
  const list = await prisma.reservation.findMany({
    where:{ userId: req.user.id }, include:{ room:true }, orderBy:{ createdAt:"desc" }
  });
  res.json(list);
});

app.post("/api/reservations", auth, async (req,res)=>{
  try{
    const { roomId, checkIn, checkOut, guests } = req.body || {};
    const room = await prisma.room.findUnique({ where:{ id: Number(roomId)}});
    if(!room) return res.status(400).json({ok:false,error:"Habitación no existe"});
    // total básico = precio * noches
    const start = new Date(checkIn), end=new Date(checkOut);
    const nights = Math.max(1, Math.ceil((end-start)/(1000*60*60*24)));
    const total = room.price * nights;
    const rs = await prisma.reservation.create({
      data:{ userId:req.user.id, roomId:room.id, checkIn:start, checkOut:end, guests:Number(guests||1), status:"CONFIRMED", total }
    });
    res.json({ ok:true, id:rs.id, total, status:rs.status });
  }catch(e){ console.error(e); res.status(500).json({ok:false,error:"No se pudo crear la reserva"}); }
});

app.listen(PORT, ()=> console.log(`API corriendo en http://localhost:${PORT}`));
