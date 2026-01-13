export const parseOrThrow = (schema, data) => {
  const r = schema.safeParse(data);
  if (!r.success) {
    const msg = r.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ");
    const e = new Error(msg);
    e.statusCode = 400;
    throw e;
  }
  return r.data;
};
