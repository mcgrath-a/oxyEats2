const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const { getAllSubscription } = require("../resolvers/subscription");
const nodemailer = require("nodemailer");
const MenuModal = require("../../models/menu");


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
    subject: "Weekly MP Menu - Subscription",
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

const getSevenDaysMenu = async () => {
  let lastSevenRecords = await MenuModal.find({});
  lastSevenRecords = lastSevenRecords.reverse();
  lastSevenRecords = lastSevenRecords.slice(0, 7);
  return lastSevenRecords.reverse();
};

const customMenu = async () => {
  try {
    // Step 1: Scrape the menu data
    const menu = await getSevenDaysMenu();

    // Step 2: Get the subscribed users
    const subscribedUsers = await getAllSubscription();

    if (subscribedUsers.length) {
      // Step 3: Send menu emails to all subscribed users
      const emailPromises = subscribedUsers.map((user) =>
        sendMenuEmail(user.newsEmail, menu).catch((error) => {
          console.error(
            `Failed to send email to ${user.newsEmail}:`,
            error.message
          );
        })
      );

      // Wait for all email operations to complete
      const results = await Promise.allSettled(emailPromises);

      // Optional: Log the results summary
      const successCount = results.filter(
        (result) => result.status === "fulfilled"
      ).length;
      const failedCount = results.filter(
        (result) => result.status === "rejected"
      ).length;

      console.log(
        `Email process completed: ${successCount} succeeded, ${failedCount} failed.`
      );
    }
  } catch (error) {
    console.error("Error occurred while sending menu emails: ", error);
  }
};

cron.schedule("0 1 * * 2", async () => {
  // monday at 1 AM
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
      "https://www.oxy.edu/student-life/campus-dining/where-eat/marketplace/next-weeks-marketplace-menu";

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

    const menusData = await MenuModal.find({});
    return menusData;
  }
};

module.exports = { scrapeMenuData, customMenu };
