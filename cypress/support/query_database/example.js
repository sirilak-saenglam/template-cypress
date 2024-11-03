export function select_user_name(firstname) {
  return cy.task("READFROMDB", {
    sql: `SELECT x.* FROM app."user" x WHERE firstname = '${firstname}'`, // ใส่ Query ที่ต้องการ
  });
}