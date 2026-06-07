<template>
  <div class="ft-app">
    <div class="noise-overlay"></div>

    <header class="ft-header">
      <div class="header-bg-glow"></div>
      <div class="header-content">
        <div class="logo-block">
          <span class="logo-text">Flip<span class="logo-accent">Top</span></span>
          <span class="logo-sub">FIRST FILIPINO RAP BATTLE LEAGUE</span>
        </div>
        <nav class="ft-nav">
          <router-link to="/1on1" class="nav-link">
            <span class="nav-label">1 <span class="nav-vs">on</span> 1</span>
          </router-link>
          <router-link to="/2on2" class="nav-link">
            <span class="nav-label">2 <span class="nav-vs">on</span> 2</span>
          </router-link>
          <router-link to="/champions" class="nav-link">
            <span class="nav-label"> <span class="nav-vs"> <Crown :size="14" /></span> </span>
          </router-link>
        </nav>
      </div>
    </header>

    <main class="ft-main">
      <div class="arena-lines"></div>
      <router-view v-slot="{ Component }">
        <transition name="slide-up" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

 <footer class="ft-footer">
  <span>
    © FlipTop Rap Battle League · Philippines ·
    Created by MichaelAngelo.dev · Mart Tabilin for the data ·
    Visits: {{ visits }}
  </span>
</footer>
  </div>
</template>

<style>
/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Share+Tech+Mono&display=swap');

/* ══════════════════════════════
   CSS VARIABLES
══════════════════════════════ */
:root {
  --gold:        #F5A623;
  --gold-dark:   #C47D0E;
  --gold-glow:   rgba(245, 166, 35, 0.35);
  --red:         #C0151A;
  --red-dark:    #7A0C10;
  --red-glow:    rgba(192, 21, 26, 0.4);
  --black:       #080808;
  --dark:        #111111;
  --dark2:       #1A1A1A;
  --dark3:       #242424;
  --white:       #F0EAD6;
  --muted:       #888880;

  --font-display: 'Bebas Neue', 'Impact', sans-serif;
  --font-body:    'Barlow Condensed', sans-serif;
  --font-mono:    'Share Tech Mono', monospace;
}

/* ══════════════════════════════
   RESET / BASE
══════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--black);
  color: var(--white);
  font-family: var(--font-body);
  min-height: 100vh;
  overflow-x: hidden;
}

a { text-decoration: none; color: inherit; }

/* ══════════════════════════════
   APP SHELL
══════════════════════════════ */
.ft-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(192,21,26,0.18) 0%, transparent 70%),
    var(--black);
}

/* Noise texture overlay */
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* ══════════════════════════════
   HEADER
══════════════════════════════ */
.ft-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(8, 8, 8, 0.92);
  border-bottom: 2px solid var(--red-dark);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 40px rgba(192,21,26,0.3);
}

.header-bg-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(192,21,26,0.08) 40%,
    rgba(245,166,35,0.06) 60%,
    transparent 100%);
  pointer-events: none;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Logo */
.logo-block {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 2px;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  color: var(--white);
  text-shadow:
    -2px -2px 0 var(--red-dark),
     2px  2px 0 var(--gold-dark),
     0    0  20px var(--gold-glow);
  line-height: 1;
}

.logo-accent {
  color: var(--gold);
  text-shadow:
    0 0 12px var(--gold-glow),
    0 0 30px var(--gold-glow);
}

.logo-sub {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  color: var(--muted);
  text-transform: uppercase;
  padding-left: 2px;
}

/* Nav */
.ft-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  position: relative;
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  padding: 0.4rem 1.2rem;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: color 0.2s, border-color 0.2s, text-shadow 0.2s;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--red-dark), transparent);
  opacity: 0;
  transition: opacity 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--gold);
  border-color: var(--gold-dark);
  text-shadow: 0 0 14px var(--gold-glow);
}

.nav-link.router-link-active::before { opacity: 1; }

.nav-vs {
  font-size: 0.9rem;
  color: var(--red);
  margin: 0 1px;
}

/* ══════════════════════════════
   MAIN
══════════════════════════════ */
.ft-main {
  flex: 1;
  position: relative;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
}

/* Arena diagonal lines bg */
.arena-lines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 60px,
    rgba(255,255,255,0.012) 60px,
    rgba(255,255,255,0.012) 61px
  );
}

/* ══════════════════════════════
   PAGE TRANSITIONS
══════════════════════════════ */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ══════════════════════════════
   FOOTER
══════════════════════════════ */
.ft-footer {
  border-top: 1px solid var(--dark3);
  padding: 1rem 2rem;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--muted);
  text-transform: uppercase;
}

/* ══════════════════════════════
   STANDINGS TABLE (shared)
   Use in your 1on1.vue / 2on2.vue
══════════════════════════════ */

/* Page heading */
.standings-heading {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  letter-spacing: 0.06em;
  color: var(--white);
  margin-bottom: 0.25rem;
  text-shadow: 2px 2px 0 var(--red-dark), 0 0 30px var(--red-glow);
}

.standings-heading span {
  color: var(--gold);
  text-shadow: 0 0 20px var(--gold-glow), 2px 2px 0 var(--gold-dark);
}

.standings-subheading {
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 2.5rem;
}

/* Divider accent */
.ft-divider {
  position: relative;
  z-index: 1;
  height: 3px;
  background: linear-gradient(90deg, var(--red), var(--gold), transparent);
  margin-bottom: 2.5rem;
  border-radius: 2px;
}

/* Table wrapper */
.standings-table-wrap {
  position: relative;
  z-index: 1;
  overflow-x: auto;
  border-radius: 4px;
  border: 1px solid var(--dark3);
  box-shadow:
    0 0 0 1px rgba(245,166,35,0.08),
    0 8px 40px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(245,166,35,0.1);
}

.standings-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
  font-size: 1rem;
}

.standings-table thead tr {
  background: linear-gradient(90deg, var(--red-dark), var(--dark2));
}

.standings-table thead th {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.12em;
  color: var(--gold);
  padding: 0.85rem 1.2rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 2px solid var(--red);
}

.standings-table thead th:first-child {
  width: 3rem;
  text-align: center;
}

.standings-table tbody tr {
  border-bottom: 1px solid var(--dark3);
  transition: background 0.15s;
  cursor: default;
}

.standings-table tbody tr:nth-child(even) {
  background: rgba(255,255,255,0.02);
}

.standings-table tbody tr:hover {
  background: rgba(192,21,26,0.12);
}

/* Top 3 rank highlights */
.standings-table tbody tr:nth-child(1) .rank-cell { color: var(--gold); text-shadow: 0 0 10px var(--gold-glow); }
.standings-table tbody tr:nth-child(2) .rank-cell { color: #C0C0C0; }
.standings-table tbody tr:nth-child(3) .rank-cell { color: #CD7F32; }

.standings-table tbody tr:nth-child(1) {
  background: rgba(245,166,35,0.07);
}

.standings-table td {
  padding: 0.8rem 1.2rem;
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
  vertical-align: middle;
}

.rank-cell {
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.battler-cell {
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.06em;
  color: var(--white);
}

.stat-cell {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--muted);
  text-align: center;
}

.win-cell {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: #4CAF50;
  text-align: center;
  font-weight: 700;
}

.loss-cell {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--red);
  text-align: center;
}

.badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  padding: 2px 8px;
  border-radius: 2px;
  text-transform: uppercase;
}

.badge-champ {
  background: var(--gold-dark);
  color: var(--black);
  box-shadow: 0 0 10px var(--gold-glow);
}

.badge-contender {
  background: var(--red-dark);
  color: var(--white);
}

/* ══════════════════════════════
   RESPONSIVE
══════════════════════════════ */
@media (max-width: 640px) {
  .header-content { height: 60px; padding: 0 1rem; }
  .logo-text { font-size: 2rem; }
  .logo-sub { display: none; }
  .nav-link { font-size: 1.2rem; padding: 0.3rem 0.8rem; }
  .ft-main { padding: 1.5rem 1rem 3rem; }
  .standings-table thead th,
  .standings-table td { padding: 0.65rem 0.75rem; }
}
</style>

<style>
/* ══════════════════════════════
   FILTER / SEARCH BAR
══════════════════════════════ */

.ft-controls {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.75rem;
  align-items: stretch;
}

/* ── Search ── */
.ft-search-wrap {
  position: relative;
  flex: 1 1 240px;
  min-width: 0;
    height: 42px; /* 👈 fixes stretching */
}

/* SVG icon — sized via width/height in scoped, but fallback here */
.ft-search-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--muted);
  pointer-events: none;
  transition: color 0.2s;
}

.ft-search-wrap:focus-within .ft-search-icon {
  color: var(--gold);
}

.ft-search {
  width: 100%;
  height: 100%;
  min-height: 42px;
  background: var(--dark2);
  border: 1px solid var(--dark3);
  border-left: 3px solid var(--red-dark);
  border-radius: 2px;
  padding: 0.6rem 2.2rem 0.6rem 2.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--white);
  letter-spacing: 0.1em;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.ft-search::placeholder {
  color: var(--muted);
  letter-spacing: 0.12em;
}

.ft-search:focus {
  background: var(--dark3);
  border-left-color: var(--gold);
  border-top-color: rgba(245,166,35,0.4);
  border-right-color: rgba(245,166,35,0.4);
  border-bottom-color: rgba(245,166,35,0.4);
  box-shadow:
    0 0 0 1px var(--gold-glow),
    0 4px 20px rgba(0,0,0,0.4);
}



/* ── Filter group ── */
.ft-filter-group {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  align-items: stretch;
}

.ft-filter-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.12em;
  padding: 0.5rem 1.1rem;
  border-radius: 2px;
  border: 1px solid var(--dark3);
  border-left: 3px solid var(--dark3);
  background: var(--dark2);
  color: var(--muted);
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s,
    background 0.15s,
    box-shadow 0.15s,
    transform 0.1s;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
}

/* Subtle shimmer on hover */
.ft-filter-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.04), transparent);
  opacity: 0;
  transition: opacity 0.2s;
}

.ft-filter-btn:hover {
  color: var(--white);
  border-color: rgba(255,255,255,0.2);
  border-left-color: var(--muted);
  transform: translateY(-1px);
}
.ft-filter-btn:hover::after { opacity: 1; }

.ft-filter-btn:active { transform: translateY(0); }

/* Red active (Wins / Losses) */
.ft-filter-btn.active {
  background: linear-gradient(135deg, var(--red-dark), rgba(122,12,16,0.6));
  border-color: rgba(192,21,26,0.6);
  border-left-color: var(--red);
  color: var(--white);
  box-shadow:
    0 0 16px var(--red-glow),
    inset 0 1px 0 rgba(255,255,255,0.08);
}

/* Gold active (Name / Win Rate) */
.ft-filter-btn.active-gold {
  background: linear-gradient(135deg, rgba(245,166,35,0.18), rgba(245,166,35,0.06));
  border-color: rgba(245,166,35,0.4);
  border-left-color: var(--gold);
  color: var(--gold);
  box-shadow:
    0 0 16px var(--gold-glow),
    inset 0 1px 0 rgba(255,255,255,0.06);
}

/* Sort arrow */
.sort-arrow {
  font-size: 0.75rem;
  line-height: 1;
  opacity: 0.85;
  transition: transform 0.2s;
}

/* ── No results ── */
.no-results td {
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  padding: 2.5rem 1rem !important;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* ── Win rate ── */
.winrate-cell {
  min-width: 130px;
}

.winrate-bar-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.winrate-bar {
  flex: 1;
  height: 5px;
  background: var(--dark3);
  border-radius: 3px;
  overflow: hidden;
}

.winrate-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 6px currentColor;
}

/* ── Skeleton ── */
.skeleton-row td { padding: 0.85rem 1.2rem; }

.skel {
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    var(--dark3) 25%,
    rgba(255,255,255,0.06) 50%,
    var(--dark3) 75%
  );
  background-size: 400% 100%;
  animation: shimmer 1.6s infinite;
  height: 13px;
}

.skel-sm    { width: 28px;  margin: 0 auto; }
.skel-name  { width: 120px; }
.skel-bar   { width: 120px; height: 5px; margin: 4px 0; }
.skel-badge { width: 64px;  height: 18px; border-radius: 2px; }

@keyframes shimmer {
  0%   { background-position: 100% 50%; }
  100% { background-position:   0% 50%; }
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .ft-controls { flex-direction: column; }
  .ft-filter-group { width: 100%; }
  .ft-filter-btn { flex: 1; justify-content: center; font-size: 0.85rem; padding: 0.45rem 0.6rem; }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Crown,
} from 'lucide-vue-next'

const visits = ref(0)

onMounted(async () => {
  try {
    const response = await fetch('/api/visits')
    const data = await response.json()
    visits.value = data.visits
  } catch (error) {
    console.error('Failed to load visits:', error)
  }
})
</script>