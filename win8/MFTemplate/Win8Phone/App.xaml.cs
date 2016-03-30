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
            addRessource("/mdk-phone/Themes/MFGeolocator.xaml");
            addRessource("/mdk-phone/Themes/MFPhotoThumbnail.xaml");
            addRessource("/mdk-phone/Themes/Field/MFButton.xaml");
            addRessource("/mdk-phone/Themes/Field/MFCheckBox.xaml");
            addRessource("/mdk-phone/Themes/Field/MFDatePicker.xaml");
            addRessource("/mdk-phone/Themes/Field/MFEnumImage.xaml");
            addRessource("/mdk-phone/Themes/Field/MFInteger.xaml");
            addRessource("/mdk-phone/Themes/Field/MFLabel.xaml");
            addRessource("/mdk-phone/Themes/Field/MFMultiLineText.xaml");
            addRessource("/mdk-phone/Themes/Field/MFNumberPicker.xaml");
            addRessource("/mdk-phone/Themes/Field/MFRadioEnum.xaml");
            addRessource("/mdk-phone/Themes/Field/MFRegExpButton.xaml");
            addRessource("/mdk-phone/Themes/Field/MFSignature.xaml");
            addRessource("/mdk-phone/Themes/Field/MFSlider.xaml");
            addRessource("/mdk-phone/Themes/Field/MFTextBox.xaml");
            addRessource("/mdk-phone/Themes/Field/MFWebView.xaml");
            addRessource("/mdk-phone/Themes/List/MFFixedList.xaml");
            addRessource("/mdk-phone/Themes/List/MFList1D.xaml");
            addRessource("/mdk-phone/Themes/List/MFList1DSearch.xaml");
            addRessource("/mdk-phone/Themes/List/MFList2D.xaml");
            addRessource("/mdk-phone/Themes/List/MFSpinner.xaml");
            addRessource("/mdk-phone/Themes/List/MFSearchSpinner.xaml");
            addRessource("/mdk-phone/Themes/DefaultStyle.xaml");
        }
        
        private void addRessource(String path)
        {
            ResourceDictionary dict = new ResourceDictionary();
            Uri uri = new Uri("ms-appx:" + path, UriKind.Absolute);
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
