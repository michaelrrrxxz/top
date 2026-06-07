<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
//test
import {
  Crown,
  Calendar,
  User,
  Users,
  Mountain
} from 'lucide-vue-next'

/* APIs */
const ISABUHAY_API = import.meta.env.VITE_ISABUHAY_API
const DOSPOR2_API = import.meta.env.VITE_DOSPOR2_API
const LANGITLUPA_API = import.meta.env.VITE_LANGIT_LUPA_API

/* TYPES */
interface Champion {
  Year: string
  Champion: string
}

type SortKey = 'Champion' | 'Year'
type SortDir = 'asc' | 'desc'

type TabType =
  | 'isabuhay'
  | 'dospor2'
  | 'langitlupa'

/* STATE */
const loading = ref(true)
const error = ref('')

const activeTab = ref<TabType>('isabuhay')

const search = ref('')

const sortKey = ref<SortKey>('Year')
const sortDir = ref<SortDir>('desc')

const isabuhay = ref<Champion[]>([])
const dospor2 = ref<Champion[]>([])
const langitlupa = ref<Champion[]>([])

/* LOAD */
async function load() {

  loading.value = true

  try {

    /* ISABUHAY */
    const isabuhayRes = await axios.get(ISABUHAY_API)

    isabuhay.value = isabuhayRes.data
      .slice(1)
      .filter((i: any) => i["December 25, 2025"])
      .map((i: any) => ({
        Year: i["Last Updated"],
        Champion: i["December 25, 2025"],
      }))

    /* DOS POR DOS */
    const dospor2Res = await axios.get(DOSPOR2_API)

    dospor2.value = dospor2Res.data
      .slice(1)
      .filter((i: any) => i["December 31, 2024"])
      .map((i: any) => ({
        Year: i["Last Updated"],
        Champion: i["December 31, 2024"],
      }))

    /* LANGIT LUPA */
    const langitRes = await axios.get(LANGITLUPA_API)

    langitlupa.value = langitRes.data
      .slice(1)
      .filter((i: any) => i["December 31, 2024"])
      .map((i: any) => ({
        Year: i["Last Updated"],
        Champion: i["December 31, 2024"],
      }))

  } catch (e: any) {

    error.value =
      e?.message ||
      'Failed to load champions.'

  } finally {

    loading.value = false

  }
}

onMounted(load)

/* SORT */
function setSort(key: SortKey) {

  if (sortKey.value === key) {

    sortDir.value =
      sortDir.value === 'asc'
        ? 'desc'
        : 'asc'

  } else {

    sortKey.value = key

    sortDir.value =
      key === 'Champion'
        ? 'asc'
        : 'desc'
  }
}

/* FILTER + SORT */
function sortList(list: Champion[]) {

  const q = search.value
    .trim()
    .toLowerCase()

  let filtered = list

  if (q) {

    filtered = filtered.filter(c =>
      c.Champion
        .toLowerCase()
        .includes(q)
    )
  }

  return [...filtered].sort((a, b) => {

    let av: any
    let bv: any

    if (sortKey.value === 'Champion') {

      av = a.Champion.toLowerCase()
      bv = b.Champion.toLowerCase()

    } else {

      av = Number(a.Year)
      bv = Number(b.Year)

    }

    if (av < bv)
      return sortDir.value === 'asc'
        ? -1
        : 1

    if (av > bv)
      return sortDir.value === 'asc'
        ? 1
        : -1

    return 0
  })
}

/* ACTIVE LIST */
const activeList = computed(() => {

  if (activeTab.value === 'dospor2') {
    return sortList(dospor2.value)
  }

  if (activeTab.value === 'langitlupa') {
    return sortList(langitlupa.value)
  }

  return sortList(isabuhay.value)
})

/* SORT BUTTONS */
const sortButtons = [
  {
    key: 'Champion',
    label: 'CHAMPION',
    icon: User,
  },
  {
    key: 'Year',
    label: 'YEAR',
    icon: Calendar,
  },
] as const
</script>

<template>
  <div>

    <!-- HEADER -->
    <h1 class="standings-heading">
      CHAMPIONS
    </h1>

    <div class="ft-divider"></div>

    <!-- TABS -->
    <div class="champ-tabs">

      <button
        class="champ-tab"
        :class="{ active: activeTab === 'isabuhay' }"
        @click="activeTab = 'isabuhay'"
      >
        <Crown :size="14" />
        ISABUHAY
      </button>

      <button
        class="champ-tab"
        :class="{ active: activeTab === 'dospor2' }"
        @click="activeTab = 'dospor2'"
      >
        <Users :size="14" />
        DOS POR DOS
      </button>

      <button
        class="champ-tab"
        :class="{ active: activeTab === 'langitlupa' }"
        @click="activeTab = 'langitlupa'"
      >
        <Mountain :size="14" />
        LANGIT LUPA
      </button>

    </div>

    <!-- CONTROLS -->
    <div class="ft-controls">

      <!-- SEARCH -->
      <!-- <div class="ft-search-wrap">

        <Search
          class="ft-search-icon"
          :size="15"
        />

        <input
          v-model="search"
          class="ft-search"
          placeholder="SEARCH CHAMPION..."
        />

      </div> -->

      <!-- SORT -->
      <div class="ft-filter-group">

        <button
          v-for="btn in sortButtons"
          :key="btn.key"
          class="ft-filter-btn"
          :class="{
            active: sortKey === btn.key
          }"
          @click="setSort(btn.key)"
        >

          <component
            :is="btn.icon"
            :size="14"
            class="btn-icon"
          />

          {{ btn.label }}

          <span v-if="sortKey === btn.key">
            {{ sortDir === 'asc' ? '↑' : '↓' }}
          </span>

        </button>

      </div>

    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="standings-table-wrap"
    >
      Loading...
    </div>

    <!-- ERROR -->
    <div
      v-else-if="error"
      class="ft-error"
    >
      {{ error }}
    </div>

    <!-- TABLE -->
    <div
      v-else
      class="standings-table-wrap"
    >

      <table class="standings-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Champion</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="(champ, i) in activeList"
            :key="champ.Year"
            class="data-row"
          >

            <td>
              {{ i + 1 }}
            </td>

            <td class="champion-cell">

              <component
                :is="
                  activeTab === 'dospor2'
                    ? Users
                    : activeTab === 'langitlupa'
                    ? Mountain
                    : Crown
                "
                :size="14"
                class="champion-icon"
              />

              {{ champ.Champion }}

            </td>

            <td>
              {{ champ.Year }}
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<style scoped>
/* TABS */
.champ-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.champ-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  padding: 0.6rem 1rem;

  background: var(--dark2);
  border: 1px solid var(--dark3);

  color: var(--muted);

  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;

  cursor: pointer;
  transition: 0.2s;
}

.champ-tab:hover {
  border-color: var(--gold);
  color: var(--white);
}

.champ-tab.active {
  border-color: var(--gold);
  background: rgba(255,215,0,0.08);
  color: var(--gold);
}

/* TABLE */
.champion-cell {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.champion-icon {
  color: gold;
  flex-shrink: 0;
}
</style>