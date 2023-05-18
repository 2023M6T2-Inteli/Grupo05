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

(async () => {
  await app.whenReady();
  console.log("estamos prontos!");
  const spawnProcess = spawn('node', ['./server/main.js'])
  spawnProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  spawnProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  spawnProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
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

app.on('window-all-closed', () => {
  app.quit();
});
