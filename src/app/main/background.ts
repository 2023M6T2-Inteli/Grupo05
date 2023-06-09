import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { spawn } from 'child_process';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let spawnProcess

(async () => {
  await app.whenReady();

  console.log("estamos prontos!");
  spawnProcess = spawn('node', ['./server/main.js'])
  spawnProcess.stdout.on('data', (data) => {
    console.log(`[SERVER]: ${data}`);
  });

  spawnProcess.stderr.on('data', (data) => {
    console.error(`[SERVER_ERR]: ${data}`);
  });

  spawnProcess.on('close', (code) => {
    console.log(`[SERVER] exited with code ${code}`);
  });
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();


app.on("will-quit", () => {
  console.log("gracefully shutting down")
  spawnProcess.kill();
})

app.on('window-all-closed', () => {
  app.quit();
  spawnProcess.kill();

});
