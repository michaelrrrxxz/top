<template>
    <div>
        <h1 class="standings-heading">STANDINGS <span>1 on 1</span></h1>
        <div class="ft-divider"></div>

        <!-- ══ CONTROLS ══ -->
        <div class="ft-controls">

            <!-- Search -->
            <!-- <div class="ft-search-wrap">
        <Search class="ft-search-icon" :size="1" />
        <input
          v-model="filters.search"
          class="ft-search"
          placeholder="SEARCH EMCEE..."
          autocomplete="off"
          spellcheck="false"
        />
        <button v-if="filters.search" class="ft-search-clear" @click="filters.search = ''">
          <X :size="12" />
        </button>
      </div> -->

            <!-- Sort buttons -->
            <div class="ft-filter-group">
                <button v-for="btn in sortButtons" :key="btn.key" class="ft-filter-btn" :class="{
                    'active': sortKey === btn.key && btn.color === 'red',
                    'active-gold': sortKey === btn.key && btn.color === 'gold',
                }" @click="setSort(btn.key)">
                    <component :is="btn.icon" :size="13" class="btn-icon" />
                    {{ btn.label }}
                    <span v-if="sortKey === btn.key" class="sort-arrow">
                        {{ sortDir === 'asc' ? '↑' : '↓' }}
                    </span>
                </button>
            </div>

            <!-- Advanced filter toggle -->
            <button class="ft-filter-btn ft-advanced-toggle"
                :class="{ 'active-gold': showAdvanced || hasActiveAdvanced }" @click="showAdvanced = !showAdvanced">
                <SlidersHorizontal :size="13" />
                FILTERS
                <span v-if="hasActiveAdvanced" class="filter-badge">
                    {{ activeAdvancedCount }}
                </span>
                <ChevronDown :size="12" :class="['chevron', { rotated: showAdvanced }]" />
            </button>
        </div>

        <!-- ══ ADVANCED FILTER PANEL ══ -->
        <Transition name="panel">
            <div v-if="showAdvanced" class="adv-panel">
                <div class="adv-panel-inner">

                    <!-- Min Battles -->
                    <div class="adv-field">
                        <label class="adv-label">
                            <Swords :size="11" />
                            MIN BATTLES
                            <span class="adv-value">{{ filters.minBattles }}</span>
                        </label>
                        <div class="range-wrap">
                            <input type="range" v-model.number="filters.minBattles" :min="0" :max="maxBattlesInData"
                                class="ft-range" />
                            <div class="range-track-fill"
                                :style="{ width: rangePercent(filters.minBattles, 0, maxBattlesInData) }"></div>
                        </div>
                    </div>

                    <!-- Min Wins -->
                    <div class="adv-field">
                        <label class="adv-label">
                            <Trophy :size="11" />
                            MIN WINS
                            <span class="adv-value">{{ filters.minWins }}</span>
                        </label>
                        <div class="range-wrap">
                            <input type="range" v-model.number="filters.minWins" :min="0" :max="maxWinsInData"
                                class="ft-range" />
                        </div>
                    </div>

                    <!-- Max Losses -->
                    <div class="adv-field">
                        <label class="adv-label">
                            <Skull :size="11" />
                            MAX LOSSES
                            <span class="adv-value">{{ filters.maxLosses === null ? 'ANY' : filters.maxLosses }}</span>
                        </label>
                        <div class="range-wrap">
                            <input type="range" v-model.number="maxLossesProxy" :min="0" :max="maxLossesInData + 1"
                                class="ft-range ft-range-red" />
                        </div>
                        <span class="adv-hint">Drag to rightmost = no cap</span>
                    </div>

                    <!-- Min Win Rate -->
                    <div class="adv-field">
                        <label class="adv-label">
                            <BarChart3 :size="11" />
                            MIN WIN RATE
                            <span class="adv-value">{{ filters.minWinRate }}%</span>
                        </label>
                        <div class="range-wrap">
                            <input type="range" v-model.number="filters.minWinRate" :min="0" :max="100" :step="5"
                                class="ft-range ft-range-gold" />
                        </div>
                    </div>

                    <!-- Reset -->
                    <button v-if="hasActiveFilters" class="ft-filter-btn adv-reset" @click="resetFilters">
                        <RotateCcw :size="12" /> RESET ALL
                    </button>

                </div>
            </div>
        </Transition>

        <!-- ══ RESULTS META ══ -->
        <div v-if="!loading" class="results-meta">
            <span class="results-count">
                {{ filtered.length }}
                <span class="results-label">{{ filtered.length === 1 ? 'emcee' : 'emcees' }}</span>
            </span>
            <span v-if="hasActiveFilters" class="results-filtered">· filtered</span>
        </div>

        <!-- ══ SKELETON ══ -->
        <div v-if="loading" class="standings-table-wrap">
            <table class="standings-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Emcee</th>
                        <th>W</th>
                        <th>L</th>
                        <th>Battles</th>
                        <th>Win Rate</th>
                        <th>Overall</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="n in 8" :key="n" class="skeleton-row">
                        <td>
                            <div class="skel skel-sm"></div>
                        </td>
                        <td>
                            <div class="skel skel-name"></div>
                        </td>
                        <td>
                            <div class="skel skel-sm"></div>
                        </td>
                        <td>
                            <div class="skel skel-sm"></div>
                        </td>
                        <td>
                            <div class="skel skel-sm"></div>
                        </td>
                        <td>
                            <div class="skel skel-bar"></div>
                        </td>
                        <td>
                            <div class="skel skel-bar"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- ══ ERROR ══ -->
        <div v-else-if="error" class="ft-error">
            <AlertTriangle :size="18" />
            {{ error }}
        </div>

        <!-- ══ TABLE ══ -->
        <div v-else class="standings-table-wrap">
            <table class="standings-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Emcee</th>
                        <th style="text-align:center">W</th>
                        <th style="text-align:center">L</th>
                        <th style="min-width:100px">Win Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="filtered.length">
                        <tr v-for="(emcee, i) in filtered" :key="emcee.Name" class="data-row">
                            <!-- Rank -->
                            <td class="rank-cell">
                                <span v-if="i === 0 && !hasActiveFilters" class="rank-crown">1</span>
                                <span v-else>{{ i + 1 }}</span>
                            </td>

                            <!-- Name -->
                            <td class="emcee-cell">
                                {{ emcee.Name }}

                            </td>

                            <td class="win-cell">{{ emcee.Win }}</td>
                            <td class="loss-cell">{{ emcee.Loss }}</td>
                            <!-- <td class="stat-cell">{{ emcee.Total }}</td> -->

                            <!-- Win Rate bar -->
                            <td class="winrate-cell">
                                <div class="winrate-bar-wrap">
                                    <div class="winrate-bar">
                                        <div class="winrate-bar-fill" :style="{
                                            width: rawRate(emcee) + '%',
                                            background: winRateColor(rawRate(emcee)),
                                        }"></div>
                                    </div>
                                    <span class="winrate-label" :style="{ color: winRateColor(rawRate(emcee)) }">
                                        {{ rawRate(emcee) }}%
                                    </span>
                                </div>
                            </td>

                            <!-- Overall score -->

                        </tr>
                    </template>

                    <tr v-else class="no-results">
                        <td colspan="7">
                            <div class="no-results-inner">
                                <span class="no-results-icon">🎤</span>
                                NO EMCEE FOUND
                                <span v-if="filters.search" class="no-results-query">· "{{ filters.search }}"</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
    Search, X, SlidersHorizontal, ChevronDown,
    Trophy, Skull, BarChart3, RotateCcw,
    AlertTriangle, Swords,
} from 'lucide-vue-next'

import { useStandings } from '@/composables/1on1'

/* ── composable ── */
const {
    loading, error,
    sortKey, sortDir, filters,
    filtered, hasActiveFilters,
    maxBattlesInData, maxWinsInData, maxLossesInData,
    load, setSort, resetFilters,
    rawRate, winRateColor, overallScore,
} = useStandings()

onMounted(load)

/* ── sort button config ── */
const sortButtons = [
    { key: 'Name', label: 'NAME', icon: Search, color: 'gold' },
    { key: 'Win', label: 'WINS', icon: Trophy, color: 'red' },
    { key: 'Loss', label: 'LOSSES', icon: Skull, color: 'red' },
    { key: 'winRate', label: 'WIN RATE', icon: BarChart3, color: 'gold' },
    { key: 'overall', label: 'OVERALL', icon: BarChart3, color: 'gold' },
] as const

/* ── advanced panel ── */
const showAdvanced = ref(false)

const hasActiveAdvanced = computed(() =>
    filters.value.minBattles > 0 ||
    filters.value.minWins > 0 ||
    filters.value.maxLosses !== null ||
    filters.value.minWinRate > 0
)

const activeAdvancedCount = computed(() => [
    filters.value.minBattles > 0,
    filters.value.minWins > 0,
    filters.value.maxLosses !== null,
    filters.value.minWinRate > 0,
].filter(Boolean).length)

/* maxLosses proxy: rightmost position = null (no cap) */
const maxLossesProxy = computed({
    get() {
        return filters.value.maxLosses === null
            ? maxLossesInData.value + 1
            : filters.value.maxLosses
    },
    set(v: number) {
        filters.value.maxLosses = v > maxLossesInData.value ? null : v
    },
})

/* ── overall score normalised to % for bar ── */
const maxOverall = computed(() =>
    Math.max(1, ...filtered.value.map(b => overallScore(b)))
)

const overallPercent = (b: any) =>
    Math.round((overallScore(b) / maxOverall.value) * 100) + '%'

/* ── range helper ── */
const rangePercent = (val: number, min: number, max: number) =>
    max === 0 ? '0%' : Math.round(((val - min) / (max - min)) * 100) + '%'
</script>

<style scoped>
/* ── Advanced panel transition ── */
.panel-enter-active,
.panel-leave-active {
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
    overflow: hidden;
}

.panel-enter-from,
.panel-leave-to {
    max-height: 0;
    opacity: 0;
}

.panel-enter-to,
.panel-leave-from {
    max-height: 400px;
    opacity: 1;
}

/* ── Advanced panel ── */
.adv-panel {
    position: relative;
    z-index: 1;
    margin-bottom: 1.25rem;
}

.adv-panel-inner {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem 1.5rem;
    background: var(--dark2);
    border: 1px solid var(--dark3);
    border-left: 3px solid var(--gold-dark);
    border-radius: 2px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.adv-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.adv-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    text-transform: uppercase;
}

.adv-value {
    margin-left: auto;
    color: var(--gold);
    font-size: 0.75rem;
    font-weight: 700;
}

.adv-hint {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    color: rgba(136, 136, 128, 0.5);
    letter-spacing: 0.06em;
    margin-top: -0.25rem;
}

/* Range input */
.range-wrap {
    position: relative;
}

.ft-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: var(--dark3);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
}

.ft-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--white);
    border: 2px solid var(--gold);
    box-shadow: 0 0 6px var(--gold-glow);
    cursor: pointer;
    transition: transform 0.15s;
}

.ft-range::-webkit-slider-thumb:hover {
    transform: scale(1.25);
}

.ft-range-red::-webkit-slider-thumb {
    border-color: var(--red);
    box-shadow: 0 0 6px var(--red-glow);
}

.ft-range-gold::-webkit-slider-thumb {
    border-color: var(--gold);
    box-shadow: 0 0 6px var(--gold-glow);
}

/* ── Advanced toggle badge ── */
.filter-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--gold);
    color: var(--black);
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    line-height: 1;
}

/* Chevron rotation */
.chevron {
    transition: transform 0.25s ease;
}

.chevron.rotated {
    transform: rotate(180deg);
}

/* Reset button */
.adv-reset {
    align-self: end;
    margin-top: auto;
    grid-column: 1 / -1;
    justify-self: start;
    border-left-color: var(--red) !important;
    color: var(--red) !important;
    font-size: 0.85rem !important;
    padding: 0.35rem 0.9rem !important;
}

/* ── Results meta ── */
.results-meta {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
}

.results-count {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--gold);
    line-height: 1;
}

.results-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
    margin-left: 3px;
}

.results-filtered {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: var(--red);
    text-transform: uppercase;
}

/* ── Skeleton ── */
.skeleton-row td {
    padding: 0.85rem 1.2rem;
}

.skel {
    border-radius: 3px;
    background: linear-gradient(90deg,
            var(--dark3) 25%,
            rgba(255, 255, 255, 0.06) 50%,
            var(--dark3) 75%);
    background-size: 400% 100%;
    animation: shimmer 1.6s infinite;
    height: 13px;
}

.skel-sm {
    width: 28px;
    margin: 0 auto;
}

.skel-name {
    width: 120px;
}

.skel-bar {
    width: 110px;
    height: 5px;
    margin: 4px 0;
}

@keyframes shimmer {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

/* ── Error ── */
.ft-error {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--red);
    letter-spacing: 0.1em;
    padding: 1.5rem 0;
}

/* ── Row entrance ── */
.data-row {
    animation: rowIn 0.25s ease both;
}

.data-row:nth-child(1) {
    animation-delay: 0.03s;
}

.data-row:nth-child(2) {
    animation-delay: 0.06s;
}

.data-row:nth-child(3) {
    animation-delay: 0.09s;
}

.data-row:nth-child(4) {
    animation-delay: 0.12s;
}

.data-row:nth-child(5) {
    animation-delay: 0.15s;
}

.data-row:nth-child(6) {
    animation-delay: 0.18s;
}

.data-row:nth-child(7) {
    animation-delay: 0.21s;
}

.data-row:nth-child(8) {
    animation-delay: 0.24s;
}

.data-row:nth-child(9) {
    animation-delay: 0.27s;
}

.data-row:nth-child(10) {
    animation-delay: 0.30s;
}

@keyframes rowIn {
    from {
        opacity: 0;
        transform: translateX(-6px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* ── Rank crown ── */
.rank-crown {
    font-size: 1rem;
    display: block;
    text-align: center;
}

/* ── Emcee cell with inline badge ── */
.emcee-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

/* ── Overall column ── */
.overall-cell {
    min-width: 130px;
}

.overall-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.overall-score {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--muted);
    min-width: 32px;
}

.overall-bar {
    flex: 1;
    height: 4px;
    background: var(--dark3);
    border-radius: 2px;
    overflow: hidden;
}

.overall-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--red-dark), var(--gold));
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── No results ── */
.no-results td {
    padding: 3rem 1rem !important;
}

.no-results-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    color: var(--muted);
    text-transform: uppercase;
}

.no-results-icon {
    font-size: 1.1rem;
}

.no-results-query {
    color: var(--red);
}

/* ── Search clear button ── */
.ft-search-clear {
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    padding: 3px;
    line-height: 1;
    display: flex;
    align-items: center;
    transition: color 0.15s;
}

.ft-search-clear:hover {
    color: var(--red);
}

/* ── Responsive ── */
@media (max-width: 640px) {
    .adv-panel-inner {
        grid-template-columns: 1fr;
    }
}
</style>