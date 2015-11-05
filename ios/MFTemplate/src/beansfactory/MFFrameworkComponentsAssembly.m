//
//  MFFrameworkComponentsAssembly.m
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

@import MDKControl.Command;

#import "MFFrameworkComponentsAssembly.h"
#import "MViewModelCreator.h"
#import "MFCsvLoaderHelper.h"
#import "MFUserCsvLoaderRunInit.h"
#import "MFFwkCsvLoaderRunInit.h"
#import "MFProjectCsvLoaderRunInit.h"
#import "MFWebViewController.h"
#import "MFExportDatabaseAction.h"
#import "MFImportDatabaseAction.h"
#import "MFResetDatabaseAction.h"
#import "MFEmailLogsAction.h"
#import "MFExportLogsAction.h"
#import "MFLoggingFormatter.h"
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
#import "MFConfigurationHandler.h"
#import "MFProperty.h"

#import "MFMandatoryFieldValidator.h"
#import "MFLengthFieldValidator.h"
#import "MFUrlFieldValidator.h"
#import "MFPhoneFieldValidator.h"
#import "MFEmailFieldValidator.h"
#import "MFDoubleFieldValidator.h"
#import "MFIntegerFieldValidator.h"
#import "MFFixedListContentFieldValidator.h"

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
    
    [singletons setObject:[MFUrlFieldValidator class] forKey:@"urlFieldValidator"];
    [singletons setObject:[MFPhoneFieldValidator class] forKey:@"phoneFieldValidator"];
    [singletons setObject:[MFEmailFieldValidator class] forKey:@"emailFieldValidator"];
    [singletons setObject:[MFMandatoryFieldValidator class] forKey:@"mandatoryFieldValidator"];
    [singletons setObject:[MFLengthFieldValidator class] forKey:@"lengthFieldValidator"];
    [singletons setObject:[MFDoubleFieldValidator class] forKey:@"doubleFieldValidator"];
    [singletons setObject:[MFIntegerFieldValidator class] forKey:@"integerFieldValidator"];
    [singletons setObject:[MFFixedListContentFieldValidator class] forKey:@"fixedListContentFieldValidator"];
    
    [prototypes setObject:[MFContext class] forKey:@"MFContext"];
    [prototypes setObject:[MFContext class] forKey:@"MFContextProtocol"];
    [prototypes setObject:[MFWaitRunInit class] forKey:@"MFWaitRunInit"];
    [prototypes setObject:[MFKeychainRunInit class] forKey:@"MFKeychainRunInit"];
    [prototypes setObject:[MFCoreDataRunInit class] forKey:@"MFCoreDataRunInit"];
    [prototypes setObject:[MFUserCsvLoaderRunInit class] forKey:@"MFUserCsvLoaderRunInit"];
    [prototypes setObject:[MFFwkCsvLoaderRunInit class] forKey:@"MFFwkCsvLoaderRunInit"];
    [prototypes setObject:[MFProjectCsvLoaderRunInit class] forKey:@"MFProjectCsvLoaderRunInit"];
    [prototypes setObject:[MFMapViewController class] forKey:@"mapViewController"];
    [prototypes setObject:[MFWebViewController class] forKey:@"webViewController"];
    [prototypes setObject:[MFCreateEmailViewController class] forKey:@"createEMailViewcontroller"];
    [prototypes setObject:[MFLoggingFormatter class] forKey:@"loggingFormatter"];
    [prototypes setObject:[MFURL class] forKey:@"url"];
    [prototypes setObject:[MFProperty class] forKey:@"property"];
    [prototypes setObject:[MFComponentDescriptor class] forKey:@"bindingComponentdescriptor"];
    [prototypes setObject:[MFUIBaseComponent class] forKey:@"baseComponent"];
    [prototypes setObject:[MFFormSearchDelegate class] forKey:@"MFFormSearchDelegate"];
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
    [prototypes setObject:[MFSyncTimestampService class] forKey:@"MFSyncTimestampService"];
    [prototypes setObject:[MFObjectToSyncService class] forKey:@"MFObjectToSyncService"];
    [prototypes setObject:[MFRestConnectionConfig class] forKey:@"MFRestConnectionConfig"];
    [prototypes setObject:[MFSynchronizationAction class] forKey:@"MFSynchronizationAction"];
    [prototypes setObject:[MFJSONKitService class] forKey:@"MFJsonMapperServiceProtocol"];
    [prototypes setObject:[MFBasicRestAuth class] forKey:@"MFAbstractRestAuth"];
    [prototypes setObject:[MFLocalCredentialService class] forKey:@"MFLocalCredentialService"];
    [prototypes setObject:[MFRestInvoker class] forKey:@"RestInvoker"];
    
    [prototypes setObject:[MDKSendEmailCommand class] forKey:@"SendEmailCommand"];
    [prototypes setObject:[MDKCallPhoneNumberCommand class] forKey:@"CallPhoneNumberCommand"];
    [prototypes setObject:[MDKOpenURLCommand class] forKey:@"OpenURLCommand"];
}



@end
