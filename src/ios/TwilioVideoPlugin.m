/********* TwilioVideo.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import "TwilioVideoViewController.h"

@interface TwilioVideoPlugin : CDVPlugin

@end

@implementation TwilioVideoPlugin

- (void)startVideoCall:(CDVInvokedUrlCommand*)command {
    NSString* user =  command.arguments[0];
    NSString* room = command.arguments[1];
    NSString* token = command.arguments[2];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        UIStoryboard *sb = [UIStoryboard storyboardWithName:@"TwilioVideo" bundle:nil];
        TwilioVideoViewController *vc = [sb instantiateViewControllerWithIdentifier:@"TwilioVideoViewController"];
        
        vc.accessToken = token;
        vc.commandDelegate = self.commandDelegate;
        vc.successCallbackId = command.callbackId;
        [self.viewController presentViewController:vc animated:YES completion:^{
            [vc connectToRoom:room asVideoCall:true withUser:user];
        }];
    });
}

- (void)startPhoneCall:(CDVInvokedUrlCommand*)command {
    NSString* user =  command.arguments[0];
    NSString* room = command.arguments[1];
    NSString* token = command.arguments[2];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        UIStoryboard *sb = [UIStoryboard storyboardWithName:@"TwilioVideo" bundle:nil];
        TwilioVideoViewController *vc = [sb instantiateViewControllerWithIdentifier:@"TwilioVideoViewController"];
        
        vc.accessToken = token;
        vc.commandDelegate = self.commandDelegate;
        vc.successCallbackId = command.callbackId;
        [self.viewController presentViewController:vc animated:YES completion:^{
            [vc connectToRoom:room asVideoCall:false withUser:user];
        }];
    });
}

- (void) dismissTwilioVideoController {
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

@end
