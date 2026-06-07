<template>
  <div class="home">

    <!-- HERO -->
    <div class="hero">
      <h1 class="title">
        FLIPTOP <span>STANDINGS</span>
      </h1>
      <p class="subtitle">
        Choose a division to view rankings and champions
      </p>
    </div>

    <!-- NAV CARDS -->
    <div class="grid">

      <router-link to="/1on1" class="card oneonone">
        <div class="card-title">1 ON 1</div>
        <div class="card-desc">Isabuhay Rankings</div>
        <div class="card-badge">🏆 Solo Battles</div>
      </router-link>

      <router-link to="/2on2" class="card twonone">
        <div class="card-title">2 ON 2</div>
        <div class="card-desc">Dos Por Dos Division</div>
        <div class="card-badge">🤝 Team Battles</div>
      </router-link>

      <router-link to="/champions" class="card champs">
        <div class="card-title">CHAMPIONS</div>
        <div class="card-desc">All Time Winners</div>
        <div class="card-badge">👑 Hall of Fame</div>
      </router-link>

    </div>

    <!-- QUICK INFO -->
    <div class="stats">
      <div class="stat-box">
        <div class="stat-number">3</div>
        <div class="stat-label">DIVISIONS</div>
      </div>

      <div class="stat-box">
        <div class="stat-number">2010</div>
        <div class="stat-label">HISTORY</div>
      </div>

      <div class="stat-box">
        <div class="stat-number">∞</div>
        <div class="stat-label">ALL TIME</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  padding: 2rem;
  color: white;
  font-family: var(--font-mono);
}

/* HERO */
.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  letter-spacing: 0.2em;
}

.title span {
  color: gold;
}

.subtitle {
  color: #aaa;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

/* CARD BASE */
.card {
  padding: 1.5rem;
  border: 1px solid #333;
  border-radius: 6px;
  text-decoration: none;
  color: white;
  background: #111;
  transition: 0.25s;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  border-color: gold;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.15);
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.15em;
}

.card-desc {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0.3rem;
}

.card-badge {
  margin-top: 1rem;
  font-size: 0.7rem;
  color: gold;
}

/* DIFFERENT STYLES PER PAGE */
.oneonone {
  border-left: 3px solid gold;
}

.twonone {
  border-left: 3px solid #4caf50;
}

.champs {
  border-left: 3px solid #ff9800;
}

/* STATS */
.stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.stat-box {
  text-align: center;
  padding: 1rem;
  border: 1px solid #222;
  min-width: 130px;
  background: #0f0f0f;
}

.stat-number {
  font-size: 1.5rem;
  color: gold;
}

.stat-label {
  font-size: 0.7rem;
  color: #aaa;
  letter-spacing: 0.1em;
}
</style>