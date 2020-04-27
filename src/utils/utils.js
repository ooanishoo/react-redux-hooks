export default function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test" && password === "test") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
