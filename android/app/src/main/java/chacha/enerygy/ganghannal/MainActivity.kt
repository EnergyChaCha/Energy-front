package chacha.energy.ganghannal

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import chacha.enerygy.ganghannal.MessageModule
import chacha.enerygy.ganghannal.dto.Hello
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.google.android.gms.wearable.DataEvent
import com.google.android.gms.wearable.DataMapItem
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

//      Wearable.getDataClient(this).addListener { dataEvents ->
//          for (event in dataEvents) {
//              Log.i("메시지", "메인 액티비티 메시지 받음: ${event.dataItem.uri.path}")
//              val item = event.dataItem
//              val dataMap = DataMapItem.fromDataItem(item).dataMap
//              Log.i("메시지", "메인 액티비티 메시지 받음: ${dataMap.toString()}")
//
//              if (event.type == DataEvent.TYPE_CHANGED) {
//
//                  if (item.uri.path!!.compareTo("/path") == 0) {
//                      val dataMap = DataMapItem.fromDataItem(item).dataMap
//                      val value = dataMap.getString("key")
//                      // 데이터 처리
//                  }
//              }
//          }
//      }

      Wearable.getMessageClient(this).addListener { event ->
          val dataString = String(event.data, Charsets.UTF_8)
          val gson = Gson()
          val dataObject = gson.fromJson(dataString, Hello::class.java)
          Log.i("메시지", "메인 액티비티 메시지 받음: ${event.path} ${dataObject.toString()}")
      }

      val messageModule = MessageModule(this)
      messageModule.sendMessage("hello-wear", "앱에서 보낸 메시지")

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
