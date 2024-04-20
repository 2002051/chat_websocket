<template>

  <div class="common-layout">
    <el-container>
      <el-header style="height: 60px;background-color: #ffffff;padding: 0 50px">
        <div class="head_nav">
          <div>
            <!--             左边-->
            <h2>在线聊天系统</h2>
          </div>

          <div style="font-size: 20px">
            <!--              右边-->
            <el-dropdown>
                 <span class="el-dropdown-link" style="height: 30px;font-size: 20px;">
                   <el-avatar :size="50"
                              :src="userinfo.avator ? userinfo.avator:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"/>
                  {{ userinfo.nick ? userinfo.nick : "余天王(找不到用户名)" }}
                  <el-icon class="el-icon--right">
                    <arrow-down/>
                  </el-icon>
                </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户信息</el-dropdown-item>
                  <!--                    <el-dropdown-item disabled>Action 4</el-dropdown-item>-->
                  <el-dropdown-item divided @click="doLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

      </el-header>

      <el-container class="main">

        <!--        左侧好友列表-->
        <el-aside width="200px" style="height: calc(100vh - 61px);overflow-y: hidden;">
          <div class="item_title" style="background-color: #b7d1f5">
            <el-text class="mx-1" size="large">
              <el-button type="info" @click="doAdd">添加好友</el-button>
            </el-text>
          </div>
          <el-scrollbar height="100%">
            <!--            <div v-for="item in 20" :key="item" class="friends_item">{{ item }}</div>-->
            <div class="friends_item" v-for="item in friendList" :key="item.id" @click="doLink(item)">
              <div class="firends_detail">
                <div>
                  <el-avatar shape="square" :size="size" :src="item.avator"/>
                  <!--                  <el-avatar shape="square" :size="size" :src="url"/>-->
                </div>
                <div style="margin-left:5px ">
                  <div>
                    <el-text class="mx-1">{{ item.name }}</el-text>
                  </div>
                  <div>
                    <el-text class="mx-1" size="small">最近的一条消息......</el-text>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </el-aside>


        <!--        核心功能-->
        <el-main style="background-color: #f0f2f5;padding: 20px">

          <el-card style="max-width: 100%;height: 65%;padding-right: 20px">
            与{{ message_to ? message_to.name : "空气" }}的聊天
            <div class="indented-text-box">
              <div v-for="item in messageList" :key="item.username">
                <!--别人的消息-->
                <div style="display: flex;margin-top: 9px;margin-bottom: 9px" v-if="item.username!==userinfo.username">
                  <div>
                    <el-avatar :size="50"
                               :src="item.avator"/>
                  </div>
                  <div style="margin-left:5px">
                    <div>{{ item.username }}</div>
                    <div class="msg1">{{ item.msg }}</div>
                  </div>
                </div>
                <!--              自己的消息  -->
                <div style="display: flex;flex-direction: row-reverse;margin-top: 9px;margin-bottom: 9px;"
                     v-if="item.username===userinfo.username">
                  <div>
                    <el-avatar :size="50"
                               :src="item.avator"/>
                  </div>
                  <div style="margin-right:5px">
                    <div style="text-align: right">{{ item.username }}</div>
                    <div class="msg2">{{ item.msg }}</div>
                  </div>


                </div>
              </div>


            </div>

          </el-card>

          <el-card style="max-width: 100%;height: 30%;margin-top: 1%">
            <el-input
                v-model="msgToSend"
                style="width: 100%;"
                :rows="5"
                type="textarea"
                placeholder="输入消息"
                resize=none
            />
            <div style="width: 100%;margin-top: 10px;padding-right: 20px">
              <el-button style="float: right" type="success" round @click="doSend">发送</el-button>
            </div>

          </el-card>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!--幕布-->
  <div v-show="dialog" class="mask"></div>
  <!--  添加好友弹窗-->
  <el-dialog
      v-model="dialog"
      title="搜索好友"
      width="500"
      :before-close="kw===null"

  >
    <span>
  <el-form-item label="关键词" prop="kw">
        <el-input v-model="kw" placeholder="请输入对应用户的用户名"/>
      </el-form-item>
    </span>
    <template #footer>
      <div class="dialog-footer">

        <el-button type="primary" @click="doSearch">
          搜索
        </el-button>
      </div>

    </template>
    <div style="display: flex;width: 80%">
      <div v-for="item in searchList" style="display: flex;margin-left: 5px;margin-top: 10px">
        <el-avatar :size="50" :src="static_url + item.avator"/>
        <div>
          <div style="margin-left: 5px;">{{ item.nick }}</div>
          <el-button @click="AddFriend(item.username)" style="margin-left: 3px;margin-top: 2px" type="primary"
                     :icon="Plus" circle size="small"/>
        </div>
        <svg v-if="item.sex==='男'" t="1713601946110" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="6104" width="16" height="16">
          <path
              d="M795.189333 176.917333H682.666667a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V219.946667l-105.866667 105.866666A350.613333 350.613333 0 0 1 821.333333 554.666667c0 194.4-157.6 352-352 352S117.333333 749.066667 117.333333 554.666667s157.6-352 352-352a350.538667 350.538667 0 0 1 221.6 78.506666l104.256-104.256zM469.333333 842.666667c159.061333 0 288-128.938667 288-288S628.394667 266.666667 469.333333 266.666667 181.333333 395.605333 181.333333 554.666667s128.938667 288 288 288z"
              fill="#000000" p-id="6105"></path>
        </svg>
        <svg v-if="item.sex==='女'" t="1713602041117" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2519" width="16" height="16">
          <path
              d="M485.333333 768v-43.765333C321.077333 710.688 192 573.088 192 405.333333 192 228.597333 335.264 85.333333 512 85.333333c176.736 0 320 143.264 320 320 0 164.106667-123.52 299.349333-282.666667 317.845334V768H640a32 32 0 0 1 0 64h-90.666667v77.333333a32 32 0 0 1-64 0V832H384a32 32 0 0 1 0-64h101.333333zM512 661.333333c141.386667 0 256-114.613333 256-256S653.386667 149.333333 512 149.333333 256 263.946667 256 405.333333s114.613333 256 256 256z"
              fill="#d4237a" p-id="2520"></path>
        </svg>
      </div>

    </div>
  </el-dialog>

</template>

<script setup>
import {ArrowDown, Plus} from '@element-plus/icons-vue'
import {ref, onMounted, onBeforeMount} from "vue"
import {useRouter, useRoute} from "vue-router";
import {userInfoStore} from "@/stores/counter.js";
import {ElMessage} from "element-plus";
import {Setting, User} from '@element-plus/icons-vue'
import _axios from "@/plugins/axios.js";
import {static_url, wb_url} from "@/plugins/config.js";
import {useCookies} from "vue3-cookies";


// import {useCookies} from "vue3-cookies"
const kw = ref("") // 搜索关键词
const searchList = ref([])
const username = ref("")
const router = useRouter()
const route = useRoute()
const userinfo = ref({})
const friendList = ref([])
const url = ref("https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png")
const msgToSend = ref("")
const message_to = ref(friendList ? friendList[0] : null) // 正在聊天的对象的用户信息
const messageList = ref([])  // 临时消息记录
const dialog = ref(false)
let ws = null
onBeforeMount(function (e) {
  let store = userInfoStore()
  let jwt_token = store.token
  console.log(jwt_token)
  let headers = {token: jwt_token}
  // 发送请求获取当前登录用户的详细信息
  _axios.get("/chat/userinfo/", {
    headers: {
      "token": jwt_token
    }
  }).then(function (res) {
    // 将用户信息存到cookie中
    if (res.data.code === 0) {
      let info = res.data.data
      info.avator = static_url + info.avator
      store.doSaveInfo(info)
      userinfo.value = info
      console.log("userinfo", userinfo)
    } else {
      ElMessage.error('身份失效,重新登录')
    }
  })

  // 发送请求 获取好友列表
  _axios.get("/chat/friends/", {
    headers: {
      "token": jwt_token
    }
  }).then(function (res) {
    console.log("获取好友信息", res)
    if (!!res.data.data.length) {
      // console.log("处理好友数据", static_url)
      friendList.value = res.data.data.map((x) => {
        let updatedItem = {};
        let selfId = userinfo.value.id
        let Userobj = x.User1.id === selfId ? x.User2 : x.User1
        console.log("好友",Userobj)
        updatedItem.id = Userobj.id
        updatedItem.name = Userobj.nick
        updatedItem.avator = static_url + Userobj.avator
        return updatedItem
      })


    } else {
      console.log("没有好友")

    }
  })
})

function doLink(item) {
  message_to.value = item;
  // 建立wbsocket协议

  let store = userInfoStore()
  console.log("当前用户", store.userDict)
  console.log('建立websocket:', item)
  if (!!ws) {
    // ws 已存在，则断开前一个连接
    ws.close()
  }
  // let url = store.userDict.id<item.id? `/wbchat/${store.userDict.id}/${item.id}/?sender=${store.userDict.id}`:`/wbchat/${item.id}/${store.userDict.id}/?sender=${store.userDict.id}`
  let url = store.userDict.id < item.id ? `/wbchat/${store.userDict.id}/${item.id}/` : `/wbchat/${item.id}/${store.userDict.id}/`
  ws = new WebSocket("ws://" + wb_url + url);
  ws.onopen = onopen
  ws.onmessage = onmessage
  ws.onclose = onclose
}


function doAdd() {
  dialog.value = true
}

function doSearch() {
  _axios.get(`/chat/userinfo/search/?kw=${kw.value}`).then(function (res) {
    console.log(res)
    if (res.data.code === 0) {
      if (res.data.data.length === 0) {
        ElMessage.warning('没有找到')
        return
      }
      searchList.value = res.data.data
      console.log("searchList.value ", searchList.value)
      ElMessage.success('查找成功')
    } else {
      ElMessage.error('查找异常')
    }
  })
  kw.value = ""

}

function AddFriend(username) {
  let store = userInfoStore()
  let jwt_token = store.token
  _axios.post("/chat/friends/", {User2: username}, {
    headers: {
      "token": jwt_token
    }
  }).then(function (res) {
    if (res.data.data.status === 0) {
      ElMessage.warning("此人已经是你的好友")
    } else if (res.data.data.status === 1) {
      // 请求成功
      console.log("成功", res)
      let obj = res.data.data.data
      let selfId = userinfo.value.id
      let Userobj = obj.User1.id === selfId ? obj.User2 : obj.User1
      let new_friend = {}
      new_friend.id = Userobj.id
      new_friend.name = Userobj.nick
      new_friend.avator = static_url +  Userobj.avator
      friendList.value.push(new_friend)

      ElMessage.success(`成功添加${new_friend.nick}为好友`)
    } else {
      ElMessage.error("请求异常")
    }
  })
}

function onopen(event) {
  console.log("连接成功")
}

function onmessage(event) {
  let res = JSON.parse(event.data)
  res.avator = static_url + res.avator
  let msgObj = {
    ...res
  }
  messageList.value.push(msgObj)  // 消息压入消息队列中
  console.log("event", event)
  console.log("有人发送了消息", messageList.value)

}

function onclose(event) {
  return

}


function doLogout() {
  // 注销
  let store = userInfoStore()
  store.Logout()
  ElMessage({
    message: '注销成功!',
    type: 'success',
  })
  router.push({name: "login"})

}

function doSend() {
  if (!ws) {
    ElMessage.error('和空气你都想聊天？？')
    return
  }
  if (!msgToSend.value) {
    ElMessage.error('请输入消息内容')
    return
  }
  let uid = userinfo.value.id
  let text = JSON.stringify({[uid]: msgToSend.value})
  ws.send(text)
  msgToSend.value = ""
}


</script>
<style>
body {
  margin: 0;
  border-radius: 20px;
}

.head_nav {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: auto;
}

.main {
  /*100vh表示可见窗口的百分之一百*/
  height: calc(100vh - 50px);
}

.white > * {
  color: white;
}

.friends_item {
  height: 60px;
  background-color: #dedddc;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;

}

.friends_item:hover {
  height: 60px;
  background-color: #d0cfcf;
}

.item_title {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.firends_detail {
  display: flex;
  flex-direction: row;
}

.indented-text-box {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: inset 4px 4px 8px #cbcbcb, inset -4px -4px 8px #ffffff, inset -4px 4px 8px #cbcbcb, inset 4px -4px 8px #ffffff;
  overflow: auto; /* Add scrollbar if content overflows */
}

.msg1 {
  color: #000000;
  background-color: #f5f5f5;
  max-width: 500px;
  overflow-x: auto; /* 水平方向溢出自动换行 */
  overflow-y: hidden; /* 垂直方向溢出隐藏 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}

.msg2 {
  color: #ffffff;
  background-color: #89d961;
  max-width: 500px;
  overflow-x: auto; /* 水平方向溢出自动换行 */
  overflow-y: hidden; /* 垂直方向溢出隐藏 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.8;
  z-index: 998;
}

</style>

