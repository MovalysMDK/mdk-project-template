//
//  MFFrameworkComponentsAssembly.m
//  lemon
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

#import "MFFrameworkComponentsAssembly.h"
#import "MViewModelCreator.h"
#import "MFCsvLoaderHelper.h"
#import "MFUserCsvLoaderRunInit.h"
#import "MFFwkCsvLoaderRunInit.h"
#import "MFProjectCsvLoaderRunInit.h"
#import "MFLoadFormRunInit.h"
#import "MFLoadVisualConfigurationRunInit.h"
#import "MFWebViewController.h"
#import "MFExportDatabaseAction.h"
#import "MFImportDatabaseAction.h"
#import "MFResetDatabaseAction.h"
#import "MFEmailLogsAction.h"
#import "MFExportLogsAction.h"
#import "MFReaderSection.h"
#import "MFLoggingFormatter.h"
#import "MFReaderColumn.h"
#import "MFReaderForm.h"
#import "MFReaderWorkspace.h"
#import "MFExtensionKeyboardingUIControl.h"
#import "MFExtensionKeyboardingUIControlWithRegExp.h"
#import "MFSyncTimestampService.h"
#import "MFObjectToSyncService.h"
#import "MFRestConnectionConfig.h"
#import "MFSynchronizationAction.h"
#import "MFJSONKitService.h"
#import "MFBasicRestAuth.h"
#import "MFLocalCredentialService.h"
#import "MFRestInvoker.h"
#import "MFSecurityHelper.h"
#import "MFKeychainRunInit.h"

/**
 * @brief Class containing the beans managed by Typhoon used in MDK
 *
 * DO NOT MODIFIED THIS CLASS : You must overload this class in MFFrameworkExtendedComponentsAssembly
 *
 **/
@implementation MFFrameworkComponentsAssembly


- (void)registerComponentsInPrototypes:(NSMutableDictionary *)prototypes andSingletons:(NSMutableDictionary *)singletons {
    
    [singletons setObject:[MFContextFactory class] forKey:@"MFContextFactory"];
    [singletons setObject:[MFContextFactory class] forKey:@"MFContextFactoryProtocol"];
    [singletons setObject:[MFConfigurationHandler class] forKey:@"configurationHandler"];
    [singletons setObject:[MFCoreDataHelper class] forKey:@"coreDataHelper"];
    [singletons setObject:[MFCsvLoaderHelper class] forKey:@"csvLoaderHelper"];
    [singletons setObject:[MFKeyNotFound class] forKey:@"MFKeyNotFound"];
    [singletons setObject:[MFSecurityHelper class] forKey:@"MFSecurityHelper"];
    
    [prototypes setObject:[MFContext class] forKey:@"MFContext"];
    [prototypes setObject:[MFContext class] forKey:@"MFContextProtocol"];
    [prototypes setObject:[MFWaitRunInit class] forKey:@"MFWaitRunInit"];
    [prototypes setObject:[MFKeychainRunInit class] forKey:@"MFKeychainRunInit"];
    [prototypes setObject:[MFCoreDataRunInit class] forKey:@"MFCoreDataRunInit"];
    [prototypes setObject:[MFUserCsvLoaderRunInit class] forKey:@"MFUserCsvLoaderRunInit"];
    [prototypes setObject:[MFFwkCsvLoaderRunInit class] forKey:@"MFFwkCsvLoaderRunInit"];
    [prototypes setObject:[MFProjectCsvLoaderRunInit class] forKey:@"MFProjectCsvLoaderRunInit"];
    [prototypes setObject:[MFLoadFormRunInit class] forKey:@"MFLoadFormRunInit"];
    [prototypes setObject:[MFLoadVisualConfigurationRunInit class] forKey:@"MFLoadVisualConfigurationRunInit"];
    [prototypes setObject:[MFMapViewController class] forKey:@"mapViewController"];
    [prototypes setObject:[MFWebViewController class] forKey:@"webViewController"];
    [prototypes setObject:[MFCreateEmailViewController class] forKey:@"createEMailViewcontroller"];
    [prototypes setObject:[MFFieldDescriptor class] forKey:@"fieldDescriptor"];
    [prototypes setObject:[MFSectionDescriptor class] forKey:@"sectionDescriptor"];
    [prototypes setObject:[MFFormDescriptor class] forKey:@"formDescriptor"];
    [prototypes setObject:[MFGroupDescriptor class] forKey:@"groupDescriptor"];
    [prototypes setObject:[MFWorkspaceDescriptor class] forKey:@"workspaceDescriptor"];
    [prototypes setObject:[MFColumnDescriptor class] forKey:@"columnDescriptor"];
    [prototypes setObject:[MFReaderForm class] forKey:@"formReader"];
    [prototypes setObject:[MFReaderSection class] forKey:@"sectionReader"];
    [prototypes setObject:[MFReaderWorkspace class] forKey:@"workspaceReader"];
    [prototypes setObject:[MFReaderColumn class] forKey:@"columnReader"];
    [prototypes setObject:[MFLoggingFormatter class] forKey:@"loggingFormatter"];
    [prototypes setObject:[MFURL class] forKey:@"url"];
    [prototypes setObject:[MFProperty class] forKey:@"property"];
    [prototypes setObject:[MFBindingComponentDescriptor class] forKey:@"bindingComponentdescriptor"];
    [prototypes setObject:[MFUIBaseComponent class] forKey:@"baseComponent"];
    [prototypes setObject:[MFFormExtend class] forKey:@"formExtend"];
    [prototypes setObject:[MFFormSearchDelegate class] forKey:@"MFFormSearchDelegate"];
    [prototypes setObject:[MFFormSearchExtend class] forKey:@"MFFormSearchExtend"];
    [prototypes setObject:[MFBinding class] forKey:@"MFBinding"];
    [prototypes setObject:[MFExportDatabaseAction class] forKey:@"MFExportDatabaseAction"];
    [prototypes setObject:[MFImportDatabaseAction class] forKey:@"MFImportDatabaseAction"];
    [prototypes setObject:[MFResetDatabaseAction class] forKey:@"MFResetDatabaseAction"];
    [prototypes setObject:[MFEmailLogsAction class] forKey:@"MFEmailLogsAction"];
    [prototypes setObject:[MFExportLogsAction class] forKey:@"MFExportLogsAction"];
    [prototypes setObject:[MFGenericLoadDataAction class] forKey:@"MFGenericLoadDataAction"];
    [prototypes setObject:[MFUpdateVMWithDataLoaderAction class] forKey:@"MFUpdateVMWithDataLoaderAction"];
    [prototypes setObject:[MViewModelCreator class] forKey:@"MViewModelCreator"];
    [prototypes setObject:[MFPositionViewModel class] forKey:@"positionViewModel"];
    [prototypes setObject:[MFChainSaveDetailAction class] forKey:@"MFChainSaveDetailAction"];
    [prototypes setObject:[MFExtensionKeyboardingUIControl class] forKey:@"extensionKeyboardingUIControl"];
    [prototypes setObject:[MFExtensionKeyboardingUIControlWithRegExp class] forKey:@"MFExtensionKeyboardingUIControlWithRegExpProtocol"];
    [prototypes setObject:[MFSyncTimestampService class] forKey:@"MFSyncTimestampService"];
    [prototypes setObject:[MFObjectToSyncService class] forKey:@"MFObjectToSyncService"];
    [prototypes setObject:[MFRestConnectionConfig class] forKey:@"MFRestConnectionConfig"];
    [prototypes setObject:[MFSynchronizationAction class] forKey:@"MFSynchronizationAction"];
    [prototypes setObject:[MFJSONKitService class] forKey:@"MFJsonMapperServiceProtocol"];
    [prototypes setObject:[MFBasicRestAuth class] forKey:@"MFAbstractRestAuth"];
    [prototypes setObject:[MFLocalCredentialService class] forKey:@"MFLocalCredentialService"];
    [prototypes setObject:[MFRestInvoker class] forKey:@"RestInvoker"];
    
    
    
}

@end
