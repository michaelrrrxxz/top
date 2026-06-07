<template>
  <div class="notfound">
    <div class="notfound-content">

      <div class="error-code">404</div>

      <h1 class="error-title">
        PAGE <span>NOT FOUND</span>
      </h1>

      <div class="ft-divider"></div>

      <p class="error-text">
        THIS PAGE GOT BODYBAGGED.
        <br />
        THE URL YOU'RE LOOKING FOR DOESN'T EXIST.
      </p>

      <RouterLink to="/" class="home-btn">
        RETURN TO MAIN STAGE
      </RouterLink>

    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.notfound {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.notfound-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-family: var(--font-display);
  font-size: clamp(5rem, 15vw, 10rem);
  line-height: 1;
  color: var(--red);
  text-shadow:
    0 0 15px rgba(255, 60, 60, 0.4),
    0 0 40px rgba(255, 60, 60, 0.2);
}

.error-title {
  margin-top: 1rem;
  font-size: clamp(1.8rem, 4vw, 3rem);
  letter-spacing: 0.08em;
  color: var(--white);
}

.error-title span {
  color: var(--gold);
}

.ft-divider {
  width: 120px;
  height: 2px;
  margin: 1.5rem auto;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gold),
    transparent
  );
}

.error-text {
  font-family: var(--font-mono);
  color: var(--muted);
  line-height: 1.8;
  letter-spacing: 0.08em;
  margin-bottom: 2rem;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--gold);
  color: var(--gold);
  text-decoration: none;
  font-family: var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.home-btn:hover {
  background: var(--gold);
  color: var(--black);
  box-shadow: 0 0 15px rgba(255, 200, 80, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .error-text {
    font-size: 0.85rem;
  }

  .home-btn {
    width: 100%;
  }
}
</style>