using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml;

namespace basenamespace
{
    sealed partial class App
    {

         /// <summary>
        /// Add additional resources to the app merged dictionaries list for the themes of components defined differently in Windows 8.1 and Windows Phone 8.1
        /// </summary>
        /// <summary>
        /// Add additional resources to the app merged dictionaries list for the themes of components defined differently in Windows 8.1 and Windows Phone 8.1
        /// </summary>
        public void completeMergedDictionaries()
        {
            addRessource("/mdk-store/Themes/MFGeolocator.xaml");
            addRessource("/mdk-store/Themes/MFPhotoThumbnail.xaml");
            addRessource("/mdk-store/Themes/Field/MFButton.xaml");
            addRessource("/mdk-store/Themes/Field/MFCheckBox.xaml");
            addRessource("/mdk-store/Themes/Field/MFDatePicker.xaml");
            addRessource("/mdk-store/Themes/Field/MFEnumImage.xaml");
            addRessource("/mdk-store/Themes/Field/MFInteger.xaml");
            addRessource("/mdk-store/Themes/Field/MFLabel.xaml");
            addRessource("/mdk-store/Themes/Field/MFMultiLineText.xaml");
            addRessource("/mdk-store/Themes/Field/MFNumberPicker.xaml");
            addRessource("/mdk-store/Themes/Field/MFRadioEnum.xaml");
            addRessource("/mdk-store/Themes/Field/MFRegExpButton.xaml");
            addRessource("/mdk-store/Themes/Field/MFSignature.xaml");
            addRessource("/mdk-store/Themes/Field/MFSlider.xaml");
            addRessource("/mdk-store/Themes/Field/MFTextBox.xaml");
            addRessource("/mdk-store/Themes/Field/MFWebView.xaml");
            addRessource("/mdk-store/Themes/List/MFFixedList.xaml");
            addRessource("/mdk-store/Themes/List/MFList1D.xaml");
            addRessource("/mdk-store/Themes/List/MFList1DSearch.xaml");
            addRessource("/mdk-store/Themes/List/MFList2D.xaml");
            addRessource("/mdk-store/Themes/List/MFSpinner.xaml");
            addRessource("/mdk-store/Themes/List/MFSearchSpinner.xaml");
            addRessource("/mdk-store/Themes/DefaultStyle.xaml");
        }
        
        private void addRessource(String path)
        {
            ResourceDictionary dict = new ResourceDictionary();
            Uri uri = new Uri("ms-appx:" + path, UriKind.Absolute);
            dict.Source = uri;
            Application.Current.Resources.MergedDictionaries.Add(dict);
        }

    }
}
