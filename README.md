# 個人數位助理

使用說明：
* 記事
    * 在上方輸入待辦事項 Input 輸入後按下 Enter 即可紀錄，在列表中左方 Icon 為是否完成狀態，填滿代表已完成，反之則未完成，可透過編輯與刪除 Button 進行編輯刪除，刪除時不會進行確定動作，請留意。
* 記帳
    * 包含首頁、項目、記帳、紀錄頁面，首頁以 Chart.js 顯示出當月的記帳圖表，用於快速了解當月支出結構，記帳前需在項目登陸項目才能進行記帳，目的是快速記帳，記帳使用登陸項目時提供的編號進行登記，輸入編號與日期送出後即可記帳，紀錄可查看過往所有紀錄，以上三個頁面均有排序功能。
使用技術：React、Redux、Material UI、Chart.js
後端 API：Node.js 自架

## 檔案架構

鑒於原本未採用 Redux，且頁面不多，故一開始設計時並未為每個頁面建立資料夾。
<pre>
component（通用 component）
|-- btn.js
|-- form.js
|-- nav.js
|-- table.js
|-- task.js
|-- theme.js
頁面 component、頁面 slice
index.css
</pre>

### 通用（index.js、api.js、init.js、store.js、component/btn.js、component/form.js、component/nav.js、component/table.js、component/theme.js）

* index
    * 根據對應 path 導向各頁面
* api
    * axios 接收 API 之設定，對 RESTful api 的四種方法進行初步設定
* init
    * 早期開發 view 時使用的假資料，現未使用
* store
    * 在 Redux 中註冊各個 slice
* btn
    * 早期用於切換模式時切換背景顏色，並根據 localStorage 在網站開啟時自動切換至上次使用的主題，現搬移至 theme.js 中
* form
    * 存放各種會運用在 form 的 component
* nav
    * 網站的 nav，根據裝置將 nav 收至 menu icon button 中，包含切換模式的 switch
* table
    * 存放 table component，擁有排序、分頁功能
* theme
    * 客製 MUI 主題設定檔，留有早期使用 Emotion styled component 的設定，現未使用 Emotion styled component

### 首頁（dashboard.js）

圖表初始設定，接收 itemSlice、accountingSlice 變數，將 accountingSlice 接收 API 所獲得的項目編號、金額在 itemSlice API 獲得的項目類別組合，回傳給 Chart.js 產生出圖表

### 記事（note.js、noteSlice.js、component/task.js）

* task
    * 記事列表 component，根據 edit state 是否為 true 呈現編輯中的 view 或一般的 view
* note
    * 組合輸入待辦事項的 Input、Filter button 與 task component 呈現出的頁面，根據所需要的 state 使用 query params 進行查詢，僅返回所需要的資料
* noteSlice
    * 託管 note 頁面所使用的 state，部分 state 牽扯到個別顯示問題，故不在這

### 項目（item.js、itemSlice.js）

* item
    * 組合 form、table component 呈現出的頁面
* itemSlice
    * 同記事中的 noteSlice

### 記帳（accounting.js、accountingSlice.js）

* accounting
    * 組合 form、table component 呈現出的頁面，根據所需要的 state 使用 query params 進行查詢，僅返回當月資料
* accountingSlice
    * 同記事中的 noteSlice

### 紀錄（record.js）

* record
    * 組合 form、table component 呈現出的頁面
