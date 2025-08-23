// _passenger.cjs (CJS wrapper for Passenger)
(async () => {
    await import('./dist/index.js'); // <-- your ESM startup file
  })();