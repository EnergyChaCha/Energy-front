package chacha.energy.ganghannal

import com.facebook.react.bridge.*
import com.google.android.gms.wearable.*

class WearableModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

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
    fun sendMessage(path: String, message: String) {
        val dataClient = Wearable.getDataClient(reactApplicationContext);
        // Send message using dataClient
    }

    companion object {
        fun sendEventToJS(reactContext: ReactContext, eventName: String, params: WritableMap) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        }
    }
}