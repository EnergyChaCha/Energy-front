package chacha.energy.ganghannal

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import chacha.enerygy.ganghannal.MessageModule
import chacha.enerygy.ganghannal.dto.Hello
import chacha.enerygy.ganghannal.dto.Message
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.ReactContext
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.google.android.gms.wearable.Wearable
import com.google.gson.Gson
import expo.modules.ReactActivityDelegateWrapper


class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
      Log.i("메시지", "메인액티비티")
    super.onCreate(null)

      val intent = Intent(this, WearableListenerService::class.java)
//      ContextCompat.startForegroundService(this, intent)
      startService(intent)
      Log.i("메시지", "서비스 시작")

      val wearableListenerService = WearableListenerService()
      wearableListenerService.sayHello()


      Wearable.getMessageClient(this).addListener { event ->
          val dataString = String(event.data, Charsets.UTF_8)
          val gson = Gson()
//          val dataObject = gson.fromJson(dataString, Hello::class.java)
          Log.i("메시지", "앱 메시지 받음: ${event.path}")
          sendEventToReactNative("CustomEvent", event.path, dataString )
      }

      val messageModule = MessageModule(this)
      messageModule.sendMessage("hello-app-wear", "앱에서 보낸 메시지")

  }
    private fun sendEventToReactNative(eventName: String, path: String, data: String) {
        val reactContext: ReactContext? = reactInstanceManager?.currentReactContext
        if (reactContext != null && reactContext.hasActiveCatalystInstance()) {
            // 네이티브 모듈의 메서드를 통해 이벤트 전송
            Log.i("메시지", "리액트로 메시지 전송2")
            val myNativeModule = reactContext
                .getNativeModule(WearableModule::class.java)
            val gson = Gson()
            val messageObject = Message(path, data)
            val message = gson.toJson(messageObject)
            myNativeModule?.sendEventToReactNative(eventName, message)
        }
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}
