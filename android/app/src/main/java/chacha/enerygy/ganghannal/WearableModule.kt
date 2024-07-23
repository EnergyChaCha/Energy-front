package chacha.energy.ganghannal

import android.util.Log
import chacha.enerygy.ganghannal.dto.Hello
import com.facebook.react.ReactNativeHost
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.tasks.Tasks
import com.google.android.gms.wearable.*
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@ReactModule(name = "WearModule")
class WearableModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val dataClient = Wearable.getDataClient(reactContext)
    private val messageClient = Wearable.getMessageClient(reactContext)
    private val nodeClient = Wearable.getNodeClient(reactContext)

    override fun getName() = "WearModule"

    @ReactMethod
    fun addListener(eventName: String) {
// 이벤트 리스너 추가 (필요한 경우)
    }

    @ReactMethod
    fun removeListeners(count: Int) {
// 리스너 제거 (필요한 경우)
    }



    @ReactMethod
    fun sendMessageToWear(path: String, message: String, promise: Promise) {
//        Log.i("메시지 리액트에서 워치로 보내기", message)
        CoroutineScope(Dispatchers.Default).launch {
            try {
                val nodes = Tasks.await(nodeClient.connectedNodes)
                nodes.forEach { node ->
                    val result = Tasks.await(messageClient.sendMessage(node.id, path, message.toByteArray()))
                    if (result != -1) {
                        promise.resolve("Message sent successfully to ${node.displayName}")
                    } else {
                        promise.reject("ERROR", "Failed to send message to ${node.displayName}")
                    }
                }
            } catch (e: Exception) {
                promise.reject("ERROR", "Error sending message: ${e.message}")
            }
        }
    }

    // React Native에 이벤트를 전송하는 메서드
    @ReactMethod
    fun sendEventToReactNative(eventName: String, message: String) {
        val reactContext = reactApplicationContext
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, message)
        }
    }

    companion object {
        fun sendEventToJS(reactContext: ReactContext, eventName: String, params: WritableMap) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        }
    }
}