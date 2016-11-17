using mdk_common;
using mdk_common.Application;
using mdk_common.Configuration;
using mdk_common.Logger;
using mdk_common.Navigation;
using mdk_common.Settings;
using mdk_common.Zipper;
using mdk_common.Context;
using mdk_store.Core.Application;
using mdk_store.UI;
using mdk_windows8.MFApplication;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Windows.ApplicationModel.Activation;
using Windows.ApplicationModel.DataTransfer;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Security.Credentials.UI;
using Windows.Security.Cryptography;
using Windows.Security.Cryptography.DataProtection;
using Windows.Storage;
using Windows.Storage.Streams;
using Windows.UI.ApplicationSettings;
using Windows.UI.Core;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using basenamespace.ViewModel;
	//@generated-start[navigation-imports][X]
	//@generated-end
			
// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace basenamespace.ui
{

    public delegate void SettingsSavedEventHandler(object sender, EventArgs e);

    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class ExtendedSplash : Page
    {
        private event SettingsSavedEventHandler SettingsSaved;
        internal Rect splashImageRect; // Rect to store splash screen image coordinates.
        private SplashScreen splash; // Variable to hold the splash screen object
        internal Frame rootFrame;
        SynchronizationContext context;
        Popup popupPreference;

        private readonly DataTransferManager dataTransferManager = DataTransferManager.GetForCurrentView();

        public const string PROJECT_NAME = "safeprojectname";

        public ExtendedSplash(SplashScreen splashscreen)
        {
            InitializeComponent();

            splash = splashscreen;
            if (splash != null)
            {
                // Retrieve the window coordinates of the splash screen image.
                splashImageRect = splash.ImageLocation;
                PositionImage();
            }

            // Listen for window resize events to reposition the extended splash screen image accordingly.
            // This is important to ensure that the extended splash screen is formatted properly in response to snapping, unsnapping, rotation, etc...
            Window.Current.SizeChanged += new WindowSizeChangedEventHandler(ExtendedSplash_OnResize);

            SettingsSaved += (s, e) =>
            {
                context.Post(delegate
                {
                    Window.Current.Content = this.rootFrame;
                    string mainscreenKey = ClassLoader.GetInstance().GetBean<IConfigurationDictionary>().GetString(MFConstantes.PropertyNames.MAINSCREEN_PROPERTY_NAME);
                    ClassLoader.GetInstance().GetBean<IMDKNavigationService>().Navigate(mainscreenKey);
                }, null);
            };


            dataTransferManager.DataRequested += new TypedEventHandler<DataTransferManager,
            DataRequestedEventArgs>(this.ShareStorageItemsTextHandler);

            // Create a Frame to act as the navigation context
            rootFrame = new Frame();

            InitializeFramework();
        }

        private async void InitializeFramework()
        {
            context = SynchronizationContext.Current;

            // Initialize Framework
            await MFApplication.StartMF(PROJECT_NAME);

            // Initialize the NavigationService
            InitializeNavigationService();

            bool displaySettings = await ClassLoader.GetInstance().GetBean<ISettings>().IsSettingsOk();
            SettingsHelper settingsHelper = new SettingsHelper();
            settingsHelper.AddCommand<mdk_store.UI.Flyout.Settings>("Options");
            if (!displaySettings)
            {
                popupPreference = settingsHelper.OpenPanel<mdk_store.UI.Flyout.Settings>();

                this.popupPreference.Closed += (s, args) =>
                {
                    SettingsSaved(this, null);
                };
            }
            else
            {
                SettingsSaved(this, null);
            }
        }

        void PositionImage()
        {
            this.extendedSplashImage.SetValue(Canvas.LeftProperty, splashImageRect.X);
            this.extendedSplashImage.SetValue(Canvas.TopProperty, splashImageRect.Y);
            this.extendedSplashImage.Height = splashImageRect.Height;
            this.extendedSplashImage.Width = splashImageRect.Width;
        }

        void ExtendedSplash_OnResize(Object sender, WindowSizeChangedEventArgs e)
        {
            // Safely update the extended splash screen image coordinates. This function will be executed in response to snapping, unsnapping, rotation, etc...
            if (splash != null)
            {
                // Update the coordinates of the splash screen image.
                splashImageRect = splash.ImageLocation;
                PositionImage();
            }
        }


        private async void ShareStorageItemsTextHandler(DataTransferManager sender, DataRequestedEventArgs args)
        {
            //On ferme la connection en court pour pouvoir accéder au fichier de BDD
            ClassLoader.GetInstance().GetBean<IMFContext>().CloseCurrentConnection();

            DataRequest requestDB = args.Request;
            requestDB.Data.Properties.Title = "Envoyer info de l'application par mail";
            requestDB.Data.Properties.Description = "Permet d'envoyer les logs de la base de donnée via un mail";
            requestDB.Data.SetText("En pièce jointe il y a les ficheirs de logs et le fichier de base de donnée.");

            // Because we are making async calls in the DataRequested event handler,
            // we need to get the deferral first.
            DataRequestDeferral deferral = requestDB.GetDeferral();
            // Make sure we always call Complete on the deferral.
            try
            {
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
                dataBaseFileName.Add(String.Concat("EncryptedFile",dataBaseFile.Name));
                await ClassLoader.GetInstance().GetBean<IZipper>().ZipArchive(dataBaseFileName, "dataBase.zip");
                StorageFile dataBaseFileArchiveText = await storageFolder.GetFileAsync("dataBase.zip");

                List<IStorageItem> storageItems = new List<IStorageItem>();
                storageItems.Add(dataBaseFileArchiveText);
                storageItems.Add(logFileArchive);
                requestDB.Data.SetStorageItems(storageItems);
            }
            finally
            {
                deferral.Complete();
                //on réouvre les connections vers la BDD
                ClassLoader.GetInstance().GetBean<IMFContext>().OpenCurrentConnection();
            }
        }

        private void InitializeNavigationService()
        {
            IMDKNavigationService navigationService = ClassLoader.GetInstance().GetBean<IMDKNavigationService>();

            //@generated-start[navigation-service][X]
            //@generated-end
        }
    }
}
