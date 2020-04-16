function asyncExecutor(generator) {
  const iterator = generator();

  function handle({ done, value }) {
    return done
      ? value
      : Promise.resolve(value)
          .then((x) => handle(iterator.next(x)))
          .catch((e) => handle(iterator.throw(e)));
  }

  return handle(iterator.next());
}

// тесты
const ID = 42;
const delayMS = 1000;

function getId() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ID);
    }, delayMS);
  });
}

function getDataById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      id === ID ? resolve("🍎") : reject("💥");
    }, delayMS);
  });
}

asyncExecutor(function* () {
  console.time("Time");

  const id = yield getId();
  const data = yield getDataById(id);
  console.log('Data', data);

  console.timeEnd("Time");
});

asyncExecutor(function* () {
  console.time("Time1");

  try {
    const id1 = yield getId();
    const id2 = yield getId();
    const data = yield getDataById(id1+id2);
    console.log("Data", data);
  } catch (e) {
    console.log("Error", e);
  }

  console.timeEnd("Time1");
}).then(console.log);
