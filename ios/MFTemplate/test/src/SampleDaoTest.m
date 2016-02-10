//
//  SampleDaoTest.m
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

#import <XCTest/XCTest.h>

#import "MFTestHelper.h"

@interface SampleDaoTest : XCTestCase

@end

@implementation SampleDaoTest

+(void)setUp
{
    [[MFTestHelper getInstance] setUpOnce];
}

+ (void)tearDown
{
    [[MFTestHelper getInstance] tearDownOnce];
    [super tearDown];
}


- (void)testLoadAll
{
    id<MFContextProtocol> mfContext = [[MFTestHelper getInstance] createContext];
    @try {
        /*NSArray *listEntities = [MENTITY MF_findAllInContext:mfContext];
        XCTAssertNotNil(listEntities, @"listEntities must not be null");*/
    }
    @finally {
        [[MFTestHelper getInstance] rollbackContext: mfContext];
    }
}

@end
