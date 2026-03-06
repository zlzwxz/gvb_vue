<template>
  <div class="game-page">
    <section class="head-card">
      <h2>小游戏中心</h2>
      <p>给游客和用户准备了轻量小游戏，打开即玩，不需要登录。</p>
    </section>

    <el-row :gutter="14">
      <el-col :xs="24" :lg="8">
        <el-card shadow="never" class="game-card">
          <template #header><strong>猜数字</strong></template>
          <p>系统会生成 1-100 的随机数，看看你几次能猜中。</p>
          <el-input-number v-model="guessValue" :min="1" :max="100" style="width: 100%" />
          <div class="actions">
            <el-button type="primary" @click="submitGuess">提交</el-button>
            <el-button @click="resetGuess">重置</el-button>
          </div>
          <div class="result">{{ guessHint }}</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card shadow="never" class="game-card">
          <template #header><strong>石头剪刀布</strong></template>
          <p>连玩几局，看看今天手气如何。</p>
          <div class="rps-actions">
            <el-button v-for="item in rpsOptions" :key="item" @click="playRps(item)">{{ item }}</el-button>
          </div>
          <div class="result">{{ rpsResult }}</div>
          <p class="score">战绩：你 {{ rpsScore.win }} 胜 / {{ rpsScore.lose }} 负 / {{ rpsScore.draw }} 平</p>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card shadow="never" class="game-card">
          <template #header><strong>记忆翻牌</strong></template>
          <p>找出全部相同图案，用时越短越好。</p>
          <div class="memory-grid">
            <button
              v-for="card in memoryCards"
              :key="card.id"
              type="button"
              class="memory-card"
              :disabled="card.matched"
              @click="flipCard(card)"
            >
              <span v-if="card.open || card.matched">{{ card.symbol }}</span>
              <span v-else>?</span>
            </button>
          </div>
          <div class="actions">
            <el-button @click="resetMemory">重新开始</el-button>
          </div>
          <div class="result">{{ memoryResult }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const guessTarget = ref(randomInt(1, 100))
const guessValue = ref(50)
const guessCount = ref(0)
const guessHint = ref('准备好就开始猜吧。')

const rpsOptions = ['石头', '剪刀', '布']
const rpsResult = ref('请选择出拳。')
const rpsScore = ref({ win: 0, lose: 0, draw: 0 })

const memorySymbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D']
const memoryCards = ref(buildMemoryCards())
const memoryResult = ref('翻开两张相同的卡片即可消除。')
const openedCards = ref([])
let memoryLock = false

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function submitGuess() {
  guessCount.value += 1
  if (guessValue.value === guessTarget.value) {
    guessHint.value = `猜中了！答案是 ${guessTarget.value}，共用了 ${guessCount.value} 次。`
    return
  }
  guessHint.value = guessValue.value > guessTarget.value ? '大了，再小一点。' : '小了，再大一点。'
}

function resetGuess() {
  guessTarget.value = randomInt(1, 100)
  guessValue.value = 50
  guessCount.value = 0
  guessHint.value = '已重置，继续挑战。'
}

function playRps(choice) {
  const bot = rpsOptions[randomInt(0, rpsOptions.length - 1)]
  if (choice === bot) {
    rpsScore.value.draw += 1
    rpsResult.value = `你出${choice}，电脑出${bot}，平局。`
    return
  }
  const win = (
    (choice === '石头' && bot === '剪刀') ||
    (choice === '剪刀' && bot === '布') ||
    (choice === '布' && bot === '石头')
  )
  if (win) {
    rpsScore.value.win += 1
    rpsResult.value = `你出${choice}，电脑出${bot}，你赢了。`
  } else {
    rpsScore.value.lose += 1
    rpsResult.value = `你出${choice}，电脑出${bot}，你输了。`
  }
}

function shuffle(arr) {
  const list = [...arr]
  for (let i = list.length - 1; i > 0; i--) {
    const j = randomInt(0, i)
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

function buildMemoryCards() {
  return shuffle(memorySymbols).map((symbol, idx) => ({
    id: `${symbol}-${idx}-${Date.now()}`,
    symbol,
    open: false,
    matched: false
  }))
}

function flipCard(card) {
  if (memoryLock || card.open || card.matched) return
  card.open = true
  openedCards.value.push(card)
  if (openedCards.value.length < 2) return

  const [a, b] = openedCards.value
  if (a.symbol === b.symbol) {
    a.matched = true
    b.matched = true
    openedCards.value = []
    if (memoryCards.value.every(item => item.matched)) {
      memoryResult.value = '恭喜，全部配对完成！'
    }
    return
  }

  memoryLock = true
  setTimeout(() => {
    a.open = false
    b.open = false
    openedCards.value = []
    memoryLock = false
  }, 650)
}

function resetMemory() {
  memoryCards.value = buildMemoryCards()
  openedCards.value = []
  memoryLock = false
  memoryResult.value = '重新开局，祝你好运。'
}
</script>

<style scoped>
.game-page {
  display: grid;
  gap: 14px;
}

.head-card {
  border: 1px solid #dce8f3;
  border-radius: 14px;
  background: #fff;
  padding: 16px;
}

.head-card h2 {
  margin: 0;
  color: #183f66;
}

.head-card p {
  margin: 8px 0 0;
  color: #6f849e;
  font-size: 13px;
}

.game-card {
  height: 100%;
}

.game-card p {
  color: #637a95;
  font-size: 13px;
  line-height: 1.7;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.result {
  margin-top: 10px;
  font-size: 13px;
  color: #1d4f78;
}

.rps-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.score {
  margin-top: 8px;
}

.memory-grid {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.memory-card {
  border: 1px solid #d9e7f2;
  border-radius: 10px;
  background: #f7fbff;
  height: 54px;
  font-size: 20px;
  font-weight: 700;
  color: #1a4d77;
  cursor: pointer;
}

.memory-card:disabled {
  cursor: default;
  opacity: 0.85;
}
</style>
