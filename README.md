# 家庭記帳本
此家庭記帳本是一個網路記帳工具，可讓使用者新增、修改與刪除支出紀錄，除了可以計算支出紀錄總金額，也可以透過支出紀錄類別來進行篩選

## 專案畫面
![register](https://github.com/aziz0916/expense-tracker/blob/main/public/images/register.png)
![login](https://github.com/aziz0916/expense-tracker/blob/main/public/images/login.png)
![Index](https://github.com/aziz0916/expense-tracker/blob/main/public/images/index.png)
![New](https://github.com/aziz0916/expense-tracker/blob/main/public/images/new.png)
![Edit](https://github.com/aziz0916/expense-tracker/blob/main/public/images/edit.png)
![Sort](https://github.com/aziz0916/expense-tracker/blob/main/public/images/sort.png)

## 專案功能
1. 使用者可以註冊帳號
   + 註冊之後，可以登入/登出
   + 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
2. 使用者可以在首頁一次瀏覽所有支出的清單
   + 使用者只能看到自己建立的資料
3. 使用者可以在首頁看到所有支出清單的總金額
4. 使用者可以新增一筆支出
5. 使用者可以編輯支出的屬性
6. 使用者可以刪除任何一筆支出
7. 使用者可以根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和
   + 選擇「家居物業」會列出「家居物業」類別的支出
   + 選擇「類別」會列出全部的支出

## 使用工具
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) 1.66.0 - 開發環境
- [Express](https://www.npmjs.com/package/express) 4.17.1 - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) 4.0.2 - 模板引擎
- [MongoDB](https://www.mongodb.com/) 4.2.17 - 資料庫
- [Mongoose](https://www.npmjs.com/package/mongoose) 6.1.6 - MongoDB 的 ODM 可以在程式中與資料庫溝通
- [method-override](https://www.npmjs.com/package/method-override) 3.0.0 - 增加除瀏覽器自帶的GET與POST以外的偽請求，增加介面語義化
- [express-session](https://www.npmjs.com/package/express-session) 1.17.1 - 儲存認證結果
- [Passport](https://www.npmjs.com/package/passport) 0.4.1 - 認證使用者
- [passport-local](https://www.npmjs.com/package/passport-local) 1.0.0 - 使用username和password方式進行身分驗證
- [connect-flash](https://www.npmjs.com/package/connect-flash) 0.1.1 - 製作系統訊息功能
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) 2.4.3 - 進行雜湊加密
- [dotenv](https://www.npmjs.com/package/dotenv) 8.2.0 - 將敏感資訊寫入環境變數

## 安裝
1. 開啟終端機(Terminal)，Clone 此專案至本機電腦

```
git clone https://github.com/aziz0916/expense-tracker.git
```
2. 進入存放此專案的資料夾

```
cd expense-tracker
```
3. 安裝 npm 套件

```
npm install
```
4. 將 .env.example 檔案名改成 .env，並將檔案中 SKIP 相關參數進行更改。
5. 引入種子資料

```
npm run seed
```
6. 測試種子資料

| Name | Email | Password |
| ------------- | :---: | -------- |
| 廣志          | user1@example.com| 12345678  |
7. 執行程式

```
npm run dev
```
