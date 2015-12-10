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
        public void completeMergedDictionaries()
        {
            ResourceDictionary dict = new ResourceDictionary();
            Uri uri = new Uri("ms-appx:/mdk-store/Themes/MFGeolocator.xaml", UriKind.Absolute);
            dict.Source = uri;
            Application.Current.Resources.MergedDictionaries.Add(dict);
            dict = new ResourceDictionary();
            uri = new Uri("ms-appx:/mdk-store/Themes/Component/Field/MFPhotoThumbnail.xaml", UriKind.Absolute);
            dict.Source = uri;
            Application.Current.Resources.MergedDictionaries.Add(dict);
        }

    }
}
