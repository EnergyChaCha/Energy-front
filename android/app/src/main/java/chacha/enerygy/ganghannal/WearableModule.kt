package chacha.energy.ganghannal

import com.facebook.react.bridge.*
import com.google.android.gms.wearable.*

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

    companion object {
        fun sendEventToJS(reactContext: ReactContext, eventName: String, params: WritableMap) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        }
    }
}