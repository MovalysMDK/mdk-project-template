using Common.Application;
using System;
using System.Threading.Tasks;
using test.Common;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.UI.Xaml;

namespace basenamespace
{
    sealed partial class App : Application
    {

        ContinuationManager continuationManager;

        /// <summary>
        /// Add additional resources to the app merged dictionaries list for the themes of components defined differently in Windows 8.1 and Windows Phone 8.1
        /// </summary>
        public void completeMergedDictionaries()
        {
            ResourceDictionary dict = new ResourceDictionary();
            Uri uri = new Uri("ms-appx:/mdk-phone/Themes/MFGeolocator.xaml", UriKind.Absolute);
            dict.Source = uri;
            Application.Current.Resources.MergedDictionaries.Add(dict);
            dict = new ResourceDictionary();
            uri = new Uri("ms-appx:/mdk-phone/Themes/Component/Field/MFPhotoThumbnail.xaml", UriKind.Absolute);
            dict.Source = uri;
            Application.Current.Resources.MergedDictionaries.Add(dict);
        }


        /// <summary>
        /// Handle OnActivated event to deal with File Open/Save continuation activation kinds
        /// </summary>
        /// <param name="e">Application activated event arguments, it can be casted to proper sub-type based on ActivationKind</param>
        protected async override void OnActivated(IActivatedEventArgs e)
        {
            base.OnActivated(e);

            continuationManager = new ContinuationManager();

            await RestoreStatusAsync(e.PreviousExecutionState);

            var continuationEventArgs = e as IContinuationActivatedEventArgs;
            if (continuationEventArgs != null)
            {
                // Call ContinuationManager to handle continuation activation
                continuationManager.Continue(continuationEventArgs);
            }

            Window.Current.Activate();
        }

        private async void OnSuspending(object sender, SuspendingEventArgs e)
        {
            var deferral = e.SuspendingOperation.GetDeferral();

            await SuspensionManager.SaveAsync();

            deferral.Complete();
        }

        private async Task RestoreStatusAsync(ApplicationExecutionState previousExecutionState)
        {
            // Do not repeat app initialization when the Window already has content,
            // just ensure that the window is active
            if (previousExecutionState == ApplicationExecutionState.Terminated)
            {
                // Restore the saved session state only when appropriate
                try
                {
                    await SuspensionManager.RestoreAsync();
                }
                catch (SuspensionManagerException)
                {
                    //Something went wrong restoring state.
                    //Assume there is no state and continue
                }
            }
        }


    }
}
