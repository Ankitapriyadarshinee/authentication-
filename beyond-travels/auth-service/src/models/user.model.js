const { eq } = require("drizzle-orm");
const { db } = require("../config/db");
const { users, loginLogs } = require("../db/schema");

const User = {
  async findByEmail(email) {
    const rows = await db.select().from(users).where(eq(users.email, email));
    return rows[0] || null;
  },

  async findById(id) {
    const rows = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        created_at: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, id));
    return rows[0] || null;
  },

  async create({ name, email, phone, password }) {
    const rows = await db
      .insert(users)
      .values({ name, email, phone, password })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
      });
    return rows[0];
  },

  async logLogin(user) {
    await db.insert(loginLogs).values({ userId: user.id, email: user.email });
  },
};

module.exports = User;