import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@vercel/postgres";
export async function getAffiliate(email) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createAffiliate(formData) {
  let { title, content, display_order, image, url } = formData;
  await sql`
  INSERT INTO Affiliate (title, content, display_order, image, url)
  VALUES (${title}, ${content}, ${display_order}, ${image}, ${url})
`;
}

export async function updateAffiliate(formData, id) {
  let { title, content, display_order, image, url } = formData;
  await sql`
  UPDATE Affiliate
SET title = ${title},
    content = ${content},
    display_order = ${display_order},
    image = ${image},
    url = ${url}
WHERE id = ${id};
`;
}

export async function deleteAffiliate(id) {
  await sql`
  DELETE FROM Affiliate
WHERE id = ${id};
`;
}
