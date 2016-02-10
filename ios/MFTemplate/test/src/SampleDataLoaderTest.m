//
//  SampleDataLoaderTest.m
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

#import <XCTest/XCTest.h>

#import "MFTestHelper.h"

@interface SampleDataLoaderTest : XCTestCase

@end

@implementation SampleDataLoaderTest

+(void)setUp
{
    [[MFTestHelper getInstance] setUpOnce];
}

+ (void)tearDown
{
    [[MFTestHelper getInstance] tearDownOnce];
    [super tearDown];
}

- (void)testReload
{
    id<MFContextProtocol> mfContext = [[MFTestHelper getInstance] createContext];
    @try {
        /*id<MFDataLoaderProtocol> dataLoader = [[MFBeanLoader getInstance] getBeanWithKey:
                                           @"MDATALOADER"];
        [dataLoader setDataIdentifiers:@[ @1]];
        [dataLoader setLoadingOptions:nil];

        [dataLoader reload:mfContext];
        MENTITY *entity = [dataLoader getLoadedData:mfContext];
        XCTAssertNotNil(entity, @"entity must not be null");
        XCTAssertEqual(entity.identifier, @1, @"entity.identifier must be to 1");*/
    }
    @finally {
        [[MFTestHelper getInstance] rollbackContext: mfContext];
    }

}

@end
