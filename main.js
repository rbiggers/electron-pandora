const {
    app,
    BrowserWindow,
    globalShortcut
} = require('electron');

const path = require('path');
const glob = require('glob');

const debug = /--debug/.test(process.argv[2]);

if (process.mas) app.setName('Electron Pandora');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

function initialize() {

    makeSingleInstance();

    loadMainProcess();

    function createWindow() {
        // Create the browser window.
        const windowOptions = {
            width: 1280,
            height: 720,
            title: app.getName(),
            webPreferences: {
                nodeIntegration: false,
            }
        };

        mainWindow = new BrowserWindow(windowOptions);

        // and load the index.html of the app.
        //mainWindow.loadFile('index.html');
        mainWindow.loadURL('https://www.pandora.com/account/sign-in');

        // Launch fullscreen with DevTools open, usage: npm run debug
        if (debug) {
            mainWindow.webContents.openDevTools();
            mainWindow.maximize();
            require('devtron').install();
        };

        // Emitted when the window is closed.
        mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null
        });

        globalShortcut.register('MediaPlayPause', () => {
            mainWindow.webContents.sendInputEvent({
                type: "keyDown",
                keyCode: "\u0020" // spacebar code
            });
            mainWindow.webContents.sendInputEvent({
                type: "keyUp",
                keyCode: "\u0020" // spacebar code
            });
        });

        globalShortcut.register('MediaNextTrack', () => {
            mainWindow.webContents.sendInputEvent({
                type: "keyDown",
                keyCode: "right"
            });
            mainWindow.webContents.sendInputEvent({
                type: "keyUp",
                keyCode: "right"
            });
        });        

    };

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', () => {
        createWindow();
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        };
    });

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow();
        };
    });
};
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return;

    app.requestSingleInstanceLock();

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        };
    });
};

initialize();