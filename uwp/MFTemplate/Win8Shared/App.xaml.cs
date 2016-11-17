using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using mdk_common;
using mdk_common.Application;
using mdk_common.Configuration;
using mdk_common.Context;
using mdk_common.Logger;
using mdk_common.Model;
using mdk_common.Zipper;
using mdk_store.Core.Application;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.Storage.Streams;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using basenamespace.ui;

// The Blank Application template is documented at http://go.microsoft.com/fwlink/?LinkId=234227

namespace basenamespace
{
    /// <summary>
    /// Provides application-specific behavior to supplement the default Application class.
    /// </summary>
    sealed partial class App : Application
    {
        /// <summary>
        /// Initializes the singleton application object.  This is the first line of authored code
        /// executed, and as such is the logical equivalent of main() or WinMain().
        /// </summary>
        public App()
        {
            this.InitializeComponent();
            UnhandledException += App_UnhandledException;
            //this.Suspending += OnSuspending;
        }


        private async void App_UnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            Boolean sendLog = Convert.ToBoolean(ClassLoader.GetInstance().GetBean<IConfigurationDictionary>().GetString("SendLogOnCrash"));
            if (sendLog)
            {
                IMFMail mfMail = ClassLoader.GetInstance().GetBean<IMFMail>();
                //On ferme la connection en court pour pouvoir accéder au fichier de BDD
                ClassLoader.GetInstance().GetBean<IMFContext>().CloseCurrentConnection();

                MFDataProtection dataProtection = new MFDataProtection();
                StorageFolder storageFolder = Windows.Storage.ApplicationData.Current.LocalFolder;

                // Get All logs files names.
                List<string> logFilesNames = await ClassLoader.GetInstance().GetBean<ILogger>().GetAllLogFilesNames();
                // Compress All logs into archive file
                await ClassLoader.GetInstance().GetBean<IZipper>().ZipArchive(logFilesNames, "FilesLog.zip");
                // Get log files archive
                StorageFile logFileArchive = await storageFolder.GetFileAsync("FilesLog.zip");

                //Get BDD file
                StorageFile dataBaseFile = await storageFolder.GetFileAsync(String.Concat(MFApplicationHandler.projectName, MFConstantes.FileExtensions.SQLITE_FILE_EXTENSION));
                IBuffer data = await FileIO.ReadBufferAsync(dataBaseFile);
                IBuffer securedData = await dataProtection.ProtectFile("LOCAL = user", data);
                StorageFile encryptedDBFile = await storageFolder.CreateFileAsync("EncryptedFile" + dataBaseFile.Name, CreationCollisionOption.ReplaceExisting);
                await FileIO.WriteBufferAsync(encryptedDBFile, securedData);

                List<string> dataBaseFileName = new List<string>();
                dataBaseFileName.Add(String.Concat("EncryptedFile", dataBaseFile.Name));
                await ClassLoader.GetInstance().GetBean<IZipper>().ZipArchive(dataBaseFileName, "dataBase.zip");
                StorageFile dataBaseFileArchiveText = await storageFolder.GetFileAsync("dataBase.zip");

                List<IStorageItem> storageItems = new List<IStorageItem>();
                storageItems.Add(dataBaseFileArchiveText);
                storageItems.Add(logFileArchive);

                mfMail.Attachments = storageItems;
                mfMail.Send();
            }
        }

        /// <summary>
        /// Invoked when the application is launched normally by the end user.  Other entry points
        /// will be used when the application is launched to open a specific file, to display
        /// search results, and so forth.
        /// </summary>
        /// <param name="args">Details about the launch request and process.</param>
        protected override void OnLaunched(LaunchActivatedEventArgs args)
        {

        	completeMergedDictionaries();

            Frame rootFrame = Window.Current.Content as Frame;

            // Do not repeat app initialization when the Window already has content,
            // just ensure that the window is active
            if (rootFrame == null)
            {
                // Create a Frame to act as the navigation context and navigate to the first page
                rootFrame = new Frame();

                if (args.PreviousExecutionState == ApplicationExecutionState.Terminated)
                {
                    //TODO: Load state from previously suspended application
                }

                // Place the frame in the current Window
                Window.Current.Content = rootFrame;
            }

            if (rootFrame.Content == null)
            {
                // When the navigation stack isn't restored navigate to the first page,
                // configuring the new page by passing required information as a navigation
                // parameter
                ExtendedSplash splash = new ExtendedSplash(args.SplashScreen);
                Window.Current.Content = splash;
            }
            // Ensure the current window is active
            Window.Current.Activate();
        }

        ///// <summary>
        ///// Invoked when application execution is being suspended.  Application state is saved
        ///// without knowing whether the application will be terminated or resumed with the contents
        ///// of memory still intact.
        ///// </summary>
        ///// <param name="sender">The source of the suspend request.</param>
        ///// <param name="e">Details about the suspend request.</param>
        //private void OnSuspending(object sender, SuspendingEventArgs e)
        //{
        //    var deferral = e.SuspendingOperation.GetDeferral();
        //    //TODO: Save application state and stop any background activity
        //    deferral.Complete();
        //}
    }
}
