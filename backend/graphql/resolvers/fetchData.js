const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const { getAllSubscription } = require("../resolvers/subscription");
const nodemailer = require("nodemailer");
const MenuModal = require("../../models/menu");
const mongoose = require('mongoose');

const EMAIL_PASS = "tekykoejdjjbbsha";
const EMAIL_USER = "mcgratha@oxy.edu";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendMenuEmail = async (email, menu) => {
  const menuHtml = formatMenuAsHtml(menu);
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Weekly MP Menu - Subscribition",
    html: menuHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email to ${email}: `, error);
  }
};

const formatMenuAsHtml = (menu) => {
  let htmlContent = "<h1>Weekly Menu</h1><ul>";

  menu.forEach((day) => {
    htmlContent += `<li><h2>${day.day} (${day.date})</h2><ul>`;
    day.data.forEach((meal) => {
      htmlContent += `<li><strong>${meal.meal}</strong><ul>`;
      meal.foods.forEach((food) => {
        htmlContent += `<li>${food}</li>`;
      });
      htmlContent += "</ul></li>";
    });
    htmlContent += "</ul></li>";
  });

  htmlContent += "</ul>";
  return htmlContent;
};

const customMenu = async () => {
  try {
    // Step 1: Scrape the menu data
    const menu = await scrapeMenuData();

    // Step 2: Get the subscribed users
    const subscribedUsers = await getAllSubscription();

    if (subscribedUsers.length) {
      // Step 3: Send menu to each subscribed user
      subscribedUsers.forEach(async (user) => {
        await sendMenuEmail(user.newsEmail, menu);
      });
    }
  } catch (error) {
    console.error("Error occurred while sending menu emails: ", error);
  }
};

cron.schedule("0 8 * * 4", async () => {
  await customMenu();
});

const scrapeMenuData = async (req) => {
  const { date } = req.query;
  const existingDay = await MenuModal.findOne({ date: date });

  if (date && existingDay) {
    const menus = await MenuModal.find({});
    return menus;
  } else {
    const url =
      "https://www.oxy.edu/student-life/campus-dining/where-eat/marketplace";

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let menu = [];
    let currentDay = null;

    $("p").each((i, element) => {
      const dayTag = $(element).find("u strong");
      const mealTag = $(element).find("strong").first();

      if (dayTag.length) {
        if (currentDay) {
          menu.push(currentDay);
        }

        const dayText = dayTag.text().trim().split(",");
        currentDay = {
          day: dayText[0].trim(),
          date: dayText[1]?.trim() + ", " + dayText[2]?.trim(),
          data: [],
        };
      }

      if (!dayTag.length && mealTag.length && mealTag.text().match(/\d/)) {
        const mealName = mealTag.text().trim();
        const foodItems = $(element)
          .html()
          .split("<br>")
          .map((item) => item.trim())
          .filter((item) => item && !item.includes(mealName));

        const currentMeal = {
          meal: mealName,
          foods: foodItems,
        };

        currentDay?.data.push(currentMeal);
      }
    });

    if (currentDay) {
      menu.push(currentDay);
    }

    for (const day of menu) {
      const existingDay = await MenuModal.findOne({ date: day.date });

      if (!existingDay) {
        const newDay = new MenuModal(day);
        await newDay.save();
        console.log(`Saved menu for ${day.day}, ${day.date}`);
      } else {
        console.log(
          `Menu for ${day.day}, ${day.date} already exists in the database.`
        );
      }
    }

    return menu;
  }
};


// Ensure this connection setup runs before any database operations

// Test Email Function
const testEmailSending = async () => {
  try {
    // Mock the req object as needed for scrapeMenuData
    const req = {
      query: {
        date: new Date().toISOString().split("T")[0], // Use current date in ISO format (YYYY-MM-DD)
      },
    };

    console.log("Fetching menu data...");
    const menu = await scrapeMenuData(req); // Pass the mock req object
    const menuHtml = formatMenuAsHtml(menu);

    console.log("Sending test email...");
    await sendMenuEmail("yourtestemail@example.com", menuHtml);
    console.log("Test email sent successfully.");
  } catch (error) {
    console.error("Failed to send test email:", error);
  }
};

// Conditional Call or Scheduled Job for Test
if (process.argv.includes("--test-email")) {
  testEmailSending();
}

module.exports = { scrapeMenuData, customMenu };
