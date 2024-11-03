const { defineConfig } = require("cypress");
const pg = require("pg");

// ค่าการตั้งค่าเชื่อมต่อฐานข้อมูล
const dbConfig = {
  user: "postgres",
  host: "172.31.107.123",
  database: "hii_ds_core_dev",
  password: "Zxcv123!",
  port: 5432,
};

module.exports = defineConfig({
  e2e: {
    supportFile: "cypress/support/e2e.js", // ไฟล์สนับสนุนของ Cypress
    specPattern: "cypress/e2e/features/**/*.feature", // รูปแบบไฟล์ .feature
    stepDefinitions: "cypress/e2e/step_definitions/", // ที่อยู่ของ Step Definitions

    async setupNodeEvents(on, config) {
      const createEsbuildPlugin =
        require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
      const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

      // เพิ่ม Cucumber Preprocessor Plugin
      await require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin(
        on,
        config
      );

      // ตั้งค่า Preprocessor สำหรับไฟล์
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // กำหนด Task สำหรับอ่านข้อมูลจากฐานข้อมูล
      on("task", {
        READFROMDB({ sql }) {
          const client = new pg.Pool(dbConfig); // สร้าง Pool สำหรับเชื่อมต่อ
          return client
            .query(sql)
            .then((result) => {
              client.end(); // ปิดการเชื่อมต่อ
              return result.rows; // คืนค่าแถวข้อมูล
            })
            .catch((err) => {
              console.error("Database query failed:", err); // จัดการข้อผิดพลาด
              throw err; // โยนข้อผิดพลาด
            });
        },
      });

      return config; // คืนค่าการตั้งค่าของ Cypress
    },
  },
  DB: dbConfig, // ส่งออกการตั้งค่าฐานข้อมูล
});
