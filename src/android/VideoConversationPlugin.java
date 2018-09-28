package com.coachcare.coachcareionic;

import org.apache.cordova.BuildHelper;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.LOG;
import org.apache.cordova.PermissionHelper;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;


public class VideoConversationPlugin extends CordovaPlugin {


    public CallbackContext callbackContext;
    private CordovaInterface cordova;
    private String user;
    private String roomId;
    private String token;
    private String isVideo;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.cordova = cordova;
        // your init code here
    }

    
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        switch(action){
            case "startPhoneCall":
                this.startCall(args, "false");
                break;
            case "startVideoCall":
                this.startCall(args, "true");
                break;
        }
        return true;
	}

	public void startCall(final JSONArray args, final String isVideo) {
        try {
            this.user = args.getString(0);
            this.roomId = args.getString(1);
            this.token = args.getString(2);

            this.isVideo = isVideo;
            final CordovaPlugin that = this;
            final String token = this.token;
            final String roomId = this.roomId;
            final String user = this.user;

            LOG.d("TOKEN", token);
            LOG.d("ROOMID", roomId);
            LOG.d("ISVIDEO", isVideo);
     		cordova.getThreadPool().execute(new Runnable() {
                public void run() {

                    Intent intentTwilioVideo = new Intent(that.cordova.getActivity().getBaseContext(), ConversationActivity.class);
        			intentTwilioVideo.putExtra("token", token);
                    intentTwilioVideo.putExtra("roomId", roomId);
                    intentTwilioVideo.putExtra("isVideo", isVideo);
                    intentTwilioVideo.putExtra("user", user);
                    // avoid calling other phonegap apps
                    //intentTwilioVideo.setPackage(that.cordova.getActivity().getApplicationContext().getPackageName());
                    //that.cordova.startActivityForResult(that, intentTwilioVideo);
                    //that.cordova.getActivity().startActivity(intentTwilioVideo);
                    that.cordova.startActivityForResult(that, intentTwilioVideo, 0);
                }
                    
            });
        } catch (JSONException e) {
            //Log.e(TAG, "Invalid JSON string: " + json, e);
            //return null;
        }
    }

    public Bundle onSaveInstanceState() {
        Bundle state = new Bundle();
        state.putString("token", this.token);
        state.putString("roomId", this.roomId);
        return state;
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.i(TAG, "*****  result from twilio video" + requestCode + " *****  " + resultCode);
    }

    public void onRestoreStateForActivityResult(Bundle state, CallbackContext callbackContext) {
        this.token = state.getString("token");
        this.roomId = state.getString("roomId");
        this.callbackContext = callbackContext;
    }
}