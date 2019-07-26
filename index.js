const puppeteer = require('puppeteer');
const schedule = require('node-schedule');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const logURL = '';
const loginIndex = Math.floor(Math.random() * 21);
let startTime = new Date();
let endTime = new Date(config.endTime.year, config.endTime.month, config.endTime.day, config.endTime.hour, 0, 0);

const login = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(logURL);
  await page.type('#card_number', '180930975')
  await page.click('#btn_cardNumber')
  await page.waitForSelector('#check_in');
  await page.click('#check_in');
  await browser.close();
};

const logout = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(logURL);
  await page.type('#card_number', '180930975')
  await page.click('#btn_cardNumber')
  await page.waitForSelector('#check_out');
  await page.click('#check_out');
  await browser.close();
}

const loginSchedule = () => {
  schedule.scheduleJob({
    start: startTime,
    endTime: endTime,
    rule: config.schedule.login[loginIndex]
  }, () => {
    let now = new Date();
    let loginLog = `${now} login successed! /r/n`;
    try {
      login();
      fs.appendFileSync('log.txt', loginLog)
    } catch (error) {
      let loginErrorLog = `${now} - ${logURL} login failed: ${error.message}! /r/n`;
      fs.appendFileSync('log.txt', loginErrorLog)
      throw error
    }
  })
}

const logoutSchedule = () => {
  schedule.scheduleJob({
    start: startTime,
    endTime: endTime,
    rule: config.schedule.logout
  }, async () => {
    let now = new Date();
    let logoutLog = `${now} - ${logURL} logout successed! \r\n`
    try {
      await logout();
      fs.appendFileSync('log.txt', logoutLog)
    } catch (error) {
      let logoutErrorLog = `${now} login failed: ${error.message}! \r\n`;
      fs.appendFileSync('log.txt', logoutErrorLog)
      throw error;
    }
  })
}

const init = () => {
  loginSchedule();
  logoutSchedule();
};

init();