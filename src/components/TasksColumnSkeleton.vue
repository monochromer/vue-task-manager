<template>
  <section class="tasks-column-skeleton">
  </section>
</template>

<style scoped>
  .tasks-column-skeleton {
    position: relative;
    overflow: hidden;
    background-color: var(--color-light-fade);
    border-radius: var(--border-radius-md);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      width: calc(100% * 3);
      background-image: linear-gradient(90deg, transparent calc(100% / 3), var(--color-light-contrast) 50%, transparent calc(100% * 2 / 3));
      animation: moveFromLeft 1.5s both infinite;
    }
  }

  @keyframes moveFromLeft {
    from {
      transform: translateX(calc(-100% / 1.5));
    }

    to {
      transform: translateX(0)
    }
  }
</style>