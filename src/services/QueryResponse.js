const electron = window.require("electron");
const { ipcRenderer } = electron;

export async function QueryResponse(message) {
  const response = await new Promise((resolve) => {
    ipcRenderer.once("asynchronous-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("asynchronous-message", message);
  })
  return response;
}
