//
//  MFCoreDataRunInit+Encryption.m
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

#import "MFCoreDataRunInit+Encryption.h"

@implementation MFCoreDataRunInit (Encryption)

/**
 * Uncomment this function to enable database encryption
 
+(void) encrypt:(NSURL *) storeUrl {
    NSError *error;
    NSDictionary *fileAttributes = [NSDictionary
                                    dictionaryWithObject:NSFileProtectionComplete
                                    forKey:NSFileProtectionKey];
    if(![[NSFileManager defaultManager] setAttributes:fileAttributes
                                         ofItemAtPath:[storeUrl path] error: &error]) {
        NSLog(@"Unresolved error with store encryption %@, %@",
              error, [error userInfo]);
        abort();
    }
}
 
*/
@end
